const axios = require('axios')
const PREFIX = '!'
const requestWeather = (client) => {
    client.on('messageCreate', async (message) =>{
        if(message.author.bot) return;
    
        const args = message.content.slice(PREFIX.length).trim().split(/ +/)
        const command = args.shift().toLowerCase()
        const location = args.join(' ')
    
        if (command === 'weather') {
            if (!location) {
                message.channel.send('Please specify a location so we can provide the weather information');
                return;
            }
        
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.OPENWEATHER_KEY}`);
                const weatherData = response.data;
                const temperature = weatherData.main.temp;
                const description = weatherData.weather[0].description;
        
                message.channel.send(`Weather in ${location}: ${description}, Temperature: ${temperature}°C`);
            } catch (e) {
                console.error(e);
                message.channel.send('Unable to fetch weather data. Please try again later.');
            }
        }
        
    })
    
}

module.exports = requestWeather