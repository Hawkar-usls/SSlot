/* Welfare-First Compute Protocol v0.1
 * Dependency-free reference implementation for browser/Node prototypes.
 * Compute is strictly independent from RNG, RTP, wager outcomes and personal game rewards.
 */

export const PROTOCOL_ID = 'janus.welfare.compute-protocol';
export const PROTOCOL_VERSION = '0.1.0';

export const COMPUTE_MODES = Object.freeze(['off', 'science', 'mining', 'automatic']);
export const TASK_TYPES = Object.freeze(['SCIENCE_WORK_UNIT', 'POW_SHARE']);

const FORBIDDEN_COUPLING_KEYS = new Set([
  'spin_id', 'wager_id', 'bet', 'rtp', 'odds', 'win_probability',
  'payout_multiplier', 'personal_jackpot_weight', 'free_spins',
  'bonus_multiplier', 'loss_rebate', 'chasing_score'
]);

function nowIso() { return new Date().toISOString(); }
function randomId(prefix) {
  const rnd = globalThis.crypto?.randomUUID?.() || `${Date.now()}_${Math.random().toString(16).slice(2)}`;
  return `${prefix}_${rnd}`;
}
function clampInt(value, min, max) {
  const n = Number.isFinite(Number(value)) ? Math.round(Number(value)) : min;
  return Math.max(min, Math.min(max, n));
}
function assertPlainObject(value, name) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${name}_MUST_BE_OBJECT`);
}

export function assertNoGameCoupling(value, path = 'root') {
  if (!value || typeof value !== 'object') return true;
  for (const [key, nested] of Object.entries(value)) {
    if (FORBIDDEN_COUPLING_KEYS.has(key)) throw new Error(`FORBIDDEN_GAME_COUPLING:${path}.${key}`);
    assertNoGameCoupling(nested, `${path}.${key}`);
  }
  return true;
}

export class ConsentGate {
  constructor({ storage = null, storageKey = 'janus.compute.consent.v0.1', maxCpuPercent = 30 } = {}) {
    this.storage = storage;
    this.storageKey = storageKey;
    this.maxCpuPercent = clampInt(maxCpuPercent, 1, 100);
    this.memory = null;
  }

  grant(input) {
    assertPlainObject(input, 'CONSENT');
    if (input.affirmed !== true) throw new Error('EXPLICIT_AFFIRMATION_REQUIRED');
    if (!COMPUTE_MODES.includes(input.mode) || input.mode === 'off') throw new Error('ACTIVE_COMPUTE_MODE_REQUIRED');

    const consent = Object.freeze({
      protocol_id: PROTOCOL_ID,
      protocol_version: PROTOCOL_VERSION,
      consent_id: randomId('cns'),
      subject_id: String(input.subject_id || 'anonymous'),
      mode: input.mode,
      cpu_limit_percent: clampInt(input.cpu_limit_percent ?? 20, 1, this.maxCpuPercent),
      gpu_enabled: input.gpu_enabled === true,
      allow_on_battery: input.allow_on_battery === true,
      granted_at: nowIso(),
      revoked_at: null,
      active: true
    });
    this.#save(consent);
    return consent;
  }

  revoke() {
    const current = this.get();
    if (!current) return null;
    const revoked = Object.freeze({ ...current, active: false, mode: 'off', revoked_at: nowIso() });
    this.#save(revoked);
    return revoked;
  }

  get() {
    if (this.storage?.getItem) {
      const raw = this.storage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) : null;
    }
    return this.memory;
  }

  canCompute(context = {}) {
    const c = this.get();
    if (!c?.active) return { allowed: false, reason: 'NO_ACTIVE_CONSENT' };
    if (c.protocol_version !== PROTOCOL_VERSION) return { allowed: false, reason: 'CONSENT_VERSION_MISMATCH' };
    if (context.onBattery === true && c.allow_on_battery !== true) return { allowed: false, reason: 'BATTERY_BLOCK' };
    if (['hot', 'critical'].includes(context.thermalState)) return { allowed: false, reason: 'THERMAL_BLOCK' };
    if (context.userPaused === true) return { allowed: false, reason: 'USER_PAUSED' };
    return { allowed: true, reason: 'CONSENT_OK', consent: c };
  }

  #save(value) {
    this.memory = value;
    if (this.storage?.setItem) this.storage.setItem(this.storageKey, JSON.stringify(value));
  }
}

export function createTask({ type, payload = {}, deadline = null, priority = 'low' }) {
  if (!TASK_TYPES.includes(type)) throw new Error('UNSUPPORTED_TASK_TYPE');
  assertPlainObject(payload, 'TASK_PAYLOAD');
  assertNoGameCoupling(payload, 'task.payload');
  return Object.freeze({
    protocol_id: PROTOCOL_ID,
    protocol_version: PROTOCOL_VERSION,
    task_id: randomId(type === 'SCIENCE_WORK_UNIT' ? 'tsk_sci' : 'tsk_pow'),
    type,
    payload: structuredClone(payload),
    deadline,
    priority,
    created_at: nowIso()
  });
}

export class BaseAdapter {
  constructor({ adapterId, taskType }) {
    if (!adapterId || !TASK_TYPES.includes(taskType)) throw new Error('INVALID_ADAPTER_CONFIG');
    this.adapterId = adapterId;
    this.taskType = taskType;
  }
  supports(task) { return task?.type === this.taskType; }
  async run() { throw new Error('ADAPTER_RUN_NOT_IMPLEMENTED'); }
  async stop() { return { stopped: true }; }
  async getStatus() { return { adapter_id: this.adapterId, status: 'idle' }; }
}

export function buildReceipt({ task, consent, adapterId, proof, work = {} }) {
  if (!task || !consent?.active) throw new Error('ACTIVE_CONSENT_REQUIRED_FOR_RECEIPT');
  if (!TASK_TYPES.includes(task.type)) throw new Error('INVALID_TASK_TYPE');
  assertPlainObject(proof, 'PROOF');
  assertPlainObject(work, 'WORK');
  assertNoGameCoupling(work, 'receipt.work');
  assertNoGameCoupling(proof, 'receipt.proof');

  return Object.freeze({
    protocol_id: PROTOCOL_ID,
    protocol_version: PROTOCOL_VERSION,
    receipt_id: randomId('rcpt'),
    task_id: task.task_id,
    task_type: task.type,
    subject_id: consent.subject_id,
    consent_id: consent.consent_id,
    adapter_id: adapterId,
    work: structuredClone(work),
    proof: structuredClone(proof),
    issued_at: nowIso(),
    verification_status: 'UNVERIFIED'
  });
}

export class MockScienceAdapter extends BaseAdapter {
  constructor() { super({ adapterId: 'mock-science-v0.1', taskType: 'SCIENCE_WORK_UNIT' }); }
  async run(task, consent) {
    if (!this.supports(task)) throw new Error('TASK_TYPE_MISMATCH');
    return buildReceipt({
      task, consent, adapterId: this.adapterId,
      proof: { kind: 'MOCK_SCIENCE_RECEIPT', upstream_status: 'SIMULATED' },
      work: { completed: true, compute_seconds: 1, project: task.payload.project || 'mock-science' }
    });
  }
}

export class MockMiningAdapter extends BaseAdapter {
  constructor() { super({ adapterId: 'mock-mining-v0.1', taskType: 'POW_SHARE' }); }
  async run(task, consent) {
    if (!this.supports(task)) throw new Error('TASK_TYPE_MISMATCH');
    return buildReceipt({
      task, consent, adapterId: this.adapterId,
      proof: { kind: 'MOCK_POOL_SHARE', upstream_status: 'SIMULATED' },
      work: { accepted_shares: 1, difficulty: Number(task.payload.difficulty || 1), compute_seconds: 1 }
    });
  }
}

export class ReceiptVerifier {
  constructor({ simulation = false } = {}) { this.simulation = simulation; }

  verify(receipt, { consent, task } = {}) {
    assertPlainObject(receipt, 'RECEIPT');
    assertNoGameCoupling(receipt, 'receipt');
    const errors = [];
    if (receipt.protocol_id !== PROTOCOL_ID || receipt.protocol_version !== PROTOCOL_VERSION) errors.push('PROTOCOL_MISMATCH');
    if (!TASK_TYPES.includes(receipt.task_type)) errors.push('TASK_TYPE_INVALID');
    if (!consent?.active || receipt.consent_id !== consent.consent_id) errors.push('CONSENT_INVALID');
    if (!task || receipt.task_id !== task.task_id || receipt.task_type !== task.type) errors.push('TASK_BINDING_INVALID');

    const kind = receipt.proof?.kind;
    const mock = kind === 'MOCK_SCIENCE_RECEIPT' || kind === 'MOCK_POOL_SHARE';
    if (mock && !this.simulation) errors.push('MOCK_PROOF_REJECTED_OUTSIDE_SIMULATION');

    if (!mock) {
      if (receipt.task_type === 'SCIENCE_WORK_UNIT' && kind !== 'SCIENCE_UPSTREAM_RECEIPT') errors.push('SCIENCE_PROOF_REQUIRED');
      if (receipt.task_type === 'POW_SHARE' && kind !== 'POOL_SHARE_ACCEPTANCE') errors.push('POOL_PROOF_REQUIRED');
    }

    return Object.freeze({
      verified: errors.length === 0,
      status: errors.length === 0 ? 'VERIFIED' : 'REJECTED',
      errors
    });
  }
}

export function toContributionEntry(receipt, verification) {
  if (!verification?.verified) throw new Error('UNVERIFIED_RECEIPT_CANNOT_ENTER_LEDGER');
  return Object.freeze({
    protocol_id: PROTOCOL_ID,
    protocol_version: PROTOCOL_VERSION,
    contribution_id: randomId('ctr'),
    receipt_id: receipt.receipt_id,
    lane: receipt.task_type === 'SCIENCE_WORK_UNIT' ? 'IMPACT_LEDGER' : 'COMPUTE_TREASURY',
    subject_id: receipt.subject_id,
    adapter_id: receipt.adapter_id,
    work: structuredClone(receipt.work),
    recorded_at: nowIso(),
    game_effect: 'NONE'
  });
}
