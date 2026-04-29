<template>
  <main>
    <BasePanel title="GOLD SPOT (XAU/USD)">
      <template #header-right>
        <span v-if="marketLoading" class="white">FETCHING...</span>
        <span v-else class="up">{{ spotPrice.price }} {{ spotPrice.change }}</span>
      </template>
      <div class="chart-container">
        <div style="padding: 20px; color: var(--border-gray)">[ XAU/USD INTRADAY CHART ]</div>
      </div>
    </BasePanel>

    <BasePanel title="TOP NEWS">
      <div v-if="newsLoading" style="color: var(--border-gray)">LOADING NEWS...</div>
      <NewsList v-else :items="newsItems" />
    </BasePanel>

    <BasePanel title="MARKET DATA">
      <MarketTable />
    </BasePanel>

    <BasePanel title="ALERTS">
      <div v-if="newsLoading" style="color: var(--border-gray)">CHECKING ALERTS...</div>
      <NewsList v-else :items="alertItems" />
    </BasePanel>
  </main>
</template>

<script setup>
const { spotPrice, loading: marketLoading } = useMarketData()
const { newsItems, alertItems, loading: newsLoading } = useNews()
</script>
