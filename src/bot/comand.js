const { checkSignal } = require("../services/strategyService");
const { getTopTradingPairs } = require("../services/cryptoService");

module.exports = (bot) => {
    bot.start((ctx) => {
        ctx.reply("🚀 Selamat datang! Kirimkan perintah:\n\n" +
            "/signal [symbol] - Untuk mendapatkan sinyal trading\n" +
            "/list - Untuk melihat 10 simbol yang sering diperdagangkan\n\n" +
            "Contoh: `/signal ETHUSDT` untuk analisis Ethereum.");
    });

    bot.command("signal", async (ctx) => {
        const input = ctx.message.text.split(" ");
        if (input.length < 2) {
            return ctx.reply("⚠️ Harap masukkan simbol koin!\nContoh: `/signal ETHUSDT`");
        }

        const symbol = input[1].toUpperCase();
        ctx.reply(`⏳ Mengambil data harga untuk ${symbol}...`);

        const signalMessage = await checkSignal(symbol);
        ctx.reply(signalMessage);
    });

    bot.command("list", async (ctx) => {
        ctx.reply("🔄 Mengambil daftar 10 simbol crypto yang paling sering diperdagangkan...");
        const topPairs = await getTopTradingPairs();
        ctx.reply(`📊 Daftar Top 10 Pasangan Trading:\n\n${topPairs}`);
    });
};
