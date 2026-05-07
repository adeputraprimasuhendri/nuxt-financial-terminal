<template>
  <div class="signal-table-container">
    <table>
      <thead>
        <tr>
          <th>TIME</th>
          <th>ACT</th>
          <th>SYMBOL</th>
          <th>ENTRY</th>
          <th>TP1</th>
          <th>TP2</th>
          <th>TP3</th>
          <th>SL</th>
          <th>STATUS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index" :class="{ 'active-row': item.status === 'ACTIVE' }">
          <td class="white">{{ item.displayTime }}</td>
          <td :class="item.signal === 'BUY' ? 'up' : 'down'">{{ item.signal }}</td>
          <td class="cyan">{{ item.pair }}</td>
          <td class="white">{{ item.entry }}</td>
          <td class="up">{{ item.tp1 }}</td>
          <td class="up">{{ item.tp2 }}</td>
          <td class="up">{{ item.tp3 }}</td>
          <td class="down">{{ item.sl }}</td>
          <td :class="getStatusClass(item.status)">{{ item.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
})

const getStatusClass = (status) => {
  switch (status) {
    case 'ACTIVE': return 'amber'
    case 'TP1_HIT':
    case 'TP2_HIT':
    case 'TP3_HIT': return 'up'
    case 'SL_HIT': return 'down'
    case 'TIMEOUT': return 'white'
    default: return 'cyan'
  }
}
</script>

<style scoped>
.signal-table-container {
  overflow-x: auto;
  height: 100%;
}

.active-row {
  background: rgba(255, 153, 0, 0.05);
}
</style>
