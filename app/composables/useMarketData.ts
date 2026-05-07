import { computed, onMounted, onUnmounted } from 'vue'

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
  // Use useFetch with server: false for client-side only fetching
  const { data, pending, error, refresh } = useFetch<any>('https://terminal-data.alrca.com/tickers', {
    key: 'marketData',
    server: false,
    params: {
      _t: Date.now()
    }
  })

  const marketRows = computed<MarketRow[]>(() => {
    if (data.value?.status === 'success' && Array.isArray(data.value.data)) {
      return data.value.data
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
    }
    return []
  })

  const spotPrice = computed(() => {
    const xau = marketRows.value.find(m => m.symbol === 'XAUUSD')
    if (xau) {
      return { price: xau.price, change: xau.change }
    }
    return { price: '---', change: '---' }
  })

  let timer: any = null
  onMounted(() => {
    // Poll every 15 seconds
    timer = setInterval(() => {
      refresh()
    }, 15000)
  })

  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })

  return {
    loading: pending,
    spotPrice,
    marketRows,
    error,
    fetchMarketData: refresh
  }
}
