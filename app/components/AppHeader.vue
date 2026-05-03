<template>
  <header>
    <div class="command-container">
      <span class="command-label">GO</span>
      <input id="command-input" type="text" v-model="inputValue" :placeholder="activeTicker"
        @keydown.enter="handleSubmit" />
    </div>
    <div class="status-bar">
      <span>ALRCA.COM</span>
      <span>{{ currentDate }}</span>
      <span>{{ currentTime }}</span>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const { currentDate, currentTime } = useClock()
const { activeTicker, setTicker } = useActiveChart()

const inputValue = ref('')

const handleSubmit = () => {
  if (inputValue.value.trim()) {
    setTicker(inputValue.value)
    inputValue.value = ''
  }
}
</script>
