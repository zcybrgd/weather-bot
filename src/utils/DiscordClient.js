const { Client, IntentsBitField, Discord } = require('discord.js');

class DiscordClient {
    static getInstance() {
        if (!Client.instance) {
           const client = new Client({
                intents: [
                    IntentsBitField.Flags.GuildMessages, 
                    IntentsBitField.Flags.Guilds , 
                    IntentsBitField.Flags.GuildMembers , 
                    IntentsBitField.Flags.MessageContent],
            });
            // Discord.Events.ClientReady
            client.once('ready', () => {
                console.log(`Logged in as ${client.user.tag}`);
            })      
            Client.instance = client      
          }
        return Client.instance;
    }
}

module.exports = DiscordClient;