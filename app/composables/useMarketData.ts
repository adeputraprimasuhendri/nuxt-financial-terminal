import { onMounted } from 'vue'

export const useMarketData = () => {
  const loading = useState('marketLoading', () => false)
  const spotPrice = useState('spotPrice', () => ({ price: '2,345.67', change: '+12.34' }))
  const marketRows = useState('marketRows', () => [])
  const error = useState<string | null>('marketError', () => null)
  const isFetching = useState('marketIsFetching', () => false)

  const fetchMarketData = async (force = false) => {
    if ((marketRows.value.length > 0 && !force) || isFetching.value) {
      return
    }

    isFetching.value = true
    loading.value = true
    error.value = null

    try {
      const data: any = await $fetch('https://terminal-data.alrca.com/tickers')

      if (data.status === 'success' && Array.isArray(data.data)) {
        marketRows.value = data.data
          .filter((item: any) => item.last_quote)
          .map((item: any) => {
            const { open, high, low, close, volume } = item.last_quote
            const changePct = open > 0 ? ((close - open) / open) * 100 : 0
            const changeStr = (changePct >= 0 ? '+' : '') + changePct.toFixed(2) + '%'
            return {
              symbol: item.ticker,
              price: close.toLocaleString(),
              change: changeStr,
              open: open.toLocaleString(),
              high: high.toLocaleString(),
              low: low.toLocaleString(),
              volume: volume.toLocaleString()
            }
          })
      } else {
        error.value = 'NO DATA'
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
