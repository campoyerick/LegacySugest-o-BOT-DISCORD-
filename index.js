const Discord = require("discord.js");

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.DirectMessages,
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
    ],
    partials: [Discord.Partials.Channel],
});

const { JsonDatabase, } = require("wio.db");
const dbC = new JsonDatabase({ databasePath: "./databases/myJsonBotConfig.json" });

/*============================= | BOT - ON | =========================================*/

client.login(dbC.get(`token`));

/*============================= | READY TERMINAL | =========================================*/

client.on('ready', async () => {

    console.log(`[TERMINAL] APP ${client.user.username} Online!`);
    console.log(`[TERMINAL] Estou em ${client.guilds.cache.size} Servidores!`);
    
    let activityText = `Sugestões - BETA`;
    client.user.setActivity(activityText, {
        type: Discord.ActivityType.Streaming,
        url: 'https://www.twitch.tv/LightN4444'
    });
    client.user.setStatus("online");

});

/*============================= | INTERACTION - EVENT | =========================================*/

client.on('interactionCreate', async (interaction) => {

    if (interaction.isCommand()) {

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd) return interaction.reply({ content: `❌ | Erro, Este comando não existe!`, ephemeral: true });
        interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);
        cmd.run(client, interaction)

    };
});

/*============================= | IMPORT - HANDLER | =========================================*/

client.slashCommands = new Discord.Collection()
require('./handler')(client)

/*============================= | ANTI - BOT CRASH | =========================================*/

process.on('uncaughtExceptionMonitor', (error, origin) => { });

  process.on('uncaughtExceptionMonitor', (error, origin) => { });
                process.on('unhandledRejection', (reason, p) => {
                  console.log('=====[ ANTI CRASH 1 ]=====')
                  console.log(reason, p)
                  console.log('==========================')
              })
              
              process.on("uncaughtException", (err, origin) => {
                  console.log('=====[ ANTI CRASH 2 ]=====')
                  console.log(err, origin)
                  console.log('========================')
              }) 
              
              process.on('uncaughtExceptionMonitor', (err, origin) => {
                  console.log('=====[ ANTI CRASH 3 ]=====')
                  console.log(err, origin)
                  console.log('========================')
              })