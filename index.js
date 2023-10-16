require('dotenv').config();
const Discord = require('discord.js')
const axios = require('axios')

const client = new Discord.Client({ intents: [Discord.IntentsBitField.Flags.Guilds]})
const PREFIX = '!'

client.once(Discord.Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}`);
})


client.on('message', async (m) =>{
    if(m.author.bot) return;

    const args = m.content.slice(PREFIX.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()

    if(command === 'weather') {
        const location = args.join(' ')
        if(!location){
            m.channel.send('Please specify a location so we can provide the weather information')
            return;
        }
    }

    try {
        const response = await axios.get( `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.OPENWEATHER_KEY}`)
        const weatherData = response.data
        console.log('weather : ' + weatherData)
        const temperature = weatherData.main.temp
        const description = weatherData.weather[0].description

        m.channel.send(`Weather in ${location}: ${description}, Temperature: ${temperature}°C`)
    } catch(e) {
        console.error(e)
        m.channel.send('Please Try Again')
    }
})

client.login(process.env.BOT_TOKEN)