const tf = require("@tensorflow/tfjs");
const { getCryptoPrice } = require("./cryptoService");

// Fungsi untuk mengambil harga real-time
async function fetchRealTimePrices(symbol, count = 20) {
    let prices = [];
    for (let i = 0; i < count; i++) {
        const price = await getCryptoPrice(symbol);
        if (price !== null) prices.push(price);
        await new Promise(res => setTimeout(res, 1000)); // Delay 1 detik
    }
    return prices;
}

// Fungsi deteksi pola Smart Money Concept (SMC)
function detectSMCPatterns(prices) {
    let signal = "⏳ Belum ada sinyal.";
    let sl = 0, tp1 = 0, tp2 = 0;

    const currentPrice = prices[prices.length - 1];
    const maxLast10 = Math.max(...prices.slice(-10));
    const minLast10 = Math.min(...prices.slice(-10));

    let bos = currentPrice > maxLast10; // Break of Structure (BOS)
    let choch = currentPrice < minLast10; // Change of Character (CHOCH)

    if (bos) {
        signal = `🚀 LONG untuk entry! Trend naik.`;
        sl = currentPrice * 0.98;
        tp1 = currentPrice * 1.03;
        tp2 = currentPrice * 1.05;
    } else if (choch) {
        signal = `⚠️ SHORT untuk entry! Trend turun.`;
        sl = currentPrice * 1.02;
        tp1 = currentPrice * 0.97;
        tp2 = currentPrice * 0.95;
    }

    return { signal, sl, tp1, tp2, currentPrice };
}

// Fungsi untuk melatih model AI
async function trainModel(trainingData) {
    if (trainingData.length < 10) {
        throw new Error("⚠️ Data tidak cukup untuk melatih model.");
    }

    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 10, activation: "relu", inputShape: [10] }));
    model.add(tf.layers.dense({ units: 1 }));

    model.compile({ optimizer: "adam", loss: "meanSquaredError" });

    const xs = tf.tensor2d(trainingData.map(d => d.slice(0, 10))); // Input: 10 elemen
    const ys = tf.tensor2d(trainingData.map(d => [d[10]])); // Target: 1 elemen

    await model.fit(xs, ys, { epochs: 50 });
    return model;
}

// Fungsi analisis sinyal menggunakan AI & SMC
async function analyzeSignal(symbol) {
    const prices = await fetchRealTimePrices(symbol, 20);
    if (prices.length < 20) {
        return `⚠️ Data tidak cukup untuk analisis ${symbol}.`;
    }

    // Persiapan Data untuk Model
    const trainingData = [];
    for (let i = 0; i < prices.length - 10; i++) {
        const sample = prices.slice(i, i + 11); // 10 input + 1 target
        if (sample.length === 11) trainingData.push(sample);
    }

    if (trainingData.length === 0) {
        return "⚠️ Data tidak cukup untuk melatih model.";
    }

    // Latih model AI
    const model = await trainModel(trainingData);
    
    // Prediksi harga selanjutnya
    const input = tf.tensor2d([prices.slice(-10)]); // Input terakhir harus 10 elemen
    const predictedPrice = (await model.predict(input).data())[0];

    // Analisis SMC
    const smcResult = detectSMCPatterns(prices);

    return `${smcResult.signal}
💰 Harga Saat Ini: ${smcResult.currentPrice}
📊 Prediksi AI: ${predictedPrice}
🛑 Stop Loss (SL): ${smcResult.sl}
🎯 Take Profit 1 (TP1): ${smcResult.tp1}
🎯 Take Profit 2 (TP2): ${smcResult.tp2}`;
}

module.exports = { analyzeSignal };
