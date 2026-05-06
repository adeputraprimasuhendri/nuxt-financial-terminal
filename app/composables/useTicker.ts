import { computed } from 'vue'
import type { MarketRow } from './useMarketData'

export const useTicker = () => {
  const marketRows = useState<MarketRow[]>('marketRows', () => [])
  const loading = useState('marketLoading', () => false)

  const tickerItems = computed(() =>
    marketRows.value.map((item) => ({
      pair: item.symbol,
      price: item.price,
      trend: item.change.startsWith('+') ? 'up' : 'down'
    }))
  )

  return {
    loading,
    tickerItems
  }
}
