export type Timeframe = '15m' | '1h' | '4h' |'1d' | '1w' | '1M'
export type TabName = 'chart' | 'news' | 'market' | 'alerts' | 'portfolio' | 'orders'

export const TIMEFRAMES: Timeframe[] = ['15m', '1h', '4h', '1d', '1w', '1M']

export const useActiveChart = () => {
  const activeTicker    = useState('activeTicker',    () => 'XAUUSD')
  const activeTimeframe = useState<Timeframe>('activeTimeframe', () => '1d')
  const activeTab       = useState<TabName>('activeTab', () => 'chart')

  const setTicker = (ticker: string) => {
    const normalized = ticker.trim().toUpperCase()
    if (normalized) activeTicker.value = normalized
  }

  const setTimeframe = (tf: Timeframe) => {
    activeTimeframe.value = tf
  }

  return { activeTicker, setTicker, activeTimeframe, setTimeframe, activeTab }
}
