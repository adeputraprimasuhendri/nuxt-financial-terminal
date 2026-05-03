export const useActiveChart = () => {
  const activeTicker = useState('activeTicker', () => 'BBCA')

  const setTicker = (ticker: string) => {
    const normalized = ticker.trim().toUpperCase()
    if (normalized) activeTicker.value = normalized
  }

  return { activeTicker, setTicker }
}
