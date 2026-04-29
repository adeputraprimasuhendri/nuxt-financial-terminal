<template>
  <header>
    <div class="command-container">
      <span class="command-label">GO</span>
      <input id="command-input" type="text" placeholder="XAU CURNCY" />
    </div>
    <div class="status-bar">
      <span>BLOOMBERG ANYWHERE</span>
      <span>{{ currentDate }}</span>
      <span>{{ currentTime }}</span>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentDate = ref('')
const currentTime = ref('')

const updateTime = () => {
  const now = new Date()
  currentDate.value = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()
  currentTime.value = now.toLocaleTimeString('en-GB', { hour12: false })
}

let timer
onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>
