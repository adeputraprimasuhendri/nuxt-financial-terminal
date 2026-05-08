import { computed, onMounted, onUnmounted, watch } from 'vue'

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
  const { activeTicker } = useActiveChart()
  
  // Shared state with useCandlestickChart
  const spotPrice = useState<{ price: string; change: string }>(
    'spotPrice',
    () => ({ price: '---', change: '---' })
  )
  
  // Use useFetch with server: false for client-side only fetching
  const { data, pending, error, refresh } = useFetch<any>('https://terminal-data.alrca.com/tickers', {
    key: 'marketData',
    server: false,
    params: {
      _t: Date.now()
    }
  })

  const marketRows = computed<MarketRow[]>(() => {
    // Robust data extraction: check for wrapped or unwrapped data
    const rawData = data.value?.status === 'success' ? data.value.data : data.value
    
    if (Array.isArray(rawData)) {
      return rawData
        .filter((item: any) => item && item.ticker)
        .map((item: any) => {
          const quote = item.last_quote || {}
          const open = quote.open || 0
          const close = quote.close || 0
          const high = quote.high || 0
          const low = quote.low || 0
          const volume = quote.volume || 0
          
          const changePct = open > 0 ? ((close - open) / open) * 100 : 0
          const changeStr = (changePct >= 0 ? '+' : '') + changePct.toFixed(2) + '%'
          
          return {
            symbol: item.ticker,
            price: close ? close.toLocaleString() : '---',
            change: changeStr,
            open: open ? open.toLocaleString() : '---',
            high: high ? high.toLocaleString() : '---',
            low: low ? low.toLocaleString() : '---',
            volume: volume ? volume.toLocaleString() : '0'
          }
        })
    }
    return []
  })

  // Normalize symbol for matching (e.g. XAUUSD vs XAU/USD)
  const normalize = (s: string) => s ? s.replace(/[^A-Z0-9]/gi, '').toUpperCase() : ''

  // Update spotPrice whenever marketRows or activeTicker changes
  watch([marketRows, activeTicker], () => {
    const ticker = normalize(activeTicker.value)
    const row = marketRows.value.find(m => normalize(m.symbol) === ticker)
    
    if (row) {
      spotPrice.value = { price: row.price, change: row.change }
    } else {
      // Fallback: try to find anything related to XAU if active ticker not found
      const xau = marketRows.value.find(m => normalize(m.symbol).includes('XAU'))
      if (xau) {
        spotPrice.value = { price: xau.price, change: xau.change }
      }
    }
  }, { immediate: true })

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
