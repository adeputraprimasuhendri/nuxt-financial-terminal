<template>
  <div class="chart-container" ref="containerRef">
    <div v-if="loading" class="chart-overlay">LOADING {{ activeTicker }}...</div>
    <div v-if="error" class="chart-overlay chart-overlay--error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const containerRef = ref<HTMLElement | null>(null)
const { loading, error, fetchAndRender } = useCandlestickChart()
const { activeTicker } = useActiveChart()

onMounted(() => {
  if (containerRef.value) {
    fetchAndRender(activeTicker.value, containerRef.value)
  }
})

watch(activeTicker, (ticker) => {
  if (containerRef.value) {
    fetchAndRender(ticker, containerRef.value)
  }
})
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.chart-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--border-gray);
  pointer-events: none;
}

.chart-overlay--error {
  color: var(--down-red);
}
</style>
