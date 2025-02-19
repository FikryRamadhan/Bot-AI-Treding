// const bot = new Telegraf("7955733066:AAHPSbngHXfiNdjoWAOtpjh-MVAINwNKtto");

const bot = require("./bot/bot");

bot.launch();
console.log("🚀 Bot Telegram berjalan...");

// Menangani error
process.on("uncaughtException", (err) => console.error("Uncaught Exception:", err));
process.on("unhandledRejection", (reason, promise) => console.error("Unhandled Rejection at:", promise, "reason:", reason));

