<template>
  <div v-if="loading" style="color: var(--border-gray)">LOADING MARKET DATA...</div>
  <table v-else>
    <thead>
      <tr>
        <th>SYMBOL</th>
        <th>PRICE</th>
        <th>CHG</th>
        <th>OPEN</th>
        <th>HIGH</th>
        <th>LOW</th>
        <th>VOLUME</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in marketRows" :key="item.symbol">
        <td class="cyan ticker-link" @click="selectTicker(item.symbol)">{{ item.symbol }}</td>
        <td class="white">{{ item.price }}</td>
        <td :class="item.change.startsWith('+') ? 'up' : 'down'">{{ item.change }}</td>
        <td class="white">{{ item.open }}</td>
        <td class="up">{{ item.high }}</td>
        <td class="down">{{ item.low }}</td>
        <td style="color: var(--text-dim)">{{ item.volume }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
const { marketRows, loading } = useMarketData()
const { setTicker, activeTab } = useActiveChart()

const selectTicker = (symbol: string) => {
  setTicker(symbol)
  activeTab.value = 'chart'
}
</script>

<style scoped>
.ticker-link {
  cursor: pointer;
}
.ticker-link:hover {
  text-decoration: underline;
}
</style>
