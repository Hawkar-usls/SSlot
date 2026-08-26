/* PLAYGRID Compute Routing Fabric v0.1
 * Provider-agnostic routing layer for janus.welfare.compute-protocol.
 * A game surface may observe route status, but game events never select or weight compute routes.
 */

import { TASK_TYPES, assertNoGameCoupling } from './protocol.js';

export const ROUTING_FABRIC_VERSION = '0.1.0';
export const ROUTE_CLASSES = Object.freeze([
  'SCIENCE',
  'PUBLIC_GOOD',
  'MARKETPLACE',
  'TREASURY',
  'DATACENTER',
  'OPERATOR',
  'CUSTOM'
]);

export const GATEWAY_MODES = Object.freeze(['server', 'local-agent', 'hybrid', 'simulation']);

const SECRETISH_KEYS = new Set([
  'secret', 'password', 'private_key', 'privateKey', 'wallet_seed', 'seed_phrase',
  'mnemonic', 'api_key', 'apiKey', 'app_key', 'appKey', 'access_token', 'refresh_token'
]);

function clone(value) { return structuredClone(value); }
function assertObject(value, name) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${name}_MUST_BE_OBJECT`);
}
function assertNonEmptyString(value, name) {
  if (typeof value !== 'string' || value.trim() === '') throw new Error(`${name}_REQUIRED`);
}
function assertNoSecrets(value, path = 'manifest') {
  if (!value || typeof value !== 'object') return true;
  for (const [key, nested] of Object.entries(value)) {
    if (SECRETISH_KEYS.has(key)) throw new Error(`SECRET_FIELD_FORBIDDEN:${path}.${key}`);
    assertNoSecrets(nested, `${path}.${key}`);
  }
  return true;
}

export function validateProviderManifest(input) {
  assertObject(input, 'PROVIDER_MANIFEST');
  assertNoGameCoupling(input, 'provider_manifest');
  assertNoSecrets(input);
  assertNonEmptyString(input.provider_id, 'PROVIDER_ID');
  assertNonEmptyString(input.display_name, 'DISPLAY_NAME');
  if (!ROUTE_CLASSES.includes(input.route_class)) throw new Error('INVALID_ROUTE_CLASS');
  if (!GATEWAY_MODES.includes(input.gateway_mode)) throw new Error('INVALID_GATEWAY_MODE');
  if (!Array.isArray(input.task_types) || input.task_types.length === 0) throw new Error('TASK_TYPES_REQUIRED');
  for (const type of input.task_types) if (!TASK_TYPES.includes(type)) throw new Error(`UNSUPPORTED_TASK_TYPE:${type}`);
  if (!Array.isArray(input.receipt_kinds) || input.receipt_kinds.length === 0) throw new Error('RECEIPT_KINDS_REQUIRED');
  if (input.enabled !== true && input.enabled !== false) throw new Error('ENABLED_BOOLEAN_REQUIRED');
  if (input.browser_secret_policy !== 'FORBIDDEN') throw new Error('BROWSER_SECRET_POLICY_MUST_BE_FORBIDDEN');

  return Object.freeze({
    manifest_version: String(input.manifest_version || ROUTING_FABRIC_VERSION),
    provider_id: input.provider_id,
    display_name: input.display_name,
    route_class: input.route_class,
    gateway_mode: input.gateway_mode,
    task_types: Object.freeze([...new Set(input.task_types)]),
    receipt_kinds: Object.freeze([...new Set(input.receipt_kinds.map(String))]),
    capability_tags: Object.freeze([...(input.capability_tags || []).map(String)]),
    settlement: Object.freeze(clone(input.settlement || { mode: 'NONE' })),
    beneficiary_policy: Object.freeze(clone(input.beneficiary_policy || { mode: 'PROVIDER_DEFINED' })),
    gateway_alias: String(input.gateway_alias || input.provider_id),
    browser_secret_policy: 'FORBIDDEN',
    enabled: input.enabled,
    metadata: Object.freeze(clone(input.metadata || {}))
  });
}

export class ProviderRegistry {
  constructor(manifests = []) {
    this.providers = new Map();
    for (const manifest of manifests) this.register(manifest);
  }

  register(manifest) {
    const validated = validateProviderManifest(manifest);
    if (this.providers.has(validated.provider_id)) throw new Error(`DUPLICATE_PROVIDER:${validated.provider_id}`);
    this.providers.set(validated.provider_id, validated);
    return validated;
  }

  get(providerId) { return this.providers.get(providerId) || null; }

  list({ taskType = null, routeClass = null, enabledOnly = true } = {}) {
    return [...this.providers.values()].filter((p) => {
      if (enabledOnly && !p.enabled) return false;
      if (taskType && !p.task_types.includes(taskType)) return false;
      if (routeClass && p.route_class !== routeClass) return false;
      return true;
    });
  }
}

export function createRoutingPlan({ plan_id = 'default', allocations, policy = {} }) {
  if (!Array.isArray(allocations) || allocations.length === 0) throw new Error('ROUTING_ALLOCATIONS_REQUIRED');
  assertNoGameCoupling({ allocations, policy }, 'routing_plan');
  const normalized = allocations.map((a, index) => {
    assertObject(a, `ALLOCATION_${index}`);
    assertNonEmptyString(a.provider_id, `ALLOCATION_${index}_PROVIDER_ID`);
    const weight = Number(a.weight);
    if (!Number.isFinite(weight) || weight <= 0 || weight > 1) throw new Error(`INVALID_ROUTE_WEIGHT:${a.provider_id}`);
    return Object.freeze({ provider_id: a.provider_id, weight });
  });
  const sum = normalized.reduce((acc, x) => acc + x.weight, 0);
  if (Math.abs(sum - 1) > 1e-9) throw new Error('ROUTE_WEIGHTS_MUST_SUM_TO_ONE');

  return Object.freeze({
    routing_fabric_version: ROUTING_FABRIC_VERSION,
    plan_id: String(plan_id),
    allocations: Object.freeze(normalized),
    policy: Object.freeze({
      scheduling_basis: 'CONSENT_DEVICE_POLICY_AND_PROVIDER_CAPACITY',
      game_event_weighting: 'FORBIDDEN',
      fail_closed: policy.fail_closed !== false,
      fallback_provider_id: policy.fallback_provider_id || null,
      ...clone(policy)
    })
  });
}

export function validatePlanAgainstRegistry(plan, registry, { taskType } = {}) {
  if (!(registry instanceof ProviderRegistry)) throw new Error('PROVIDER_REGISTRY_REQUIRED');
  for (const allocation of plan.allocations) {
    const provider = registry.get(allocation.provider_id);
    if (!provider || !provider.enabled) throw new Error(`PROVIDER_UNAVAILABLE:${allocation.provider_id}`);
    if (taskType && !provider.task_types.includes(taskType)) throw new Error(`PROVIDER_TASK_MISMATCH:${allocation.provider_id}`);
  }
  return true;
}

export function selectProvider(plan, registry, { taskType, cursor = 0 } = {}) {
  validatePlanAgainstRegistry(plan, registry, { taskType });
  if (!Number.isFinite(Number(cursor))) throw new Error('INVALID_ROUTING_CURSOR');

  // Deterministic weighted selector for schedulers. Cursor MUST come from the compute scheduler,
  // never from a wager, spin, RNG result, loss, bet size, bonus or other game signal.
  const x = ((Number(cursor) % 1) + 1) % 1;
  let acc = 0;
  for (const allocation of plan.allocations) {
    acc += allocation.weight;
    if (x < acc) return registry.get(allocation.provider_id);
  }
  return registry.get(plan.allocations.at(-1).provider_id);
}

export function createRouteDecision({ task, consentDecision, plan, registry, schedulerCursor = 0 }) {
  if (!consentDecision?.allowed) throw new Error('COMPUTE_NOT_ALLOWED_BY_CONSENT_GATE');
  if (!task || !TASK_TYPES.includes(task.type)) throw new Error('VALID_TASK_REQUIRED');
  assertNoGameCoupling(task, 'route_decision.task');
  const provider = selectProvider(plan, registry, { taskType: task.type, cursor: schedulerCursor });
  return Object.freeze({
    routing_fabric_version: ROUTING_FABRIC_VERSION,
    task_id: task.task_id,
    task_type: task.type,
    provider_id: provider.provider_id,
    route_class: provider.route_class,
    gateway_alias: provider.gateway_alias,
    expected_receipt_kinds: provider.receipt_kinds,
    scheduling_basis: 'CONSENT_DEVICE_POLICY_AND_PROVIDER_CAPACITY',
    game_effect: 'NONE'
  });
}
