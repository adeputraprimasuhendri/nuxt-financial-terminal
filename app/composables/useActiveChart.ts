export type Timeframe = '1d' | '1w' | '1m'

export const TIMEFRAMES: Timeframe[] = ['1d', '1w', '1M']

export const useActiveChart = () => {
  const activeTicker    = useState('activeTicker',    () => 'BBCA')
  const activeTimeframe = useState<Timeframe>('activeTimeframe', () => '1d')

  const setTicker = (ticker: string) => {
    const normalized = ticker.trim().toUpperCase()
    if (normalized) activeTicker.value = normalized
  }

  const setTimeframe = (tf: Timeframe) => {
    activeTimeframe.value = tf
  }

  return { activeTicker, setTicker, activeTimeframe, setTimeframe }
}
