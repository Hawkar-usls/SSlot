export function allocateVerifiedEconomicReceipt(receipt, verification, {
  playerShare = 0.7,
  treasuryShare = 0.3
} = {}) {
  if (!verification?.verified) throw new Error('UNVERIFIED_RECEIPT_CANNOT_BE_ALLOCATED');
  if (!['ECONOMIC_COMPUTE_JOB', 'POW_SHARE'].includes(receipt?.task_type)) throw new Error('ECONOMIC_RECEIPT_REQUIRED');

  const p = Number(playerShare);
  const t = Number(treasuryShare);
  if (!Number.isFinite(p) || !Number.isFinite(t) || p < 0 || t < 0 || Math.abs((p + t) - 1) > 1e-9) {
    throw new Error('INVALID_VALUE_SPLIT');
  }

  const gross = Number(receipt.work?.gross_value ?? 0);
  if (!Number.isFinite(gross) || gross < 0) throw new Error('INVALID_GROSS_VALUE');

  const asset = String(receipt.work?.settlement_asset || 'UNSPECIFIED');
  return Object.freeze({
    source_receipt_id: receipt.receipt_id,
    settlement_asset: asset,
    gross_value: gross,
    player_compute_earnings: Object.freeze({
      ledger: 'PLAYER_COMPUTE_EARNINGS_LEDGER',
      amount: gross * p,
      share: p,
      may_auto_credit_gambling_balance: false
    }),
    compute_treasury: Object.freeze({
      ledger: 'COMPUTE_TREASURY',
      amount: gross * t,
      share: t
    }),
    game_effect: 'NONE',
    wagering_conversion: 'FORBIDDEN_AUTOMATICALLY'
  });
}
