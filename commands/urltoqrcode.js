const { AttachmentBuilder, EmbedBuilder, SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('makeqrcode')
        .setDescription('Transform your given URL into QR Code')
        .addStringOption(option =>
            option
                .setName("url")
                .setDescription("Url yang ingin diubah")
                .setRequired(true)),
    async execute(interaction) {
        // Get input 
        const url = interaction.options.getString('url');

        await interaction.reply('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='+url)
    }
}