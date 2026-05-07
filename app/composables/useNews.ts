import { onMounted, onUnmounted } from 'vue'

export const useNews = () => {
  const config = useRuntimeConfig()
  
  const newsItems = useState('newsItems', () => [])
  const loading = useState('newsLoading', () => false)
  const error = useState('newsError', () => null)
  const isFetching = useState('newsIsFetching', () => false)

  const fetchNews = async () => {
    if (isFetching.value) return

    isFetching.value = true
    if (newsItems.value.length === 0) {
      loading.value = true
    }
    error.value = null

    const apiKey = config.public.newsApiKey || 'demo'
    // Add a random parameter to Alpha Vantage to try and bypass their cache if any, 
    // though they usually don't cache at the edge for 'demo' or specific keys
    const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=XAUUSD&apikey=${apiKey}`

    try {
      const data: any = await $fetch(url)
      
      if (data.feed) {
        newsItems.value = data.feed.slice(0, 15).map((item: any) => {
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
      } else if (data.Note || data.Information) {
        // Alpha Vantage returns Note/Information for rate limits
        error.value = 'API RATE LIMIT EXCEEDED'
      }
    } catch (err) {
      console.error('Failed to fetch news:', err)
      error.value = 'NETWORK ERROR'
    } finally {
      loading.value = false
      isFetching.value = false
    }
  }

  let timer: any = null
  onMounted(() => {
    fetchNews()
    // Update every 5 minutes
    timer = setInterval(fetchNews, 300000)
  })

  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })

  return {
    loading,
    newsItems,
    error,
    fetchNews
  }
}
