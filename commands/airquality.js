const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios'); // node
require('dotenv').config()

module.exports = {
    data: new SlashCommandBuilder()
        .setName('airquality')
        .setDescription('Realtime air quality based on given city')
        .addStringOption(option =>
            option
                .setName("city")
                .setDescription("Insert name of the city that you want to see")
                .setRequired(true)),
    async execute(interaction) {
        const city = interaction.options.getString('city');
        axios.get('http://api.weatherapi.com/v1/current.json', {
            params: {
                key: process.env.WEATHER_API_KEY,
                q: city,
                aqi: "yes"
            }
        })
            .then(async function (response) {
                const us_epa_index = response.data.current.air_quality['us-epa-index']
                const co = response.data.current.air_quality['co']
                const o3 = response.data.current.air_quality['o3']
                const no2 = response.data.current.air_quality['no2']
                const so2 = response.data.current.air_quality['so2']
                var level = ""
                switch (us_epa_index.toString()) {
                    case "1":
                        level = "Baik"
                        break;
                    case "2":
                        level = "Sedang"
                        break
                    case "3":
                        level = "Tidak sehat untuk orang yang sensitif"
                        break
                    case "4":
                        level = "Tidak sehat"
                        break
                    case "5":
                        level = "Sangat tidak sehat"
                        break
                    case "6":
                        level = "Sebaiknya lari"
                        break
                    default:
                        level = "Sehat"
                        break;
                }

                await interaction.reply(`Kualitas udara pada Kota `+ city + " : "+`**${level}**`
                + "\n------------------------"
                +"\nBerikut rinciannya: "
                +"\n- Carbon Monoxide(μg/m3) : "+`**${co}**`
                +"\n- Ozone(μg/m3) : "+`**${o3}**`
                +"\n- Nitrogen dioxide(μg/m3) : "+`**${no2}**`
                +"\n- Sulphur dioxide(μg/m3) : "+`**${so2}**`
                +"\n*note: rating berdasarkan US - EPA Standard*");
            })
            .catch(async function (error) {
                console.log(error);
                await interaction.reply("Kota tidak ditemukan")
            })
            .finally(function () {
                // always executed
            });
    }
}