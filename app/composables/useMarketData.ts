import { onMounted, onUnmounted } from 'vue'

export interface MarketRow {
  symbol: string
  price: string
  change: string
  open: string
  high: string
  low: string
  volume: string
}

export const useMarketData = () => {
  const loading = useState('marketLoading', () => false)
  const spotPrice = useState('spotPrice', () => ({ price: '---', change: '---' }))
  const marketRows = useState<MarketRow[]>('marketRows', () => [])
  const error = useState<string | null>('marketError', () => null)
  const isFetching = useState('marketIsFetching', () => false)

  const fetchMarketData = async () => {
    if (isFetching.value) return

    isFetching.value = true
    if (marketRows.value.length === 0) {
      loading.value = true
    }
    error.value = null

    try {
      const data: any = await $fetch('https://terminal-data.alrca.com/tickers', {
        params: { _t: Date.now() }
      })

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
          
        // Update spot price specifically for XAUUSD to show in header
        const xau = marketRows.value.find(m => m.symbol === 'XAUUSD')
        if (xau) {
          spotPrice.value = { price: xau.price, change: xau.change }
        }
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

  let timer: any = null
  onMounted(() => {
    fetchMarketData()
    // Update every 15 seconds
    timer = setInterval(fetchMarketData, 15000)
  })

  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })

  return {
    loading,
    spotPrice,
    marketRows,
    error,
    fetchMarketData
  }
}
