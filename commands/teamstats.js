const { SlashCommandBuilder } = require('discord.js');
const vrml = require(`../handlers/vrmlapiHandler`);

module.exports = {
	data: new SlashCommandBuilder()
    .setName("teamstats")
    .setDescription("gets infos of a team.")
        .addStringOption(option =>
            option.setName('team-name')
            .setDescription('The name of the team. THE NAME IS CASE SENSITIVE!')
            .setRequired(true)
            ),
        async execute(interaction) {
            const {options} = interaction;
            await interaction.reply({
                content: 'Fishing Team\'s ID.',
                ephemeral: true
            })
            var team = options.getString('team-name');
            var teamID;
            try {
                teamID = await vrml.getTeamID(team);
            } catch (error) {
                console.log(error);
            }
            await vrml.getTeamInfo(teamID);
            await interaction.editReply({
                content: 'Fishing Team\'s Info.',
                ephemeral: true
            })
            await vrml.getTeamPlayers(teamID);
            await interaction.editReply({
                content: 'Fishing Team\'s Players.',
                ephemeral: true
            })
            image = await vrml.getProfileImage(teamID);
            await interaction.editReply({
                content: '',
                files: [{
                    attachment: image,
                    name: 'image.png'
                }],
                ephemeral: true
            })
            await vrml.deleteJSON(teamID);
            console.log(`to ${interaction.user.username}`);
        }
    }