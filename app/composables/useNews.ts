import { ref, onMounted } from 'vue'

export const useNews = () => {
  const config = useRuntimeConfig()
  
  const newsItems = useState('newsItems', () => [])
  const alertItems = useState('alertItems', () => [])
  const loading = useState('newsLoading', () => false)
  const error = useState('newsError', () => null)
  const isFetching = useState('newsIsFetching', () => false)

  const fetchNews = async (force = false) => {
    if ((newsItems.value.length > 0 && !force) || isFetching.value) {
      return
    }

    isFetching.value = true
    loading.value = true
    error.value = null

    const apiKey = config.public.newsApiKey || 'demo'
    const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=GOLD&apikey=${apiKey}`

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

        const topAlert = newsItems.value.find((n: any) => n.isAlert)
        alertItems.value = topAlert ? [topAlert] : [{ time: 'SYS', headline: 'NO CRITICAL ALERTS DETECTED', isAlert: false }]
      } else if (data.Note || data.Information) {
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

  onMounted(() => {
    fetchNews()
  })

  return {
    loading,
    newsItems,
    alertItems,
    error,
    fetchNews
  }
}
