const { AttachmentBuilder, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
var QRCode = require('qrcode')


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

        QRCode.toFile('./qr/transformed.png', url, {
            color: {
                dark: '#0000',  // Black dots
                light: '#FFFF' // White background
            }
        }, async function (err) {
            if (err) throw err
            await interaction.reply({files: [{ attachment: './qr/transformed.png' }]})
        })
    }
}