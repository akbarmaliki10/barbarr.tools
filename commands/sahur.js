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
const date = new Date();
const prayerTimes = new PrayerTimes(coordinates, date, params);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sahur')
        .setDescription('Provides information about sahur or azan subuh in jakarta'),
    async execute(interaction) {
        // interaction.user is the object representing the User who ran the command
        // interaction.member is the GuildMember object, which represents the user in the specific guild
        await interaction.reply("Waktu sahur di Jakarta hari ini adalah jam: "+moment(prayerTimes.fajr).tz('Asia/Jakarta').format('h:mm z'));
    }
}