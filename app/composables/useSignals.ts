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
  const signalsData = useState<TradingSignal[]>('tradingSignalsData', () => [])
  const loading = useState('tradingSignalsLoading', () => false)
  const error = useState<any>('tradingSignalsError', () => null)
  let timer: any = null

  const fetchSignals = async () => {
    // Only show loading on initial fetch
    if (signalsData.value.length === 0) {
      loading.value = true
    }
    
    try {
      // Use $fetch directly to bypass useFetch caching behavior in static sites
      const response = await $fetch<SignalApiResponse>('https://terminal-data.alrca.com/signals', {
        params: {
          _t: Date.now()
        },
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      })

      const rawData = response?.data || response
      if (Array.isArray(rawData)) {
        signalsData.value = rawData
      } else if (response && typeof response === 'object' && 'data' in response) {
         signalsData.value = (response as any).data
      }
      
      error.value = null
    } catch (err) {
      console.error('Error fetching signals:', err)
      error.value = err
    } finally {
      loading.value = false
    }
  }

  // Format the time for the table directly in the computed signals
  const signals = computed(() => {
    if (!signalsData.value || !Array.isArray(signalsData.value)) return []
    
    return signalsData.value.map(s => {
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

  onMounted(() => {
    fetchSignals()
    // Poll for new signals every 30 seconds
    timer = setInterval(fetchSignals, 30000)
  })

  onUnmounted(() => {
    if (timer) {
      clearInterval(timer)
    }
  })

  return {
    signals,
    loading,
    error,
    fetchSignals
  }
}
