<template>
  <main class="news-detail-page">
    <BasePanel :title="`NWS <${article?.source || 'DETAIL'}>` ">
      <template #header-right>
        <NuxtLink to="/" class="amber" style="text-decoration: none;">[ 1 < GO > BACK ]</NuxtLink>
      </template>
      
      <div v-if="loading" class="white">FETCHING ARTICLE CONTENT...</div>
      <div v-else-if="article" class="article-content">
        <h1 class="cyan headline">{{ article.headline }}</h1>
        
        <div class="metadata">
          <span class="amber">TIME: {{ article.time }}</span>
          <span class="white"> | SOURCE: {{ article.source }}</span>
          <span v-if="article.authors && article.authors.length" class="white"> | BY: {{ article.authors.join(', ') }}</span>
          <span class="white"> | SENTIMENT: </span>
          <span :class="getSentimentClass(article.sentiment)">{{ article.sentiment }}</span>
        </div>

        <div class="resume-section">
          <h3 class="amber">RESUME</h3>
          <p class="white summary">{{ article.summary }}</p>
        </div>

        <div class="action-section">
          <a :href="article.url" target="_blank" class="cyan">[ READ FULL STORY AT {{ article.source?.toUpperCase() || 'SOURCE' }} ]</a>
        </div>
      </div>
      <div v-else class="down">ARTICLE NOT FOUND</div>
    </BasePanel>
  </main>
</template>

<script setup>
const route = useRoute()
const id = route.params.id // decoded automatically
const { newsItems, loading } = useNews()

const article = computed(() => {
  // Use decoded ID from route params to find article
  return newsItems.value.find(item => item.id === id)
})

const getSentimentClass = (sentiment) => {
  if (!sentiment) return 'white'
  if (sentiment.includes('Bullish')) return 'up'
  if (sentiment.includes('Bearish')) return 'down'
  return 'cyan'
}
</script>

<style scoped>
.news-detail-page {
  display: block;
  padding: 10px;
}
.headline {
  font-size: 20px;
  margin-bottom: 10px;
  text-transform: uppercase;
}
.metadata {
  font-size: 12px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border-gray);
  padding-bottom: 10px;
}
.resume-section {
  margin-bottom: 30px;
}
.resume-section h3 {
  font-size: 14px;
  margin-bottom: 10px;
  text-decoration: underline;
}
.summary {
  font-size: 15px;
  line-height: 1.6;
}
.action-section {
  margin-top: 40px;
}
.action-section a {
  text-decoration: none;
  font-weight: bold;
}
.action-section a:hover {
  text-decoration: underline;
}
</style>
