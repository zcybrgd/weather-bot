require('dotenv').config();
const Discord = require('discord.js')

const client = new Discord.Client({ intents: [Discord.IntentsBitField.Flags.MessageContent, Discord.IntentsBitField.Flags.GuildMessages, Discord.IntentsBitField.Flags.Guilds]})

client.once("ready", () => {
    console.log("connected")
})

client.login(process.env.BOT_TOKEN)