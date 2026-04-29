import { ref, onMounted } from 'vue'

export const useNews = () => {
  const config = useRuntimeConfig()
  
  // Use shared state to preserve news data across navigation
  const newsItems = useState('newsItems', () => [])
  const alertItems = useState('alertItems', () => [])
  const loading = useState('newsLoading', () => true)

  const fetchNews = async () => {
    // If we already have news, don't refetch unless explicitly requested (optional)
    if (newsItems.value.length > 0) {
      loading.value = false
      return
    }

    loading.value = true
    const apiKey = config.public.newsApiKey || 'demo'
    const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=GOLD&apikey=${apiKey}`

    try {
      const data: any = await $fetch(url)
      
      if (data.feed) {
        newsItems.value = data.feed.slice(0, 15).map((item: any) => {
          const rawTime = item.time_published
          const formattedTime = rawTime ? `${rawTime.substring(9, 11)}:${rawTime.substring(11, 13)}` : '--:--'
          
          return {
            id: item.title, // Store raw title as ID for easier comparison
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
        if (topAlert) {
          alertItems.value = [topAlert]
        } else {
          alertItems.value = [{ time: 'SYS', headline: 'NO CRITICAL ALERTS DETECTED', isAlert: false }]
        }
      } else if (data.Note) {
        newsItems.value = [{ id: 'ERR', time: 'ERR', headline: 'API RATE LIMIT EXCEEDED (DEMO MODE)' }]
        alertItems.value = [{ time: 'SYS', headline: 'PLEASE UPDATE API KEY', isAlert: true }]
      }
    } catch (error) {
      console.error('Failed to fetch news:', error)
      newsItems.value = [{ id: 'ERR', time: 'ERR', headline: 'FAILED TO LOAD NEWS FEED' }]
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchNews)

  return {
    loading,
    newsItems,
    alertItems,
    fetchNews
  }
}
