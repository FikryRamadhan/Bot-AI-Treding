const axios = require("axios");
const { CMC_API_KEY, CMC_API_URL } = require("../config/config");
const { log } = require("@tensorflow/tfjs");

/**
 * Mengambil harga crypto berdasarkan simbol dari CoinMarketCap
 * @param {string} symbol - Simbol koin (contoh: "BTC", "ETH", "BNB")
 * @returns {Promise<number|null>} - Harga crypto dalam USD atau null jika gagal
 */
async function getCryptoPrice(symbol) {
    try {
        const response = await axios.get(CMC_API_URL+ "quotes/latest", {
            headers: { "X-CMC_PRO_API_KEY": CMC_API_KEY },
            params: { symbol: symbol.toUpperCase()},
        });

        // Periksa apakah data tersedia
        if (response.data && response.data.data && response.data.data[symbol.toUpperCase()]) {
            console.log(response.data.data[symbol.toUpperCase()].quote.USD.price)
            return parseFloat(response.data.data[symbol.toUpperCase()].quote.USD.price);
        } else {
            console.error("Data tidak ditemukan untuk simbol:", symbol);
            return null;
        }
    } catch (error) {
        console.error("Error fetching price from CoinMarketCap:", error.message);
        return null;
    }
}

// Fungsi mendapatkan daftar 10 simbol crypto yang sering diperdagangkan
async function getTopTradingPairs() {
  try {
    const response = await axios.get(CMC_API_URL + "listings/latest", {
      headers: { "X-CMC_PRO_API_KEY": CMC_API_KEY },
      params: {
        start: 1,
        limit: 10, // Ambil 10 koin teratas
        sort: "volume_24h", // Urutkan berdasarkan volume trading 24 jam
        sort_dir: "desc",
        convert: "USD", // Konversi ke USD
      },
    });

    if (response.data && response.data.data) {
      const topCoins = response.data.data;
      let dataTopCoins = topCoins
        .map(
          (coin, index) =>
            `${index + 1}. ${coin.name} (${
              coin.symbol
            }) - Volume: $${coin.quote.USD.volume_24h.toLocaleString()}`
        )
        .join("\n"); // Menyatukan array menjadi string dengan baris baru

      return dataTopCoins;
    } else {
      console.log("❌ Data tidak tersedia");
      return [];
    }
  } catch (error) {
    console.error("🚨 Error fetching top traded coins:", error.message);
    return [];
  }
}

module.exports = { getCryptoPrice, getTopTradingPairs };
