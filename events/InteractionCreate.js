const { client } = require(`../index`);

module.exports = {
  name: "interactionCreate",

  execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) {
        interaction.reply({ content: "outdated command" });
      }
      command.execute(interaction, client);
    } else {
      return;
    }
  },
};