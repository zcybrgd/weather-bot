require('dotenv').config({ path: '../.env' });
const client = require('./utils/DiscordClient').getInstance()
const requestWeather = require('./events/requestingWeather')
requestWeather(client)
client.login(process.env.BOT_TOKEN)