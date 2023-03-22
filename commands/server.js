const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('./ping');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Proivdes information about the server'),
    async execute(interaction) {
        		// interaction.guild is the object representing the Guild in which the command was run
        await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`)
    }
}