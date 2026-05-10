<template>
  <div class="order-container">
    <div class="order-tabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="{ active: activeOrderTab === tab }"
        @click="activeOrderTab = tab"
      >{{ tab }}</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>TIME</th>
          <th>TICKET</th>
          <th>SYMBOL</th>
          <th>TYPE</th>
          <th>LOTS</th>
          <th>PRICE</th>
          <th>SL</th>
          <th>TP</th>
          <th>STATUS</th>
          <th>P&L</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in filteredOrders" :key="order.ticket">
          <td class="white">{{ order.time }}</td>
          <td class="amber">{{ order.ticket }}</td>
          <td class="cyan">{{ order.symbol }}</td>
          <td :class="order.type.includes('BUY') ? 'up' : 'down'">{{ order.type }}</td>
          <td class="white">{{ order.lots }}</td>
          <td class="white">{{ order.price }}</td>
          <td class="down">{{ order.sl }}</td>
          <td class="up">{{ order.tp }}</td>
          <td :class="getStatusClass(order.status)">{{ order.status }}</td>
          <td :class="order.pnl >= 0 ? 'up' : 'down'">{{ order.pnl >= 0 ? '+' : '' }}{{ order.pnl.toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="filteredOrders.length === 0" class="empty">
      NO {{ activeOrderTab.toUpperCase() }} ORDERS
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const tabs = ['OPEN', 'PENDING', 'HISTORY']
const activeOrderTab = ref('OPEN')

const orders = [
  { ticket: 10042301, time: '08:12', symbol: 'XAUUSD', type: 'BUY',       lots: 0.10, price: '3285.40', sl: '3270.00', tp: '3340.00', status: 'OPEN',    pnl:  274.00 },
  { ticket: 10042298, time: '07:55', symbol: 'XAUUSD', type: 'BUY',       lots: 0.05, price: '3298.75', sl: '3280.00', tp: '3350.00', status: 'OPEN',    pnl:   70.25 },
  { ticket: 10042275, time: '06:30', symbol: 'BTCUSD', type: 'SELL',      lots: 0.01, price: '84200.00', sl: '85500.00', tp: '80000.00', status: 'OPEN', pnl:   75.00 },
  { ticket: 10042260, time: '05:14', symbol: 'BTCUSD', type: 'BUY',       lots: 0.01, price: '82100.00', sl: '80500.00', tp: '86000.00', status: 'OPEN', pnl:  -38.75 },
  { ticket: 10042200, time: '04:00', symbol: 'XAUUSD', type: 'BUY LIMIT', lots: 0.10, price: '3240.00', sl: '3220.00', tp: '3300.00', status: 'PENDING', pnl:    0.00 },
  { ticket: 10042180, time: '03:30', symbol: 'BTCUSD', type: 'SELL STOP', lots: 0.02, price: '79500.00', sl: '81000.00', tp: '75000.00', status: 'PENDING', pnl:  0.00 },
  { ticket: 10042100, time: '00:45', symbol: 'XAUUSD', type: 'SELL',      lots: 0.10, price: '3310.20', sl: '3330.00', tp: '3270.00', status: 'CLOSED',  pnl:  320.00 },
  { ticket: 10042050, time: 'yesterday', symbol: 'BTCUSD', type: 'BUY',   lots: 0.01, price: '80100.00', sl: '78500.00', tp: '84000.00', status: 'CLOSED', pnl: -150.00 },
  { ticket: 10041980, time: 'yesterday', symbol: 'XAUUSD', type: 'BUY',   lots: 0.05, price: '3190.00', sl: '3170.00', tp: '3250.00', status: 'CLOSED',  pnl:  625.00 },
]

const filteredOrders = computed(() => {
  if (activeOrderTab.value === 'OPEN')    return orders.filter(o => o.status === 'OPEN')
  if (activeOrderTab.value === 'PENDING') return orders.filter(o => o.status === 'PENDING')
  return orders.filter(o => o.status === 'CLOSED')
})

const getStatusClass = (status) => {
  switch (status) {
    case 'OPEN':    return 'amber'
    case 'PENDING': return 'cyan'
    case 'CLOSED':  return 'white'
    default:        return 'white'
  }
}
</script>

<style scoped>
.order-container {
  overflow-x: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.order-tabs {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--border-gray);
  padding-bottom: 6px;
}

.order-tabs button {
  background: transparent;
  border: 1px solid var(--border-gray);
  color: var(--border-gray);
  font-family: var(--font-main);
  font-size: 11px;
  padding: 3px 10px;
  cursor: pointer;
  letter-spacing: 0.05em;
  transition: all 0.15s;
}

.order-tabs button.active,
.order-tabs button:hover {
  border-color: var(--primary-amber);
  color: var(--primary-amber);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  text-align: left;
  padding: 4px 8px;
  white-space: nowrap;
  border-bottom: 1px solid var(--border-gray);
}

th {
  color: var(--primary-amber);
  font-size: 11px;
  letter-spacing: 0.05em;
}

td {
  font-size: 12px;
}

.empty {
  color: var(--border-gray);
  padding: 20px 0;
  text-align: center;
  font-size: 12px;
}
</style>
