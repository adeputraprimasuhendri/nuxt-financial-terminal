export type Timeframe = '15m' | '1d' | '1w' | '1M'

export const TIMEFRAMES: Timeframe[] = ['15m', '1d', '1w', '1M']

export const useActiveChart = () => {
  const activeTicker    = useState('activeTicker',    () => 'BBCA')
  const activeTimeframe = useState<Timeframe>('activeTimeframe', () => '15m')

  const setTicker = (ticker: string) => {
    const normalized = ticker.trim().toUpperCase()
    if (normalized) activeTicker.value = normalized
  }

  const setTimeframe = (tf: Timeframe) => {
    activeTimeframe.value = tf
  }

  return { activeTicker, setTicker, activeTimeframe, setTimeframe }
}
