# 🚀 AI-Powered Crypto Trading Bot

Bot Telegram ini menggunakan AI dengan TensorFlow.js untuk menganalisis tren trading crypto dan memberikan sinyal perdagangan berdasarkan simbol yang diminta. Dibangun dengan Telegraf untuk menangani interaksi pengguna.

## 📌 Fitur Utama
- `/list` ➝ Menampilkan 10 simbol crypto yang sering diperdagangkan.
- `/signal [symbol]` ➝ Memberikan analisis tren crypto berdasarkan simbol yang diberikan (contoh: `/signal ETHUSDT`).
- Analisis berbasis AI menggunakan `@tensorflow/tfjs`.

## 🛠️ Teknologi yang Digunakan
- **Node.js** ➝ Backend utama.
- **Telegraf.js** ➝ Framework untuk bot Telegram.
- **@tensorflow/tfjs** ➝ Library AI untuk analisis tren.
- **Binance API** ➝ Mengambil data harga crypto secara real-time.

## 🔧 Cara Instalasi
1. **Clone repository:**
   ```sh
   git clone https://github.com/username/Bot-AI-Trading.git
   cd Bot-AI-Trading
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Konfigurasi environment:**
   Buat file `.env` dan tambahkan:
   ```sh
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token
   BINANCE_API_KEY=your_binance_api_key
   BINANCE_SECRET_KEY=your_binance_secret_key
   ```

4. **Jalankan bot:**
   ```sh
   node index.js
   ```

## 🐛 Troubleshooting
Jika terjadi error saat instalasi `@tensorflow/tfjs-node`, coba solusi berikut:
- **Gunakan backend yang lebih cepat:**
  ```sh
  npm uninstall @tensorflow/tfjs
  npm install @tensorflow/tfjs-node
  ```
- **Pastikan Node.js versi kompatibel:** Gunakan Node.js **LTS**.
- **Instal ulang dengan clean cache:**
  ```sh
  npm cache clean --force
  npm install
  ```

## 📜 Lisensi
Proyek ini menggunakan lisensi MIT. Bebas digunakan dan dimodifikasi! 🚀
