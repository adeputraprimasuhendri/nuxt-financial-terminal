<template>
  <div class="news-container">
    <div v-for="(item, index) in items" :key="index" class="news-item" :class="{ 'alert-flash': item.isAlert }">
      <span class="news-time">{{ item.time }}</span>
      <span class="news-source" v-if="item.source">[{{ item.source.substring(0, 8) }}]</span>
      <NuxtLink 
        :to="`/news/${item.id}`" 
        class="news-headline" 
        :class="{ amber: item.isAlert }"
      >
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
</script>

<style scoped>
.news-source {
  color: var(--indicator-purple);
  font-size: 11px;
  width: 70px;
  flex-shrink: 0;
  text-transform: uppercase;
}
</style>
