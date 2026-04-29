<template>
  <div class="news-container">
    <div v-for="(item, index) in items" :key="index" class="news-item" :class="{ 'alert-flash': item.isAlert }">
      <span class="news-time">{{ item.time }}</span>
      <span class="news-headline" :class="{ amber: item.isAlert }">{{ item.headline }}</span>
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
</script>
