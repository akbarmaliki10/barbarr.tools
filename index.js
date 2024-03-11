// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  ActivityType,
  hyperlink,
} = require('discord.js');
const CronJob = require('cron').CronJob;
const { token, guildId, channelId } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  }
});

async function sendMessageToChannel(message) {
  const guild = client.guilds.cache.get(guildId);
  const channel = guild.channels.cache.get(channelId);
  if (channel) {
    await channel.send(message);
  }
}
// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, async (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
  client.user.setActivity({
    name: 'Puasa, /bukapuasa',
    type: ActivityType.Competing,
  });

  // send message every 3 am
  new CronJob(
    '0 3 * * *',
    async () => {
      const link = hyperlink(
        'Panduan shalat tahajud',
        'https://rumaysho.com/762-panduan-shalat-tahajud.html'
      );
      await sendMessageToChannel(
        `Assalamualaikum warahmatullahi wabarakatuh.\nJangan lupa shalat tahajud.\n${link}\n.`
      );
    },
    () => {
      console.log('Job tahajud finished');
    },
    true,
    'Asia/Jakarta'
  );

  // send message every 5 am
  new CronJob(
    '0 5 * * *',
    async () => {
      const link = hyperlink(
        'Tuntunan dzikir pagi',
        'https://rumaysho.com/1636-bacaan-dzikir-pagi.html'
      );
      await sendMessageToChannel(
        `Assalamualaikum warahmatullahi wabarakatuh.\nAwali pagi mu dengan berdzikir kepada Allah.\n${link}\nSemoga hari ini menjadi hari yang lebih baik.`
      );
    },
    () => {
      console.log('Job dzikir pagi finished');
    },
    true,
    'Asia/Jakarta'
  );

  // send message every 8 am
  new CronJob(
    '0 8 * * *',
    async () => {
      const link = hyperlink(
        'Keutamaan shalat dhuha',
        'https://rumaysho.com/2845-keutamaan-shalat-dhuha.html'
      );
      await sendMessageToChannel(
        `Assalamualaikum warahmatullahi wabarakatuh.\nJangan lupa shalat duha.\n${link}\n.`
      );
    },
    () => {
      console.log('Job shalat duha finished');
    },
    true,
    'Asia/Jakarta'
  );

  // send message every 4 pm
  new CronJob(
    '0 16 * * *',
    async () => {
      const link = hyperlink(
        'Panduan dzikir petang',
        'https://rumaysho.com/1638-bacaan-dzikir-petang.html'
      );
      await sendMessageToChannel(
        `Assalamualaikum warahmatullahi wabarakatuh.\nJangan lupa salat dzikir petang.\n${link}\n.`
      );
    },
    () => {
      console.log('Job dzikir petang finished');
    },
    true,
    'Asia/Jakarta'
  );
});

// Log in to Discord with your client's token
client.login(token);
