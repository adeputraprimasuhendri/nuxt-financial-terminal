import { ref, onMounted } from 'vue'

export const useMarketData = () => {
  const config = useRuntimeConfig()
  
  const loading = useState('marketLoading', () => false)
  const spotPrice = useState('spotPrice', () => ({ price: '2,345.67', change: '+12.34' }))
  const marketRows = useState('marketRows', () => [])
  const error = useState('marketError', () => null)
  const isFetching = useState('marketIsFetching', () => false)

  const fetchMarketData = async (force = false) => {
    if ((marketRows.value.length > 0 && !force) || isFetching.value) {
      return
    }

    isFetching.value = true
    loading.value = true
    error.value = null

    const apiKey = config.public.newsApiKey || 'demo'
    const url = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${apiKey}`

    try {
      const data: any = await $fetch(url)
      
      if (data.top_gainers) {
        marketRows.value = data.top_gainers.slice(0, 10).map((item: any) => ({
          symbol: item.ticker,
          price: parseFloat(item.price).toFixed(2),
          change: (item.change_percentage.startsWith('-') ? '' : '+') + item.change_percentage
        }))

        const topGainer = marketRows.value[0]
        if (topGainer) {
          spotPrice.value = { price: '2,345.67', change: topGainer.change }
        }
      } else if (data.Note || data.Information) {
        error.value = 'API LIMIT REACHED'
      }
    } catch (err) {
      console.error('Failed to fetch market data:', err)
      error.value = 'CONNECTION ERROR'
    } finally {
      loading.value = false
      isFetching.value = false
    }
  }

  onMounted(() => {
    fetchMarketData()
  })

  return {
    loading,
    spotPrice,
    marketRows,
    error,
    fetchMarketData
  }
}
