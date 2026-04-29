<template>
  <div v-if="loading" style="color: var(--border-gray)">LOADING MARKET DATA...</div>
  <table v-else>
    <thead>
      <tr>
        <th>SYMBOL</th>
        <th>PRICE</th>
        <th>CHG</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in marketRows" :key="item.symbol">
        <td class="cyan">{{ item.symbol }}</td>
        <td class="white">{{ item.price }}</td>
        <td :class="item.change.startsWith('+') ? 'up' : 'down'">{{ item.change }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const { marketRows, loading } = useMarketData()
</script>
