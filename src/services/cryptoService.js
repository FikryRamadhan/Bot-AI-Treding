const axios = require("axios");
const { BINANCE_API_URL } = require("../config/config");

// Fungsi mengambil harga crypto dari Binance
async function getCryptoPrice(symbol) {
    try {
        const response = await axios.get(`${BINANCE_API_URL}/ticker/price?symbol=${symbol}`);
        return parseFloat(response.data.price);
    } catch (error) {
        console.error(`Error fetching price for ${symbol}:`, error);
        return null;
    }
}

// Fungsi mendapatkan daftar 10 simbol crypto yang sering diperdagangkan
async function getTopTradingPairs() {
    try {
        const response = await axios.get(`${BINANCE_API_URL}/ticker/24hr`);
        const sortedPairs = response.data
            .sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume))
            .slice(0, 10)
            .map((pair, index) => `${index + 1}. ${pair.symbol} - Volume: ${parseFloat(pair.volume).toFixed(2)}`);

        return sortedPairs.join("\n");
    } catch (error) {
        console.error("Error fetching top trading pairs:", error);
        return "❌ Gagal mengambil data simbol yang sering diperdagangkan.";
    }
}

module.exports = { getCryptoPrice, getTopTradingPairs };
