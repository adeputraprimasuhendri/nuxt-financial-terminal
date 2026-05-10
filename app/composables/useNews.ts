import { computed, onMounted, onUnmounted } from 'vue'

export const useNews = () => {
  const config = useRuntimeConfig()
  
  const apiKey = config.public.newsApiKey || 'demo'
  // Use proxied path. Query params are passed as objects in useFetch.
  const url = '/api/news'

  const { data, pending, error, refresh } = useFetch<any>(url, {
    key: 'newsData',
    query: {
      function: 'NEWS_SENTIMENT',
      tickers: 'XAUUSD',
      apikey: apiKey
    }
  })

  const newsItems = computed(() => {
    if (data.value?.feed) {
      return data.value.feed.slice(0, 15).map((item: any) => {
        const rawTime = item.time_published
        const formattedTime = rawTime ? `${rawTime.substring(9, 11)}:${rawTime.substring(11, 13)}` : '--:--'
        
        return {
          id: item.title,
          time: formattedTime,
          headline: item.title,
          summary: item.summary,
          source: item.source,
          url: item.url,
          authors: item.authors || [],
          sentiment: item.overall_sentiment_label,
          isAlert: item.overall_sentiment_label === 'Bearish' || item.overall_sentiment_label === 'Bullish'
        }
      })
    }
    return []
  })

  const newsError = computed(() => {
    if (error.value) return 'NETWORK ERROR'
    if (data.value?.Note || data.value?.Information) return 'API RATE LIMIT EXCEEDED'
    return null
  })

  let timer: any = null
  onMounted(() => {
    // Update every 5 minutes
    timer = setInterval(() => {
      refresh()
    }, 300000)
  })

  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })

  return {
    loading: pending,
    newsItems,
    error: newsError,
    fetchNews: refresh
  }
}
