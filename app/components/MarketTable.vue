<template>
  <table>
    <thead>
      <tr>
        <th>SYMBOL</th>
        <th>PRICE</th>
        <th>CHG</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.symbol">
        <td class="cyan">{{ item.symbol }}</td>
        <td class="white">{{ item.price }}</td>
        <td :class="item.change.startsWith('+') ? 'up' : 'down'">{{ item.change }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  data: {
    type: Array,
    default: () => [
      { symbol: 'XAU', price: '2345.67', change: '+0.53%' },
      { symbol: 'XAG', price: '28.45', change: '-0.12%' },
      { symbol: 'DXY', price: '104.22', change: '+0.05%' }
    ]
  }
})
</script>
