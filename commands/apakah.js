const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('apakah')
        .setDescription('apakah')
        .addStringOption(option =>
            option
                .setName("pertanyaan")
                .setDescription("masukkan pertanyaan")
                .setRequired(true)),
    async execute(interaction) {
        const question = interaction.options.getString('pertanyaan');

        const answer = ["Ya", "Nggak"]
        var randomIndex = Math.floor(Math.random() * answer.length);
        var randomElement = answer[randomIndex]
        await interaction.reply("Apakah "+question+": "+`**${randomElement}**`);
    }
}