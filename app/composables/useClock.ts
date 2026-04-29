import { ref, onMounted, onUnmounted } from 'vue'

export const useClock = () => {
  const currentDate = ref('')
  const currentTime = ref('')

  const updateTime = () => {
    const now = new Date()
    currentDate.value = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()
    currentTime.value = now.toLocaleTimeString('en-GB', { hour12: false })
  }

  let timer: any
  onMounted(() => {
    updateTime()
    timer = setInterval(updateTime, 1000)
  })

  onUnmounted(() => {
    clearInterval(timer)
  })

  return {
    currentDate,
    currentTime
  }
}
