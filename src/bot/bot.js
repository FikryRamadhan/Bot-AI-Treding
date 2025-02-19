const { Telegraf } = require("telegraf");
const { TELEGRAM_BOT_TOKEN } = require("../config/config");

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);
require("./commands")(bot);

module.exports = bot;
