require('dotenv').config();
const Discord = require('discord.js')

const client = new Discord.Client({ intents: [Discord.IntentsBitField.Flags.Guilds]})

client.once(Discord.Events.ClientReady, () => {
    console.log("connected")
})

client.login(process.env.BOT_TOKEN)