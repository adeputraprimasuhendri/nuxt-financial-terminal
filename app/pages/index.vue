<template>
  <main>
    <BasePanel :title="`${activeTicker}`" :noPadding="true">
      <template #header-right>
        <span v-if="marketLoading" class="white">FETCHING...</span>
        <span v-else class="up">{{ spotPrice.price }} {{ spotPrice.change }}</span>
      </template>
      <CandlestickChart />
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
const { activeTicker } = useActiveChart()
const { spotPrice, loading: marketLoading } = useMarketData()
const { newsItems, alertItems, loading: newsLoading } = useNews()

useSeoMeta({
  title: () => `${activeTicker.value} — ALRCA Terminal`,
  description: 'ADAPTIVE POLYNOMIAL REGRESSION ANALYSIS by Ade Putra Prima Suhendri',
  ogTitle: () => `${activeTicker.value} — ALRCA Terminal`,
  ogDescription: 'ADAPTIVE POLYNOMIAL REGRESSION ANALYSIS by Ade Putra Prima Suhendri',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: () => `${activeTicker.value} — ALRCA Terminal`,
  twitterDescription: 'ADAPTIVE POLYNOMIAL REGRESSION ANALYSIS by Ade Putra Prima Suhendri',
})
</script>
