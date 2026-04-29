# Bloomberg Theme for XAU

A high-fidelity, terminal-style web interface for tracking XAU (Gold) and related market data, inspired by the iconic Bloomberg Terminal aesthetic.

## 🌟 Overview

This project provides a professional-grade dashboard designed for gold traders and market enthusiasts. It replicates the classic "Amber-on-Black" terminal experience, offering a distraction-free environment for monitoring market movements, news, and technical indicators.

## 🚀 Features

- **XAU/USD Focus**: Dedicated intraday monitoring for Gold Spot prices.
- **Classic Terminal UI**: High-contrast amber, cyan, and green color palette with the 'Roboto Mono' typeface.
- **Multi-Panel Layout**: 
  - **Command Bar**: Emulated "GO" command input for navigation.
  - **Market Data**: Real-time tracking of XAU, XAG (Silver), and DXY (Dollar Index).
  - **Top News Feed**: Live headlines focused on precious metals and macroeconomic trends.
  - **Scrolling Ticker**: Global market overview via a persistent footer ticker.
  - **Alert System**: Visual flash indicators for critical volatility spikes.
- **Fullscreen Experience**: Optimized for zero-latency, edge-to-edge browser visualization.

## 🛠️ Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/) (latest directory structure)
- **Styling**: Vanilla CSS with CSS Variables for theme management.
- **Typography**: Roboto Mono via Google Fonts.
- **Platform**: Modern web browsers (optimized for Desktop).

## 📥 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd xauapp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 📂 Project Structure (Nuxt 4)

The project follows the Nuxt 4 "app" directory convention:

- `app/`: Main application source.
  - `app.vue`: Main terminal layout and components.
  - `assets/css/`: Global terminal styles and Bloomberg theme variables.
- `public/`: Static assets.

## 📄 License

MIT
