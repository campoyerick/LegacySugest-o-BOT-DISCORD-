const Discord = require("discord.js");
const { JsonDatabase } = require("wio.db");
const dbC = new JsonDatabase({ databasePath: "./databases/myJsonBotConfig.json" });

module.exports = {
    name: "consultaruser",
    description: "Veja informações de algum usuario",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "user",
            description: "ID ou Menção do usuario",
            type: Discord.ApplicationCommandOptionType.User,
            require: true,
        }
    ],
    run: async (client, interaction) => {

        let user = interaction.options.getUser("user")

        let ryan = new Discord.EmbedBuilder()
        .setColor(dbC.get(`color`))
            .setTitle(`${user.username}`)
            .setThumbnail(user.displayAvatarURL({ format: "png", dinamyc: true, size: 4096 }))
            .addFields(
                {
                    name: `
                    <:w_jornal:1165752594686300341>  Nome`,
                    value: `\`\`\`${user.tag}\`\`\``,
                    inline: true,
                },
                {
                    name: `🆔 Identidade`,
                    value: `\`\`\`${user.id}\`\`\``,
                    inline: true,
                },
                {
                    name: `⛓ Menção`,
                    value: `${user}`,
                    inline: true,
                },
                {
                    name: `📅 Conta criada`,
                    value: `<t:${~~(user.createdTimestamp / 1000)}:f> (<t:${~~(user.createdTimestamp / 1000)}:R>)`,
                    inline: false,
                },
        )
        interaction.reply({ embeds: [ryan] })
    }
}