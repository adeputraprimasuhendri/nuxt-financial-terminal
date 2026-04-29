import { ref, onMounted } from 'vue'

export const useTicker = () => {
  const loading = ref(true)
  const tickerItems = ref([])

  const fetchTickerData = async () => {
    loading.value = true
    await new Promise(resolve => setTimeout(resolve, 1500))

    tickerItems.value = [
      { pair: 'XAU/USD', price: '2,345.67', trend: 'up' },
      { pair: 'XAG/USD', price: '28.45', trend: 'down' },
      { pair: 'BTC/USD', price: '64,123.00', trend: 'up' },
      { pair: 'EUR/USD', price: '1.0725', trend: 'down' },
      { pair: 'GBP/USD', price: '1.2540', trend: 'neutral' },
      { pair: 'JPY/USD', price: '155.30', trend: 'up' }
    ]
    loading.value = false
  }

  onMounted(fetchTickerData)

  return {
    loading,
    tickerItems
  }
}
