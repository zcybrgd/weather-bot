require('dotenv').config();
const Discord = require('discord.js')
const axios = require('axios')
const client = new Discord.Client({
    intents: [
        Discord.IntentsBitField.Flags.GuildMessages, 
        Discord.IntentsBitField.Flags.Guilds , 
        Discord.IntentsBitField.Flags.GuildMembers , 
        Discord.IntentsBitField.Flags.MessageContent],
});
const PREFIX = '!'



client.once(Discord.Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}`);
})


client.on('messageCreate', async (message) =>{
    if(message.author.bot) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()
    const location = args.join(' ')

    if (command === 'weather') {
        if (!location) {
            m.channel.send('Please specify a location so we can provide the weather information');
            return;
        }
    
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.OPENWEATHER_KEY}`);
            const weatherData = response.data;
            console.log('weather : ' + weatherData);
            const temperature = weatherData.main.temp;
            console.log('temp : ' + temperature);
            const description = weatherData.weather[0].description;
    
            message.channel.send(`Weather in ${location}: ${description}, Temperature: ${temperature}°C`);
        } catch (e) {
            console.error(e);
            message.channel.send('Unable to fetch weather data. Please try again later.');
        }
    }
    
})

client.login(process.env.BOT_TOKEN)