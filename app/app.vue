<template>
  <div class="terminal-wrapper">
    <AppHeader />

    <main>
      <BasePanel title="GOLD SPOT (XAU/USD)">
        <template #header-right>
          <span class="up">2,345.67 +12.34</span>
        </template>
        <div class="chart-container">
          <div style="padding: 20px; color: var(--border-gray)">[ XAU/USD INTRADAY CHART ]</div>
        </div>
      </BasePanel>

      <BasePanel title="TOP NEWS">
        <NewsList :items="newsItems" />
      </BasePanel>

      <BasePanel title="MARKET DATA">
        <MarketTable />
      </BasePanel>

      <BasePanel title="ALERTS">
        <NewsList :items="alertItems" />
      </BasePanel>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
const newsItems = [
  { time: '14:30', headline: 'Fed Signals Cautious Approach to Future Rate Cuts' },
  { time: '14:15', headline: 'Gold Hits Record High Amid Global Uncertainty' },
  { time: '13:45', headline: 'Central Banks Increase Bullion Reserves for 3rd Month' }
]

const alertItems = [
  { time: '14:00', headline: 'CRITICAL: VOLATILITY SPIKE DETECTED', isAlert: true }
]
</script>

<style>
/* Global styles are imported in nuxt.config.ts */
</style>
