<template>
  <footer>
    <div class="ticker-wrap">
      <div class="ticker">
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
const tickerItems = [
  { pair: 'XAU/USD', price: '2,345.67', trend: 'up' },
  { pair: 'XAG/USD', price: '28.45', trend: 'down' },
  { pair: 'BTC/USD', price: '64,123.00', trend: 'up' },
  { pair: 'EUR/USD', price: '1.0725', trend: 'down' },
  { pair: 'GBP/USD', price: '1.2540', trend: 'neutral' },
  { pair: 'XAU/USD', price: '2,345.67', trend: 'up' },
  { pair: 'XAG/USD', price: '28.45', trend: 'down' }
]
</script>
