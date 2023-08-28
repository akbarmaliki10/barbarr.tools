const {
    Coordinates,
    CalculationMethod,
    PrayerTimes,
    SunnahTimes,
    Prayer,
    Qibla,
} = require('adhan');

const moment = require('moment-timezone');
const { SlashCommandBuilder } = require('discord.js');



const coordinates = new Coordinates(-6.200000, 106.816666);
const params = CalculationMethod.MoonsightingCommittee();

module.exports = {
    data: new SlashCommandBuilder()
    .setName('bukapuasa')
    .setDescription('Provides information about buka puasa or azan magrib in jakarta'),
    async execute(interaction) {
        // interaction.user is the object representing the User who ran the command
        // interaction.member is the GuildMember object, which represents the user in the specific guild
        const date = new Date();
        const prayerTimes = new PrayerTimes(coordinates, date, params);
        await interaction.reply("Waktu buka puasa di Jakarta hari ini adalah jam: "+moment(prayerTimes.maghrib).tz('Asia/Jakarta').format('h:mm z'));
    }
}