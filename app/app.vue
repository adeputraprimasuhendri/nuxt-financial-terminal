<template>
  <div class="terminal-wrapper">
    <header>
      <div class="command-container">
        <span class="command-label">GO</span>
        <input id="command-input" type="text" placeholder="XAU CURNCY" />
      </div>
      <div class="status-bar">
        <span>BLOOMBERG ANYWHERE</span>
        <span>29 APR 2026</span>
        <span>14:35:10</span>
      </div>
    </header>

    <main>
      <section class="panel">
        <div class="panel-header">
          <span>GOLD SPOT (XAU/USD)</span>
          <span class="up">2,345.67 +12.34</span>
        </div>
        <div class="panel-content">
          <div class="chart-container">
            <!-- Chart placeholder -->
            <div style="padding: 20px; color: var(--border-gray)">[ XAU/USD INTRADAY CHART ]</div>
          </div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <span>TOP NEWS</span>
        </div>
        <div class="panel-content">
          <div class="news-item">
            <span class="news-time">14:30</span>
            <span class="news-headline">Fed Signals Cautious Approach to Future Rate Cuts</span>
          </div>
          <div class="news-item">
            <span class="news-time">14:15</span>
            <span class="news-headline">Gold Hits Record High Amid Global Uncertainty</span>
          </div>
          <div class="news-item">
            <span class="news-time">13:45</span>
            <span class="news-headline">Central Banks Increase Bullion Reserves for 3rd Month</span>
          </div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <span>MARKET DATA</span>
        </div>
        <div class="panel-content">
          <table>
            <thead>
              <tr>
                <th>SYMBOL</th>
                <th>PRICE</th>
                <th>CHG</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="cyan">XAU</td>
                <td class="white">2345.67</td>
                <td class="up">+0.53%</td>
              </tr>
              <tr>
                <td class="cyan">XAG</td>
                <td class="white">28.45</td>
                <td class="down">-0.12%</td>
              </tr>
              <tr>
                <td class="cyan">DXY</td>
                <td class="white">104.22</td>
                <td class="up">+0.05%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <span>ALERTS</span>
        </div>
        <div class="panel-content">
          <div class="news-item alert-flash">
            <span class="news-time">14:00</span>
            <span class="news-headline amber">CRITICAL: VOLATILITY SPIKE DETECTED</span>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <div class="ticker-wrap">
        <div class="ticker">
          <span class="ticker-item">XAU/USD 2,345.67 <span class="up">▲</span></span>
          <span class="ticker-item">XAG/USD 28.45 <span class="down">▼</span></span>
          <span class="ticker-item">BTC/USD 64,123.00 <span class="up">▲</span></span>
          <span class="ticker-item">EUR/USD 1.0725 <span class="down">▼</span></span>
          <span class="ticker-item">GBP/USD 1.2540 <span class="white">■</span></span>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* Global styles are imported in nuxt.config.ts */
</style>
