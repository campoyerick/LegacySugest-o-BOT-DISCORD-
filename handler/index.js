const fs = require("fs");

module.exports = async (client) => {

  const SlashsArray = [];

  // Verifica se a pasta "slashCommands" existe
  if (!fs.existsSync('./slashCommands')) return;

  const files = fs.readdirSync(`./slashCommands/`, { withFileTypes: true });
  files.forEach(file => {
    if (file.isFile() && file.name.endsWith('.js')) {
      const command = require(`../slashCommands/${file.name}`);
      if (command.name) {
        client.slashCommands.set(command.name, command);
        SlashsArray.push(command);
      }
    }
  });

  // Define os comandos em cada guilda quando o bot estiver pronto
  client.on("ready", async () => {

    client.guilds.cache.forEach(guild => {
      guild.commands.set(SlashsArray).catch(console.error);

    });

  });

};