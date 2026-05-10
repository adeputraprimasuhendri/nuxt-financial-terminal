import { computed, onMounted, onUnmounted } from 'vue'

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

interface SignalApiResponse {
  status: string
  data: TradingSignal[]
}

export const useSignals = () => {
  // Use the proxied relative path instead of the full URL.
  // This works on both server (Docker network) and client (via Nitro proxy).
  const { data, pending, error, refresh } = useFetch<SignalApiResponse>('/api/signals', {
    key: 'tradingSignals',
    server: false, // Force client-side so it shows in Network tab
    params: {
      _t: Date.now()
    }
  })


  let timer: any = null

  // Format the time for the table directly in the computed signals
  const signals = computed(() => {
    const rawData = (data.value as any)?.data || data.value
    if (!rawData || !Array.isArray(rawData)) return []
    
    return rawData.map(s => {
      let formattedTime = '--:--'
      try {
        if (s.time) {
          const timePart = s.time.includes('T') ? s.time.split('T')[1] : s.time.split(' ')[1]
          if (timePart) {
            formattedTime = timePart.substring(0, 5)
          }
        }
      } catch (e) {
        const parts = s.time ? s.time.split(' ') : []
        if (parts.length > 1) {
          formattedTime = parts[1].substring(0, 5)
        }
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
  })

  onMounted(() => {
    refresh()
  })

  return {
    signals,
    loading: pending,
    error,
    fetchSignals: refresh
  }
}
