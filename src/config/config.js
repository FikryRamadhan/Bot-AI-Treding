require("dotenv").config();

module.exports = {
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    CMC_API_KEY : process.env.TOKEN_CMC_KEY, // Ganti dengan API Key Anda
    CMC_API_URL : 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/',
};