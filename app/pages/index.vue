<template>
  <main>
    <div class="panel-slot" :class="{ 'is-active': activeTab === 'chart' }">
      <BasePanel :title="`${activeTicker}`" :noPadding="true">
        <template #header-right>
          <span v-if="marketLoading" class="white">FETCHING...</span>
          <span v-else class="up">{{ spotPrice.price }} {{ spotPrice.change }}</span>
        </template>
        <CandlestickChart />
      </BasePanel>
    </div>

    <div class="panel-slot" :class="{ 'is-active': activeTab === 'news' }">
      <BasePanel title="TOP NEWS">
        <div v-if="newsLoading" style="color: var(--border-gray)">LOADING NEWS...</div>
        <NewsList v-else :items="newsItems" />
      </BasePanel>
    </div>

    <div class="panel-slot" :class="{ 'is-active': activeTab === 'market' }">
      <BasePanel title="MARKET DATA">
        <MarketTable />
      </BasePanel>
    </div>

    <div class="panel-slot" :class="{ 'is-active': activeTab === 'alerts' }">
      <BasePanel title="ALERTS">
        <div v-if="newsLoading" style="color: var(--border-gray)">CHECKING ALERTS...</div>
        <NewsList v-else :items="alertItems" />
      </BasePanel>
    </div>

    <nav class="mobile-tab-bar">
      <button @click="activeTab = 'chart'" :class="{ active: activeTab === 'chart' }">CHART</button>
      <button @click="activeTab = 'news'" :class="{ active: activeTab === 'news' }">NEWS</button>
      <button @click="activeTab = 'market'" :class="{ active: activeTab === 'market' }">MARKET</button>
      <button @click="activeTab = 'alerts'" :class="{ active: activeTab === 'alerts' }">ALERTS</button>
    </nav>
  </main>
</template>

<script setup>
const { activeTicker } = useActiveChart()
const { spotPrice, loading: marketLoading } = useMarketData()
const { newsItems, alertItems, loading: newsLoading } = useNews()

const activeTab = ref('chart')

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
