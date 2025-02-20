const { analyzeSignal } = require("../services/strategyService");
const { getTopTradingPairs } = require("../services/cryptoService");

module.exports = (bot) => {
    bot.start((ctx) => {
        ctx.reply("🚀 Selamat datang! Kirimkan perintah:\n\n" +
            "/menu - Untuk mendapatkan menu\n");
    });

    bot.command('menu', (ctx) => {
        ctx.reply(
            '📌 Menu Utama:\n\n' +
            '/signal [symbol] - Analisis koin\n' +
            '/list - Daftar 10 simbol crypto terpopuler\n' +
            '/airdrop - Info airdrop terbaru\n' +
            '/news - Berita terbaru tentang crypto\n' +
            '/help - Bantuan dan panduan penggunaan bot',
        );
    });

    bot.command('help', (ctx) => {
        ctx.reply(
            `🤖 Panduan Penggunaan Bot:
            \n- Gunakan /menu untuk melihat daftar perintah.
            \n- /signal [symbol]: Analisis tren crypto berdasarkan simbol tertentu.
            \n- /list: Menampilkan 10 simbol crypto yang paling sering diperdagangkan.
            \n- /airdrop: Menampilkan informasi airdrop terbaru.
            \n- /news: Menampilkan berita terbaru seputar dunia crypto.
            \nJika mengalami kendala, hubungi admin bot.`);
    });

    bot.command("signal", async (ctx) => {
        const input = ctx.message.text.split(" ");
        if (input.length < 2) {
            return ctx.reply("⚠️ Harap masukkan simbol koin!\nContoh: `/signal ETH`");
        }

        const symbol = input[1].toUpperCase();
        
        ctx.reply(`⏳ Mengambil data harga untuk ${symbol}...`);

        const signalMessage = await analyzeSignal(symbol);
        ctx.reply(signalMessage);
    });

    bot.command("list", async (ctx) => {
        ctx.reply("🔄 Mengambil daftar 10 simbol crypto yang paling sering diperdagangkan...");
        const topPairs = await getTopTradingPairs();
        ctx.reply(`📊 Daftar Top 10 Pasangan Trading:\n\n${topPairs}`);
    });
};
