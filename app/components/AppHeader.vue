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
const { currentDate, currentTime } = useClock()
</script>
