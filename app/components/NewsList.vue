<template>
  <div class="news-container">
    <div v-for="(item, index) in items" :key="index" class="news-item" :class="{ 'alert-flash': item.isAlert }">
      <span class="news-time">{{ item.time }}</span>
      <span 
        class="news-sentiment" 
        v-if="item.sentiment"
        :class="getSentimentClass(item.sentiment)"
      >
        [{{ item.sentiment.split('-').map(s => s[0]).join('') }}]
      </span>
      <NuxtLink :to="`/news/${item.id}`" class="news-headline" :class="{ amber: item.isAlert }">
        {{ item.headline }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
})

const getSentimentClass = (sentiment) => {
  if (!sentiment) return 'white'
  if (sentiment.includes('Bullish')) return 'up'
  if (sentiment.includes('Bearish')) return 'down'
  return 'cyan'
}
</script>

<style scoped>
.news-sentiment {
  font-size: 11px;
  width: 40px;
  flex-shrink: 0;
  text-transform: uppercase;
  font-weight: bold;
}
</style>
