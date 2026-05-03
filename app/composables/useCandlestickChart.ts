import { createChart, CandlestickSeries, HistogramSeries, LineSeries, ColorType } from 'lightweight-charts'
import { ref, onUnmounted } from 'vue'

const BASE_URL = 'https://terminal-data.alrca.com/marketdata/candles'

const VOL_UP   = 'rgba(0, 255, 0, 0.35)'
const VOL_DOWN = 'rgba(255, 51, 51, 0.35)'

const formatCandleData = (rawData: any[]) => {
  return rawData
    .map(c => {
      const open  = Number(c.open)
      const close = Number(c.close)
      return {
        time:  Math.floor(c.timestamp) as any,
        open,
        high:  Math.max(Number(c.high), open, close),
        low:   Math.min(Number(c.low),  open, close),
        close,
      }
    })
    .sort((a, b) => a.time - b.time)
}

const formatRegressionData = (rawData: any[]) => {
  return rawData
    .filter(c => c.regression_value != null)
    .map(c => ({
      time:  Math.floor(c.timestamp) as any,
      value: Number(c.regression_value),
    }))
    .sort((a, b) => a.time - b.time)
}

const formatVolumeData = (rawData: any[]) => {
  return rawData
    .map(c => ({
      time:  Math.floor(c.timestamp) as any,
      value: Number(c.volume) || 0,
      color: Number(c.close) >= Number(c.open) ? VOL_UP : VOL_DOWN,
    }))
    .sort((a, b) => a.time - b.time)
}

export const useCandlestickChart = () => {
  const chart             = ref<ReturnType<typeof createChart> | null>(null)
  const series            = ref<any>(null)
  const volumeSeries      = ref<any>(null)
  const regressionSeries  = ref<any>(null)
  const loading           = ref(false)
  const error             = ref<string | null>(null)

  const initChart = (container: HTMLElement) => {
    chart.value = createChart(container, {
      autoSize: true,
      layout: {
        textColor: '#cccccc',
        background: { type: ColorType.Solid, color: '#1a1a1a' },
      },
      grid: {
        vertLines: { color: '#333333' },
        horzLines: { color: '#333333' },
      },
    })

    // Candlestick — leave bottom 22% for volume
    series.value = chart.value.addSeries(CandlestickSeries)
    chart.value.priceScale('right').applyOptions({
      scaleMargins: { top: 0.05, bottom: 0.22 },
    })

    // Regression line — overlaid on the same price scale as candles
    regressionSeries.value = chart.value.addSeries(LineSeries, {
      color: '#00FFFF',
      lineWidth: 2,
      lineStyle: 0, // solid
      priceScaleId: 'right',
      crosshairMarkerVisible: false,
      lastValueVisible: true,
      priceLineVisible: false,
    })

    // Volume histogram — occupies bottom 20%
    volumeSeries.value = chart.value.addSeries(HistogramSeries, {
      priceFormat: { type: 'volume' },
      priceScaleId: 'volume',
    })
    chart.value.priceScale('volume').applyOptions({
      scaleMargins: { top: 0.82, bottom: 0 },
    })

    onUnmounted(() => {
      chart.value?.remove()
      chart.value        = null
      series.value       = null
      volumeSeries.value = null
      regressionSeries.value = null
    })
  }

  const fetchAndRender = async (ticker: string, container: HTMLElement) => {
    if (!ticker) return
    loading.value = true
    error.value   = null

    try {
      const url      = `${BASE_URL}?ticker=${encodeURIComponent(ticker)}&timeframe=1d`
      const response = await fetch(url)
      const data     = await response.json()

      if (!chart.value) initChart(container)

      series.value.setData(formatCandleData(data.data))
      volumeSeries.value.setData(formatVolumeData(data.data))

      const regressionData = formatRegressionData(data.data)
      if (regressionData.length > 0) {
        regressionSeries.value.setData(regressionData)
      }
    } catch (err) {
      console.error('Chart fetch error:', err)
      error.value = `Failed to load data for ${ticker}.`
    } finally {
      loading.value = false
    }
  }

  return { loading, error, fetchAndRender }
}
