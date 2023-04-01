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

        // (async function (artist, title) {
        //     let lyrics = await lyricsFinder(artist, title) || "Not Found!";
        //     if (lyrics.length > 2000) {
        //         await interaction.reply("Query submitted, loading lyrics....")
        //         await interaction.channel.send(artist + " - " + title + "\n" + "________________________\n" + lyrics.slice(0, 1800));
        //         await interaction.channel.send(lyrics.slice(1800));
        //     } else {
        //         await interaction.reply("Query submitted, loading lyrics....")
        //         console.log(artist + " - " + title + "\n" + lyrics);
        //         await interaction.channel.send(artist + " - " + title + "\n" + "________________________\n" + lyrics);
        //     }
        // })(artist, title);
        interaction.reply("Maaf, fitur ini sedang ditutup");
    },
};