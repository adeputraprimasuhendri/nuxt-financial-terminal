export interface TradingSignal {
  signal: string
  pair: string
  entry: string
  sl: string
  tp1: string
  tp2: string
  tp3: string
  confidence: string
  status: string
  analysis: string
  last_event: string
  time: string
  time_update?: string
}

export const useSignals = () => {
  const { data, pending, error, refresh } = useFetch<TradingSignal[]>('https://nandaprasetyafx.com/xauusd-signal/history.json', {
    key: 'tradingSignalsHistory'
  })

  // Format the time for the table directly in the computed signals
  const signals = computed(() => {
    if (!data.value || !Array.isArray(data.value)) return []
    return data.value.map(s => {
      const timeParts = s.time.split(' ')
      const formattedTime = timeParts.length > 1 ? timeParts[1].substring(0, 5) : '--:--'
      return {
        ...s,
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
