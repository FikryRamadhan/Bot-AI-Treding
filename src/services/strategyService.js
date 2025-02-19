const { getCryptoPrice } = require("./cryptoService");

// Fungsi untuk menghitung SMA
function calculateSMA(prices, period) {
    if (prices.length < period) return null;
    const sum = prices.slice(-period).reduce((acc, val) => acc + val, 0);
    return sum / period;
}

// Fungsi untuk menghitung ATR
function calculateATR(prices, period = 14) {
    if (prices.length < period) return 0;
    let atrValues = [];

    for (let i = 1; i < prices.length; i++) {
        let trueRange = Math.abs(prices[i] - prices[i - 1]);
        atrValues.push(trueRange);
    }

    return atrValues.slice(-period).reduce((a, b) => a + b, 0) / period;
}

// Fungsi analisis sinyal trading
async function checkSignal(symbol) {
    let prices = [];

    for (let i = 0; i < 20; i++) {
        const price = await getCryptoPrice(symbol);
        if (price !== null) prices.push(price);
    }

    if (prices.length < 15) {
        return `⚠️ Data harga untuk ${symbol} tidak mencukupi untuk analisis.`;
    }

    const smaShort = calculateSMA(prices, 5);
    const smaLong = calculateSMA(prices, 15);
    const currentPrice = prices[prices.length - 1];

    const atr = calculateATR(prices);

    let sl = 0, tp1 = 0, tp2 = 0;
    let signal = "⏳ Belum ada sinyal.";

    if (smaShort > smaLong) {
        signal = `🚀 Sinyal BELI untuk ${symbol}! Trend naik.`;
        sl = currentPrice - atr * 1.5;
        tp1 = currentPrice + atr * 2;
        tp2 = currentPrice + atr * 3;
    } else if (smaShort < smaLong) {
        signal = `⚠️ Sinyal JUAL untuk ${symbol}! Trend turun.`;
        sl = currentPrice + atr * 1.5;
        tp1 = currentPrice - atr * 2;
        tp2 = currentPrice - atr * 3;
    }

    return `${signal}\n💰 Harga Saat Ini: ${currentPrice}\n🛑 Stop Loss (SL): ${sl}\n🎯 Take Profit 1 (TP1): ${tp1}\n🎯 Take Profit 2 (TP2): ${tp2}`;
}

module.exports = { checkSignal };
