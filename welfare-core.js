/*
 * JANUS Welfare Core v0.1
 *
 * Safety/eligibility/session-accounting layer only.
 * It deliberately does NOT implement RNG, payouts, deposits, withdrawals,
 * marketing, player profiling, or jurisdiction-specific legal approval.
 */
(function (global) {
  'use strict';

  const VERSION = '0.1.0';

  const DEFAULT_POLICY = Object.freeze({
    minimumPaidRoundIntervalMs: 3000,
    sessionLimitMs: 60 * 60 * 1000,
    stakeLimit: 1,
    lossLimit: 20,
    limitIncreaseCoolingOffMs: 24 * 60 * 60 * 1000,
    riskThresholds: Object.freeze({ moderate: 3, high: 6, critical: 9 })
  });

  const RISK_WEIGHTS = Object.freeze({
    spend_escalation: 2,
    loss_chasing_pattern: 3,
    extended_session: 2,
    repeated_failed_deposits: 2,
    rapid_limit_increase_attempts: 2,
    repeated_cooling_off_use: 2,
    erratic_high_intensity_play: 3
  });

  const RESTRICT_ONLY_ACTIONS = Object.freeze({
    low: 'ALLOW_WITH_STANDARD_CONTROLS',
    moderate: 'SHOW_FACTUAL_SUMMARY_AND_ADD_FRICTION',
    high: 'FORCED_BREAK_AND_LOWER_CAPS',
    critical: 'SUSPEND_REAL_MONEY_AND_OFFER_EXCLUSION_SUPPORT'
  });

  function finiteNonNegative(value, name) {
    if (!Number.isFinite(value) || value < 0) {
      throw new TypeError(`${name} must be a finite non-negative number`);
    }
    return value;
  }

  function finitePositive(value, name) {
    if (!Number.isFinite(value) || value <= 0) {
      throw new TypeError(`${name} must be a finite positive number`);
    }
    return value;
  }

  function clonePlain(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  class WelfareSession {
    constructor(options = {}) {
      const now = Number.isFinite(options.now) ? options.now : Date.now();
      const policy = { ...DEFAULT_POLICY, ...(options.policy || {}) };

      this.policy = {
        minimumPaidRoundIntervalMs: finitePositive(policy.minimumPaidRoundIntervalMs, 'minimumPaidRoundIntervalMs'),
        sessionLimitMs: finitePositive(policy.sessionLimitMs, 'sessionLimitMs'),
        stakeLimit: finitePositive(policy.stakeLimit, 'stakeLimit'),
        lossLimit: finitePositive(policy.lossLimit, 'lossLimit'),
        limitIncreaseCoolingOffMs: finitePositive(policy.limitIncreaseCoolingOffMs, 'limitIncreaseCoolingOffMs'),
        riskThresholds: { ...DEFAULT_POLICY.riskThresholds, ...(policy.riskThresholds || {}) }
      };

      this.startedAt = now;
      this.lastPaidRoundAt = null;
      this.totalStaked = 0;
      this.totalReturned = 0;
      this.roundCount = 0;
      this.selfExcludedUntil = null;
      this.coolingOffUntil = null;
      this.pendingLimitIncrease = null;
      this.riskEvents = [];
      this.closed = false;
    }

    get netPosition() {
      return this.totalReturned - this.totalStaked;
    }

    get netLoss() {
      return Math.max(0, this.totalStaked - this.totalReturned);
    }

    get riskScore() {
      return this.riskEvents.reduce((sum, event) => sum + (RISK_WEIGHTS[event.type] || 0), 0);
    }

    get riskLevel() {
      const score = this.riskScore;
      const t = this.policy.riskThresholds;
      if (score >= t.critical) return 'critical';
      if (score >= t.high) return 'high';
      if (score >= t.moderate) return 'moderate';
      return 'low';
    }

    recordRiskSignal(type, now = Date.now()) {
      if (!Object.prototype.hasOwnProperty.call(RISK_WEIGHTS, type)) {
        throw new Error(`Unknown risk signal: ${type}`);
      }
      this.riskEvents.push({ type, at: now });
      return this.riskDecision();
    }

    riskDecision() {
      const level = this.riskLevel;
      return {
        score: this.riskScore,
        level,
        action: RESTRICT_ONLY_ACTIONS[level],
        canIncreaseGamblingCapability: false,
        canTriggerMarketing: false
      };
    }

    reduceLimits(next = {}) {
      if (next.stakeLimit !== undefined) {
        const v = finitePositive(next.stakeLimit, 'stakeLimit');
        if (v > this.policy.stakeLimit) throw new Error('Use requestLimitIncrease for increases');
        this.policy.stakeLimit = v;
      }
      if (next.lossLimit !== undefined) {
        const v = finitePositive(next.lossLimit, 'lossLimit');
        if (v > this.policy.lossLimit) throw new Error('Use requestLimitIncrease for increases');
        this.policy.lossLimit = v;
      }
      if (next.sessionLimitMs !== undefined) {
        const v = finitePositive(next.sessionLimitMs, 'sessionLimitMs');
        if (v > this.policy.sessionLimitMs) throw new Error('Use requestLimitIncrease for increases');
        this.policy.sessionLimitMs = v;
      }
      return this.snapshot();
    }

    requestLimitIncrease(next = {}, now = Date.now()) {
      this.recordRiskSignal('rapid_limit_increase_attempts', now);
      this.pendingLimitIncrease = {
        requested: clonePlain(next),
        requestedAt: now,
        eligibleAt: now + this.policy.limitIncreaseCoolingOffMs
      };
      return clonePlain(this.pendingLimitIncrease);
    }

    applyPendingLimitIncrease(now = Date.now()) {
      const req = this.pendingLimitIncrease;
      if (!req) return { applied: false, reason: 'NO_PENDING_INCREASE' };
      if (now < req.eligibleAt) {
        return { applied: false, reason: 'COOLING_OFF_ACTIVE', eligibleAt: req.eligibleAt };
      }
      if (this.riskLevel === 'high' || this.riskLevel === 'critical') {
        return { applied: false, reason: 'RISK_GATE_BLOCKED' };
      }

      const r = req.requested;
      if (r.stakeLimit !== undefined) this.policy.stakeLimit = finitePositive(r.stakeLimit, 'stakeLimit');
      if (r.lossLimit !== undefined) this.policy.lossLimit = finitePositive(r.lossLimit, 'lossLimit');
      if (r.sessionLimitMs !== undefined) this.policy.sessionLimitMs = finitePositive(r.sessionLimitMs, 'sessionLimitMs');
      this.pendingLimitIncrease = null;
      return { applied: true, policy: clonePlain(this.policy) };
    }

    startCoolingOff(durationMs, now = Date.now()) {
      finitePositive(durationMs, 'durationMs');
      this.coolingOffUntil = Math.max(this.coolingOffUntil || 0, now + durationMs);
      return this.coolingOffUntil;
    }

    selfExclude(untilTimestamp) {
      finitePositive(untilTimestamp, 'untilTimestamp');
      this.selfExcludedUntil = Math.max(this.selfExcludedUntil || 0, untilTimestamp);
      return this.selfExcludedUntil;
    }

    close() {
      this.closed = true;
    }

    decisionForPaidRound({ stake, initiatedByUser, now = Date.now() } = {}) {
      try {
        finitePositive(stake, 'stake');
      } catch (error) {
        return this._deny('INVALID_STAKE');
      }

      if (this.closed) return this._deny('SESSION_CLOSED');
      if (initiatedByUser !== true) return this._deny('MANUAL_INITIATION_REQUIRED');
      if (this.selfExcludedUntil && now < this.selfExcludedUntil) return this._deny('SELF_EXCLUDED');
      if (this.coolingOffUntil && now < this.coolingOffUntil) return this._deny('COOLING_OFF_ACTIVE');
      if ((now - this.startedAt) >= this.policy.sessionLimitMs) return this._deny('SESSION_TIME_LIMIT');
      if (stake > this.policy.stakeLimit) return this._deny('STAKE_LIMIT');
      if (this.netLoss >= this.policy.lossLimit) return this._deny('LOSS_LIMIT');
      if (this.lastPaidRoundAt !== null && (now - this.lastPaidRoundAt) < this.policy.minimumPaidRoundIntervalMs) {
        return this._deny('MINIMUM_ROUND_INTERVAL');
      }

      const risk = this.riskDecision();
      if (risk.level === 'critical') return this._deny('CRITICAL_RISK_GATE', risk);
      if (risk.level === 'high') return this._deny('HIGH_RISK_FORCED_BREAK', risk);

      return {
        allowed: true,
        reason: 'ALLOW',
        risk,
        session: this.snapshot(now)
      };
    }

    recordPaidRound({ stake, payout, initiatedByUser, now = Date.now() } = {}) {
      const gate = this.decisionForPaidRound({ stake, initiatedByUser, now });
      if (!gate.allowed) return { recorded: false, gate };

      finiteNonNegative(payout, 'payout');
      this.totalStaked += stake;
      this.totalReturned += payout;
      this.roundCount += 1;
      this.lastPaidRoundAt = now;

      if (this.netLoss >= this.policy.lossLimit) {
        this.startCoolingOff(24 * 60 * 60 * 1000, now);
      }

      return {
        recorded: true,
        classification: WelfareSession.classifyRound(stake, payout),
        mayCelebrate: WelfareSession.mayCelebrate(stake, payout),
        session: this.snapshot(now),
        risk: this.riskDecision()
      };
    }

    snapshot(now = Date.now()) {
      return {
        coreVersion: VERSION,
        elapsedMs: Math.max(0, now - this.startedAt),
        totalStaked: this.totalStaked,
        totalReturned: this.totalReturned,
        netPosition: this.netPosition,
        netLoss: this.netLoss,
        roundCount: this.roundCount,
        stakeLimit: this.policy.stakeLimit,
        lossLimit: this.policy.lossLimit,
        sessionLimitMs: this.policy.sessionLimitMs,
        coolingOffUntil: this.coolingOffUntil,
        selfExcludedUntil: this.selfExcludedUntil,
        risk: this.riskDecision()
      };
    }

    _deny(reason, risk = this.riskDecision()) {
      return {
        allowed: false,
        reason,
        risk,
        canTriggerMarketing: false,
        canIncreaseGamblingCapability: false
      };
    }

    static classifyRound(stake, payout) {
      finitePositive(stake, 'stake');
      finiteNonNegative(payout, 'payout');
      if (payout > stake) return 'NET_WIN';
      if (payout === stake) return 'BREAK_EVEN';
      return 'NET_LOSS';
    }

    static mayCelebrate(stake, payout) {
      return WelfareSession.classifyRound(stake, payout) === 'NET_WIN';
    }
  }

  global.JanusWelfareCore = Object.freeze({
    VERSION,
    DEFAULT_POLICY,
    RISK_WEIGHTS,
    createSession: (options) => new WelfareSession(options),
    classifyRound: WelfareSession.classifyRound,
    mayCelebrate: WelfareSession.mayCelebrate
  });
})(typeof window !== 'undefined' ? window : globalThis);
