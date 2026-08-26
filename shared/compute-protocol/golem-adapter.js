import { BaseAdapter, buildReceipt, assertNoGameCoupling } from './protocol.js';

export class GolemGatewayAdapter extends BaseAdapter {
  constructor({ gatewayUrl = null, simulation = true, network = 'testnet' } = {}) {
    super({ adapterId: `golem-gateway-${network}-v0.2`, taskType: 'ECONOMIC_COMPUTE_JOB' });
    this.gatewayUrl = gatewayUrl ? String(gatewayUrl).replace(/\/$/, '') : null;
    this.simulation = simulation;
    this.network = network;
  }

  async run(task, consent) {
    if (!this.supports(task)) throw new Error('TASK_TYPE_MISMATCH');
    if (!consent?.active) throw new Error('ACTIVE_CONSENT_REQUIRED');

    if (this.simulation) {
      return buildReceipt({
        task,
        consent,
        adapterId: this.adapterId,
        proof: {
          kind: 'MOCK_ECONOMIC_COMPUTE_RECEIPT',
          upstream: 'GOLEM',
          network: this.network,
          upstream_status: 'SIMULATED'
        },
        work: {
          completed: true,
          provider_market: 'golem',
          compute_seconds: Number(task.payload.compute_seconds || 1),
          settlement_asset: this.network === 'testnet' ? 'tGLM' : 'GLM',
          gross_value: Number(task.payload.gross_value || 0),
          game_effect: 'NONE'
        }
      });
    }

    if (!this.gatewayUrl) throw new Error('GOLEM_GATEWAY_URL_REQUIRED');
    const response = await fetch(`${this.gatewayUrl}/v1/golem/jobs`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        protocol_id: task.protocol_id,
        protocol_version: task.protocol_version,
        task: { task_id: task.task_id, type: task.type, payload: task.payload },
        consent: {
          consent_id: consent.consent_id,
          subject_id: consent.subject_id,
          cpu_limit_percent: consent.cpu_limit_percent,
          gpu_enabled: consent.gpu_enabled,
          allow_on_battery: consent.allow_on_battery
        }
      })
    });
    if (!response.ok) throw new Error(`GOLEM_GATEWAY_HTTP_${response.status}`);
    const data = await response.json();
    assertNoGameCoupling(data, 'golem.gateway.response');
    if (data?.proof?.kind !== 'GOLEM_PAYMENT_RECEIPT') throw new Error('GOLEM_PAYMENT_RECEIPT_REQUIRED');
    return buildReceipt({ task, consent, adapterId: this.adapterId, proof: data.proof, work: data.work || {} });
  }

  async stop(taskId = null) {
    if (this.simulation || !this.gatewayUrl) return { stopped: true, mode: this.simulation ? 'simulation' : 'local' };
    const response = await fetch(`${this.gatewayUrl}/v1/golem/jobs/stop`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ task_id: taskId })
    });
    return { stopped: response.ok, status: response.status };
  }

  async getStatus() {
    return {
      adapter_id: this.adapterId,
      status: this.simulation ? 'simulation-ready' : (this.gatewayUrl ? 'gateway-configured' : 'gateway-missing'),
      network: this.network,
      browser_holds_yagna_app_key: false
    };
  }
}
