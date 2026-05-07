import { computed } from 'vue'

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
  const { data, pending, error, refresh } = useFetch<SignalApiResponse>('https://terminal-data.alrca.com/signals', {
    key: 'tradingSignalsHistory'
  })

  // Format the time for the table directly in the computed signals
  const signals = computed(() => {
    // Handle both wrapped response and raw array (just in case)
    const rawData = (data.value as any)?.data || data.value
    if (!rawData || !Array.isArray(rawData)) return []
    
    return rawData.map(s => {
      // Handle ISO format "2026-05-07T08:12:53+07:00"
      let formattedTime = '--:--'
      try {
        if (s.time) {
          const timePart = s.time.includes('T') ? s.time.split('T')[1] : s.time.split(' ')[1]
          if (timePart) {
            formattedTime = timePart.substring(0, 5)
          }
        }
      } catch (e) {
        // Fallback to simple split if ISO parsing fails
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

  return {
    signals,
    loading: pending,
    error,
    fetchSignals: refresh
  }
}
