import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

export interface MarketRow {
  symbol: string
  price: string
  change: string
  open: string
  high: string
  low: string
  volume: string
}

interface OhlcvTick {
  ticker: string
  time: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

// Connect via the container's own Nginx proxy (/ws/ticks → bridge.alrca.com)
// Falls back to the external host directly if window is not available (SSR guard)
const WS_URL = typeof window !== 'undefined'
  ? `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/ws/ticks`
  : 'wss://bridge.alrca.com/ws/ticks'

export const useMarketData = () => {
  const { activeTicker } = useActiveChart()

  // Shared state with useCandlestickChart
  const spotPrice = useState<{ price: string; change: string }>(
    'spotPrice',
    () => ({ price: '---', change: '---' })
  )

  const loading = ref(true)
  const error = ref<string | null>(null)

  // Raw tick store keyed by ticker symbol
  const tickStore = useState<Record<string, OhlcvTick>>('marketDataTicks', () => ({}))

  const marketRows = computed<MarketRow[]>(() => {
    return Object.values(tickStore.value).map((tick) => {
      const changePct = tick.open > 0 ? ((tick.close - tick.open) / tick.open) * 100 : 0
      const changeStr = (changePct >= 0 ? '+' : '') + changePct.toFixed(2) + '%'

      return {
        symbol: tick.ticker,
        price: tick.close ? tick.close.toLocaleString() : '---',
        change: changeStr,
        open: tick.open ? tick.open.toLocaleString() : '---',
        high: tick.high ? tick.high.toLocaleString() : '---',
        low: tick.low ? tick.low.toLocaleString() : '---',
        volume: tick.volume ? tick.volume.toLocaleString() : '0'
      }
    })
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
      const xau = marketRows.value.find(m => normalize(m.symbol).includes('XAU'))
      if (xau) {
        spotPrice.value = { price: xau.price, change: xau.change }
      }
    }
  }, { immediate: true })

  let ws: WebSocket | null = null
  let reconnectTimer: any = null

  const connect = () => {
    if (ws) {
      ws.onclose = null
      ws.onerror = null
      ws.close()
    }

    ws = new WebSocket(WS_URL)

    ws.onopen = () => {
      loading.value = false
      error.value = null
    }

    ws.onmessage = (event: MessageEvent) => {
      try {
        const payload = JSON.parse(event.data)
        const ticks: OhlcvTick[] = payload?.ohlcv ?? []

        if (ticks.length > 0) {
          const updated = { ...tickStore.value }
          for (const tick of ticks) {
            if (tick.ticker) {
              updated[tick.ticker] = tick
            }
          }
          tickStore.value = updated
          loading.value = false
        }
      } catch {
        // ignore malformed frames
      }
    }

    ws.onerror = () => {
      error.value = 'WebSocket error'
    }

    ws.onclose = () => {
      // Reconnect after 3 seconds
      reconnectTimer = setTimeout(connect, 3000)
    }
  }

  onMounted(() => {
    connect()
  })

  onUnmounted(() => {
    if (reconnectTimer) clearTimeout(reconnectTimer)
    if (ws) {
      ws.onclose = null
      ws.close()
    }
  })

  return {
    loading,
    spotPrice,
    marketRows,
    error,
    fetchMarketData: connect
  }
}
