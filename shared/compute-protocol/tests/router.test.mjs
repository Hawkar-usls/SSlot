import assert from 'node:assert/strict';
import { ConsentGate, createTask } from '../protocol.js';
import {
  ProviderRegistry,
  createRoutingPlan,
  createRouteDecision,
  validateProviderManifest
} from '../router.js';

const golem = {
  provider_id: 'golem-marketplace',
  display_name: 'Golem',
  route_class: 'MARKETPLACE',
  gateway_mode: 'server',
  task_types: ['ECONOMIC_COMPUTE_JOB'],
  receipt_kinds: ['GOLEM_PAYMENT_RECEIPT'],
  capability_tags: ['DISTRIBUTED_COMPUTE'],
  settlement: { mode: 'UPSTREAM_MARKET_PAYMENT', asset: 'GLM' },
  beneficiary_policy: { mode: 'CONFIGURABLE_SPLIT' },
  gateway_alias: 'golem',
  browser_secret_policy: 'FORBIDDEN',
  enabled: true
};

const dc = {
  provider_id: 'dc',
  display_name: 'Data Center',
  route_class: 'DATACENTER',
  gateway_mode: 'server',
  task_types: ['ECONOMIC_COMPUTE_JOB'],
  receipt_kinds: ['ECONOMIC_UPSTREAM_RECEIPT'],
  gateway_alias: 'datacenter',
  browser_secret_policy: 'FORBIDDEN',
  enabled: true
};

assert.throws(() => validateProviderManifest({ ...golem, api_key: 'secret' }), /SECRET_FIELD_FORBIDDEN/);
assert.throws(() => validateProviderManifest({ ...golem, rtp: 99 }), /FORBIDDEN_GAME_COUPLING/);

const registry = new ProviderRegistry([golem, dc]);
const plan = createRoutingPlan({
  plan_id: 'market-dc',
  allocations: [
    { provider_id: 'golem-marketplace', weight: 0.7 },
    { provider_id: 'dc', weight: 0.3 }
  ]
});
assert.equal(plan.policy.game_event_weighting, 'FORBIDDEN');
assert.throws(() => createRoutingPlan({
  allocations: [
    { provider_id: 'golem-marketplace', weight: 0.8 },
    { provider_id: 'dc', weight: 0.3 }
  ]
}), /ROUTE_WEIGHTS_MUST_SUM_TO_ONE/);
assert.throws(() => createRoutingPlan({
  allocations: [{ provider_id: 'golem-marketplace', weight: 1 }],
  policy: { spin_id: 'must-never-be-here' }
}), /FORBIDDEN_GAME_COUPLING/);

const gate = new ConsentGate({ maxCpuPercent: 30 });
const consent = gate.grant({ affirmed: true, mode: 'economic', cpu_limit_percent: 20 });
const decision = gate.canCompute({});
const task = createTask({ type: 'ECONOMIC_COMPUTE_JOB', payload: { workload_class: 'batch-demo' } });

const routeA = createRouteDecision({ task, consentDecision: decision, plan, registry, schedulerCursor: 0.1 });
const routeB = createRouteDecision({ task, consentDecision: decision, plan, registry, schedulerCursor: 0.9 });
assert.equal(routeA.provider_id, 'golem-marketplace');
assert.equal(routeB.provider_id, 'dc');
assert.equal(routeA.game_effect, 'NONE');
assert.equal(routeB.game_effect, 'NONE');

const revoked = gate.revoke();
assert.equal(revoked.active, false);
assert.throws(() => createRouteDecision({ task, consentDecision: gate.canCompute({}), plan, registry, schedulerCursor: 0.1 }), /COMPUTE_NOT_ALLOWED_BY_CONSENT_GATE/);

console.log('routing-fabric v0.1 invariants: PASS');
