import { ref, onMounted } from 'vue'

export const useMarketData = () => {
  const loading = ref(true)
  const spotPrice = ref({ price: '0.00', change: '+0.00' })
  const marketRows = ref([])

  const fetchMarketData = async () => {
    loading.value = true
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    spotPrice.value = { price: '2,345.67', change: '+12.34' }
    marketRows.value = [
      { symbol: 'XAU', price: '2345.67', change: '+0.53%' },
      { symbol: 'XAG', price: '28.45', change: '-0.12%' },
      { symbol: 'DXY', price: '104.22', change: '+0.05%' },
      { symbol: 'WTI', price: '82.15', change: '+1.20%' }
    ]
    loading.value = false
  }

  onMounted(fetchMarketData)

  return {
    loading,
    spotPrice,
    marketRows
  }
}
