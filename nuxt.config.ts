// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      newsApiKey: '' // Default empty, override via NUXT_PUBLIC_NEWS_API_KEY env var
    }
  },
  routeRules: {
    '/api/signals': { proxy: 'http://trade_be:8080/signals' },
    '/api/tickers': { proxy: 'http://trade_be:8080/tickers' },
    '/api/candles': { proxy: 'http://trade_be:8080/marketdata/candles' },
    '/api/news': { proxy: 'https://www.alphavantage.co/query' }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      titleTemplate: '%s',
      meta: [
        { name: 'robots', content: 'index, follow' },
        { name: 'theme-color', content: '#000000' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap' }
      ]
    }
  }
})

