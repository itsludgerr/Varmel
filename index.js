const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const {loadCommands} = require('./handlers/commandHandler');
const {loadEvents} = require('./handlers/eventHandler');


const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages] });

client.login(token).then(() => {

    loadEvents(client);
    loadCommands(client);

});

module.exports = {client};