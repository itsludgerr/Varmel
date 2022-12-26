const { Collection } = require('discord.js');
const path = require("path");

function loadCommands(client) {
    const fs = require("fs");
    const mainFolder = path.resolve(path.dirname(__filename), "../");
    const commandsFolder = `${mainFolder}/commands`;
    const commandFiles = fs.readdirSync(commandsFolder).filter(file => file.endsWith('.js'));

    client.commands = new Collection();
    let commandsArray = [];

    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        client.commands.set(command.data.name, command);

        commandsArray.push(command.data.toJSON());
    }

    client.application.commands.set(commandsArray);
    return console.log("Loaded Commands");
}

module.exports = { loadCommands };