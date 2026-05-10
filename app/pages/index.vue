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
        <div v-if="signalsLoading" style="color: var(--border-gray)">CHECKING ALERTS...</div>
        <div v-else-if="signalsError" style="color: var(--down-red); padding: 10px;">ERROR FETCHING SIGNALS</div>
        <div v-else-if="!signalItems || signalItems.length === 0" style="color: var(--border-gray); padding: 10px;">NO
          RECENT ALERTS DETECTED</div>
        <SignalTable v-else :items="signalItems" />
      </BasePanel>
    </div>

    <div class="panel-slot" :class="{ 'is-active': activeTab === 'portfolio' }">
      <BasePanel title="PORTFOLIO">
        <PortfolioTable />
      </BasePanel>
    </div>

    <div class="panel-slot" :class="{ 'is-active': activeTab === 'orders' }">
      <BasePanel title="EXECUTION ORDER">
        <OrderTable />
      </BasePanel>
    </div>

    <nav class="mobile-tab-bar">
      <button @click="activeTab = 'chart'" :class="{ active: activeTab === 'chart' }">CHART</button>
      <button @click="activeTab = 'news'" :class="{ active: activeTab === 'news' }">NEWS</button>
      <button @click="activeTab = 'market'" :class="{ active: activeTab === 'market' }">MARKET</button>
      <button @click="activeTab = 'alerts'" :class="{ active: activeTab === 'alerts' }">ALERTS</button>
      <button @click="activeTab = 'portfolio'" :class="{ active: activeTab === 'portfolio' }">PORTFOLIO</button>
      <button @click="activeTab = 'orders'" :class="{ active: activeTab === 'orders' }">ORDERS</button>
    </nav>
  </main>
</template>

<script setup>
const { activeTicker, activeTab } = useActiveChart()
const { spotPrice, loading: marketLoading } = useMarketData()
const { newsItems, loading: newsLoading } = useNews()
const { signals: signalItems, loading: signalsLoading, error: signalsError } = useSignals()

useSeoMeta({
  title: () => `${activeTicker.value} — ALRCA Terminal`,
  description: 'ADAPTIVE POLYNOMIAL REGRESSION ANALYSIS',
  ogTitle: () => `${activeTicker.value} — ALRCA Terminal`,
  ogDescription: 'ADAPTIVE POLYNOMIAL REGRESSION ANALYSIS',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: () => `${activeTicker.value} — ALRCA Terminal`,
  twitterDescription: 'ADAPTIVE POLYNOMIAL REGRESSION ANALYSIS',
})
</script>
