const { SlashCommandBuilder } = require('discord.js');
const lyricsFinder = require('lyrics-finder');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lyrics')
        .setDescription('Command to search song lyrics')
        .addStringOption(option =>
            option
                .setName("artist")
                .setDescription("The artist of the searched lyrics")
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName("title")
                .setDescription("The title of the searched lyrics")
                .setRequired(true))
    ,
    async execute(interaction) {
        const artist = interaction.options.getString('artist');
        const title = interaction.options.getString('title');

        let lyrics = await lyricsFinder(artist, title) || "Not Found!";
        console.log(lyrics);
        await interaction.reply(lyrics);
    },
};