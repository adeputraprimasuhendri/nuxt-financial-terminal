import { ref, computed, onMounted, onUnmounted } from 'vue'

export interface TradingSignal {
  id: number
  signal: string
  pair: string
  entry: number
  sl: number
  tp1: number
  tp2: number
  tp3: number
  confidence: number
  status: string
  analysis: string
  last_event: string
  time: string
  time_update: string
  created_at: string
  updated_at: string
}

interface SignalWsMessage {
  type: string
  signals: TradingSignal[]
}

const WS_URL = typeof window !== 'undefined'
  ? `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/ws/signals`
  : 'ws://api.alrca.com/ws'

export const useSignals = () => {
  const rawSignals = useState<TradingSignal[]>('tradingSignals', () => [])
  const loading = ref(true)
  const error = ref<string | null>(null)

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
        const msg: SignalWsMessage = JSON.parse(event.data)
        if (msg.type === 'signals' && Array.isArray(msg.signals)) {
          rawSignals.value = msg.signals
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

  const signals = computed(() =>
    rawSignals.value.map(s => {
      let formattedTime = '--:--'
      try {
        if (s.time) {
          const timePart = s.time.includes('T') ? s.time.split('T')[1] : s.time.split(' ')[1]
          if (timePart) formattedTime = timePart.substring(0, 5)
        }
      } catch {
        const parts = s.time ? s.time.split(' ') : []
        if (parts[1]) formattedTime = parts[1].substring(0, 5)
      }

      return {
        ...s,
        entry: Math.round(s.entry),
        sl: Math.round(s.sl),
        tp1: Math.round(s.tp1),
        tp2: Math.round(s.tp2),
        tp3: Math.round(s.tp3),
        displayTime: formattedTime
      }
    })
  )

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
    signals,
    loading,
    error,
    fetchSignals: connect
  }
}
