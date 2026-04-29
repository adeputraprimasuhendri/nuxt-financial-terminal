<template>
  <footer>
    <div class="ticker-wrap">
      <div v-if="loading" class="ticker" style="color: var(--border-gray); padding-left: 10px;">
        LOADING MARKET TICKER...
      </div>
      <div v-else class="ticker">
        <span v-for="(item, index) in tickerItems" :key="index" class="ticker-item">
          {{ item.pair }} {{ item.price }} 
          <span :class="item.trend === 'up' ? 'up' : item.trend === 'down' ? 'down' : 'white'">
            {{ item.trend === 'up' ? '▲' : item.trend === 'down' ? '▼' : '■' }}
          </span>
        </span>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { tickerItems, loading } = useTicker()
</script>
