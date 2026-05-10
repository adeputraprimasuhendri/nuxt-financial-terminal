<template>
  <div class="portfolio-container">

    <div class="metrics-grid">
      <div class="metric-card">
        <span class="metric-label">BALANCE</span>
        <span class="metric-value white">$12,100.00</span>
      </div>
      <div class="metric-card highlight-equity">
        <span class="metric-label">EQUITY</span>
        <span class="metric-value amber">$12,480.50</span>
      </div>
      <div class="metric-card highlight-pnl">
        <span class="metric-label">FLOATING P&L</span>
        <span class="metric-value up">+$380.50</span>
        <span class="metric-sub up">+3.14%</span>
      </div>
    </div>

    <div class="divider" />

    <div class="stats-row">
      <div class="stat-block">
        <span class="stat-label">TODAY P&L</span>
        <span class="up stat-val">+$520.75</span>
      </div>
      <div class="stat-block">
        <span class="stat-label">WEEK P&L</span>
        <span class="up stat-val">+$1,240.00</span>
      </div>
      <div class="stat-block">
        <span class="stat-label">MONTH P&L</span>
        <span class="down stat-val">-$380.20</span>
      </div>
      <div class="stat-block">
        <span class="stat-label">WIN RATE</span>
        <span class="amber stat-val">67.4%</span>
      </div>
      <div class="stat-block">
        <span class="stat-label">TOTAL TRADES</span>
        <span class="white stat-val">148</span>
      </div>
      <div class="stat-block">
        <span class="stat-label">OPEN TRADES</span>
        <span class="cyan stat-val">4</span>
      </div>
    </div>

  </div>
</template>

<script setup>
</script>

<style scoped>
.portfolio-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 4px 0;
  overflow-y: auto;
}

/* Metric cards */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.metric-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 12px;
  border: 1px solid var(--border-gray);
  background: #0a0a0a;
}

.highlight-equity {
  border-color: var(--primary-amber);
  background: rgba(255, 160, 40, 0.05);
}

.highlight-pnl {
  border-color: var(--up-green);
  background: rgba(0, 255, 0, 0.04);
}

.metric-label {
  font-size: 10px;
  color: var(--border-gray);
  letter-spacing: 0.08em;
}

.metric-value {
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.metric-sub {
  font-size: 11px;
  margin-top: -4px;
}

/* Divider */
.divider {
  border: none;
  border-top: 1px solid var(--border-gray);
}

/* Stats row */
.stats-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 0;
}

.stat-block {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 7px 6px;
  border: 1px solid var(--border-gray);
  border-right: none;
  background: #0a0a0a;
}

.stat-block:last-child {
  border-right: 1px solid var(--border-gray);
}

.stat-label {
  font-size: 10px;
  color: var(--border-gray);
  letter-spacing: 0.06em;
  text-align: center;
}

.stat-val {
  font-size: 13px;
  font-weight: 700;
}

/* ── Mobile ── */
@media (max-width: 768px) {
  .portfolio-container {
    gap: 12px;
    padding: 2px 0;
  }

  /* 2 columns on mobile — big enough to read, fits screen */
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .metric-card {
    padding: 8px 10px;
  }

  .metric-value {
    font-size: 15px;
  }

  /* Stats: 2 per row (3 rows of 2) */
  .stats-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .stat-block {
    border: 1px solid var(--border-gray);
    border-right: 1px solid var(--border-gray);
    padding: 8px 6px;
  }

  .stat-val {
    font-size: 14px;
  }

  .stat-label {
    font-size: 9px;
  }
}
</style>
