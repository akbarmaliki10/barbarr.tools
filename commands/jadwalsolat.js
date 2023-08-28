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
    .setName('jadwalsolat')
    .setDescription('Provides information about prayer times in Jakarta'),
    async execute(interaction) {
        // interaction.user is the object representing the User who ran the command
        // interaction.member is the GuildMember object, which represents the user in the specific guild
        const date = new Date();
        const prayerTimes = new PrayerTimes(coordinates, date, params);
        await interaction.reply("**--- JADWAL SHOLAT HARI INI ---**\n"+"Subuh: "+moment(prayerTimes.fajr).tz('Asia/Jakarta').format('h:mm z')+"\n"+"Dzuhur: "+moment(prayerTimes.dhuhr).tz('Asia/Jakarta').format('h:mm z')+"\n"+"Ashar: "+moment(prayerTimes.asr).tz('Asia/Jakarta').format('h:mm z')+"\n"+"Magrib: "+moment(prayerTimes.maghrib).tz('Asia/Jakarta').format('h:mm z')+"\n"+"Isya: "+moment(prayerTimes.isha).tz('Asia/Jakarta').format('h:mm z'));
    }
}