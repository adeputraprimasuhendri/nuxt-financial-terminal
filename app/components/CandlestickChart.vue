<template>
  <div class="chart-container" ref="containerRef">
    <div v-if="loading" class="chart-overlay">LOADING {{ activeTicker }}...</div>
    <div v-if="error" class="chart-overlay chart-overlay--error">{{ error }}</div>

    <div class="timeframe-bar">
      <button
        v-for="tf in TIMEFRAMES"
        :key="tf"
        :class="['tf-btn', { 'tf-btn--active': activeTimeframe === tf }]"
        @click="setTimeframe(tf)"
      >
        {{ tf.toUpperCase() }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { TIMEFRAMES } from '~/composables/useActiveChart'

const containerRef = ref<HTMLElement | null>(null)
const { loading, error, fetchAndRender } = useCandlestickChart()
const { activeTicker, activeTimeframe, setTimeframe } = useActiveChart()

const load = () => {
  if (containerRef.value) {
    fetchAndRender(activeTicker.value, containerRef.value, activeTimeframe.value)
  }
}

onMounted(load)
watch(activeTicker,    load)
watch(activeTimeframe, load)
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

.timeframe-bar {
  position: absolute;
  top: 6px;
  left: 8px;
  display: flex;
  gap: 2px;
  z-index: 10;
}

.tf-btn {
  background: transparent;
  border: 1px solid var(--border-gray);
  color: var(--border-gray);
  font-family: var(--font-main);
  font-size: 11px;
  padding: 2px 6px;
  cursor: pointer;
  letter-spacing: 0.05em;
}

.tf-btn:hover {
  border-color: var(--primary-amber);
  color: var(--primary-amber);
}

.tf-btn--active {
  border-color: var(--accent-cyan);
  color: var(--accent-cyan);
}
</style>
