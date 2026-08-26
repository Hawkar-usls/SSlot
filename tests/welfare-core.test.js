'use strict';

const assert = require('assert');
require('../welfare-core.js');

const core = globalThis.JanusWelfareCore;

function test(name, fn) {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

test('manual initiation is mandatory', () => {
  const s = core.createSession({ now: 0 });
  const d = s.decisionForPaidRound({ stake: 1, initiatedByUser: false, now: 4000 });
  assert.strictEqual(d.allowed, false);
  assert.strictEqual(d.reason, 'MANUAL_INITIATION_REQUIRED');
});

test('minimum paid-round interval is enforced', () => {
  const s = core.createSession({ now: 0 });
  let r = s.recordPaidRound({ stake: 1, payout: 0, initiatedByUser: true, now: 4000 });
  assert.strictEqual(r.recorded, true);
  r = s.recordPaidRound({ stake: 1, payout: 0, initiatedByUser: true, now: 5000 });
  assert.strictEqual(r.recorded, false);
  assert.strictEqual(r.gate.reason, 'MINIMUM_ROUND_INTERVAL');
});

test('loss and break-even cannot be celebrated', () => {
  assert.strictEqual(core.mayCelebrate(1, 0), false);
  assert.strictEqual(core.mayCelebrate(1, 1), false);
  assert.strictEqual(core.mayCelebrate(1, 1.01), true);
  assert.strictEqual(core.classifyRound(1, 1), 'BREAK_EVEN');
});

test('risk can restrict but cannot increase capability or trigger marketing', () => {
  const s = core.createSession({ now: 0 });
  s.recordRiskSignal('loss_chasing_pattern', 1000);
  s.recordRiskSignal('erratic_high_intensity_play', 2000);
  const risk = s.riskDecision();
  assert.ok(['high', 'critical'].includes(risk.level));
  assert.strictEqual(risk.canIncreaseGamblingCapability, false);
  assert.strictEqual(risk.canTriggerMarketing, false);
});

test('limit reductions apply immediately', () => {
  const s = core.createSession({ now: 0, policy: { stakeLimit: 5 } });
  s.reduceLimits({ stakeLimit: 1 });
  const d = s.decisionForPaidRound({ stake: 2, initiatedByUser: true, now: 4000 });
  assert.strictEqual(d.allowed, false);
  assert.strictEqual(d.reason, 'STAKE_LIMIT');
});

test('limit increases are delayed and create a risk signal', () => {
  const s = core.createSession({ now: 0, policy: { stakeLimit: 1 } });
  const req = s.requestLimitIncrease({ stakeLimit: 2 }, 1000);
  assert.ok(req.eligibleAt > 1000);
  const applied = s.applyPendingLimitIncrease(2000);
  assert.strictEqual(applied.applied, false);
  assert.strictEqual(applied.reason, 'COOLING_OFF_ACTIVE');
  assert.ok(s.riskScore > 0);
});

test('self exclusion fails closed', () => {
  const s = core.createSession({ now: 0 });
  s.selfExclude(100000);
  const d = s.decisionForPaidRound({ stake: 1, initiatedByUser: true, now: 4000 });
  assert.strictEqual(d.allowed, false);
  assert.strictEqual(d.reason, 'SELF_EXCLUDED');
});

test('loss limit triggers cooling off', () => {
  const s = core.createSession({ now: 0, policy: { lossLimit: 2, stakeLimit: 1 } });
  let r = s.recordPaidRound({ stake: 1, payout: 0, initiatedByUser: true, now: 4000 });
  assert.strictEqual(r.recorded, true);
  r = s.recordPaidRound({ stake: 1, payout: 0, initiatedByUser: true, now: 8000 });
  assert.strictEqual(r.recorded, true);
  const d = s.decisionForPaidRound({ stake: 1, initiatedByUser: true, now: 12000 });
  assert.strictEqual(d.allowed, false);
  assert.strictEqual(d.reason, 'COOLING_OFF_ACTIVE');
});

console.log('Welfare core invariant suite complete.');
