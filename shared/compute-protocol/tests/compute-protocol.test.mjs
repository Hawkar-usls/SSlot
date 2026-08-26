import assert from 'node:assert/strict';
import {
  ConsentGate,
  createTask,
  MockScienceAdapter,
  MockEconomicAdapter,
  MockMiningAdapter,
  ReceiptVerifier,
  toContributionEntry,
  assertNoGameCoupling
} from '../protocol.js';
import { GolemGatewayAdapter } from '../golem-adapter.js';

async function run() {
  const gate = new ConsentGate({ maxCpuPercent: 30 });
  assert.throws(() => gate.grant({ mode: 'science' }), /EXPLICIT_AFFIRMATION_REQUIRED/);

  const consent = gate.grant({ affirmed: true, subject_id: 'pseudonymous-test-user', mode: 'science', cpu_limit_percent: 80, gpu_enabled: false, allow_on_battery: false });
  assert.equal(consent.cpu_limit_percent, 30, 'CPU must clamp to policy maximum');
  assert.equal(gate.canCompute({ onBattery: true }).allowed, false);
  assert.equal(gate.canCompute({ thermalState: 'hot' }).allowed, false);
  assert.equal(gate.canCompute({ userPaused: true }).allowed, false);
  assert.equal(gate.canCompute({}).allowed, true);

  assert.throws(() => createTask({ type: 'SCIENCE_WORK_UNIT', payload: { project: 'mock', rtp: 99 } }), /FORBIDDEN_GAME_COUPLING/);

  const scienceTask = createTask({ type: 'SCIENCE_WORK_UNIT', payload: { project: 'mock-science', upstream_task_ref: 'wu-demo-001' } });
  const scienceReceipt = await new MockScienceAdapter().run(scienceTask, consent);
  const prodVerifier = new ReceiptVerifier({ simulation: false });
  assert.equal(prodVerifier.verify(scienceReceipt, { consent, task: scienceTask }).verified, false, 'mock proof must never pass production verification');

  const simVerifier = new ReceiptVerifier({ simulation: true });
  const scienceVerification = simVerifier.verify(scienceReceipt, { consent, task: scienceTask });
  assert.equal(scienceVerification.verified, true);
  const impact = toContributionEntry(scienceReceipt, scienceVerification);
  assert.equal(impact.lane, 'IMPACT_LEDGER');
  assert.equal(impact.game_effect, 'NONE');

  gate.revoke();
  assert.equal(gate.canCompute({}).allowed, false, 'revocation must stop compute immediately');

  const economicGate = new ConsentGate({ maxCpuPercent: 30 });
  const economicConsent = economicGate.grant({ affirmed: true, mode: 'economic', cpu_limit_percent: 20 });
  const economicTask = createTask({ type: 'ECONOMIC_COMPUTE_JOB', payload: { provider_market: 'golem', compute_seconds: 5, gross_value: 0.001, settlement_asset: 'tGLM' } });
  const economicReceipt = await new MockEconomicAdapter().run(economicTask, economicConsent);
  const economicVerification = simVerifier.verify(economicReceipt, { consent: economicConsent, task: economicTask });
  assert.equal(economicVerification.verified, true);
  assert.equal(toContributionEntry(economicReceipt, economicVerification).lane, 'COMPUTE_TREASURY');

  const golemReceipt = await new GolemGatewayAdapter({ simulation: true, network: 'testnet' }).run(economicTask, economicConsent);
  const golemVerification = simVerifier.verify(golemReceipt, { consent: economicConsent, task: economicTask });
  assert.equal(golemVerification.verified, true);
  assert.equal(golemReceipt.work.provider_market, 'golem');
  assert.equal(golemReceipt.work.game_effect, 'NONE');
  assert.equal(prodVerifier.verify(golemReceipt, { consent: economicConsent, task: economicTask }).verified, false);

  const miningGate = new ConsentGate({ maxCpuPercent: 30 });
  const miningConsent = miningGate.grant({ affirmed: true, mode: 'mining', cpu_limit_percent: 20 });
  const miningTask = createTask({ type: 'POW_SHARE', payload: { pool: 'mock-pool', difficulty: 100 } });
  const miningReceipt = await new MockMiningAdapter().run(miningTask, miningConsent);
  const miningVerification = simVerifier.verify(miningReceipt, { consent: miningConsent, task: miningTask });
  assert.equal(miningVerification.verified, true);
  assert.equal(toContributionEntry(miningReceipt, miningVerification).lane, 'COMPUTE_TREASURY');

  assert.throws(() => assertNoGameCoupling({ nested: { personal_jackpot_weight: 2 } }), /FORBIDDEN_GAME_COUPLING/);
  assert.throws(() => createTask({ type: 'ECONOMIC_COMPUTE_JOB', payload: { spin_id: 'x' } }), /FORBIDDEN_GAME_COUPLING/);

  console.log('compute-protocol v0.2 invariants: PASS');
}

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
