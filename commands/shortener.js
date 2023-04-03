const { SlashCommandBuilder, EmbedBuilder, hyperlink } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

const exampleEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Barbarr Link Shortener')
	.setURL('https://barbarr.xyz/')
	.setAuthor({ name: 'Akbar', iconURL: 'https://cdn.discordapp.com/attachments/909850096185798719/1092333793010012230/9k.png', url: 'https://discord.js.org' })
	.setDescription('Tools buat mendekin link, mohon memberi nama link yang baik dan tidak toxic ya adick-adick')
	.setThumbnail('https://cdn.discordapp.com/attachments/909850096185798719/1092333793010012230/9k.png')
	.setImage('https://cdn.discordapp.com/attachments/909850096185798719/1092333793010012230/9k.png')
	.setTimestamp();



module.exports = {
	data: new SlashCommandBuilder()
		.setName('shortener')
		.setDescription('Memberi link website shortener milik developer pemula'),
	async execute(interaction) {
        const url = 'https://barbarr.xyz/';
        const link = hyperlink('barbarr.xyz', url);
        interaction.reply("Check out this cool Website: "+link)
	},
};