const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gacharole')
        .setDescription('Fitur untuk mengacak role dalam mlbb')
        .addStringOption(option =>
            option
                .setName("player1")
                .setDescription("Nama player 1 yang ingin di gacha")
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName("player2")
                .setDescription("Nama player 2 yang ingin di gacha")
                .setRequired(false))
        .addStringOption(option =>
            option
                .setName("player3")
                .setDescription("Nama player 3 yang ingin di gacha")
                .setRequired(false))
        .addStringOption(option =>
            option
                .setName("player4")
                .setDescription("Nama player 4 yang ingin di gacha")
                .setRequired(false))
        .addStringOption(option =>
            option
                .setName("player5")
                .setDescription("Nama player 5 yang ingin di gacha")
                .setRequired(false))
    ,
    async execute(interaction) {
        const player1 = interaction.options.getString('player1');
        const player2 = interaction.options.getString('player2');
        const player3 = interaction.options.getString('player3');
        const player4 = interaction.options.getString('player4');
        const player5 = interaction.options.getString('player5');

        let player = [player1, player2, player3, player4, player5];
        let role = ["Mid Lane", "Gold Lane", "Exp Lane", "Roaming", "Jungler"];
        let response = "Hasil gacha role: \n";

        for (let i = 0; i<5 ; i++){
            if (player[i] == null){
                continue;
            } else {
                const randomIndex = Math.floor(Math.random()*role.length);
                const hasilGacha = role[randomIndex];
                response += `\n ${player[i]}: ${hasilGacha}`;
                role.splice(randomIndex,1);
            }
        }


        await interaction.reply(response);
    },
};