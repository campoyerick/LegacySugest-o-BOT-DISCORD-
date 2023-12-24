const { ActionRowBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const { JsonDatabase } = require("wio.db");
const dbC = new JsonDatabase({ databasePath: "./databases/myJsonBotConfig.json" });

module.exports = {
    name: "avatar",
    description: "Veja o avatar de algum usuario",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "user",
            description: "Menção ou ID do usuario",
            type: Discord.ApplicationCommandOptionType.User,
            require: true,
        }
    ],
    run: async (client, interaction) => {
        let userAvatar = interaction.options.getUser("user")
        let Avatarinfo = userAvatar.displayAvatarURL({ size: 4096, dynamic: true, format: "png" })

        let ryan = new Discord.EmbedBuilder()
            .setColor(dbC.get(`color`))
            .setTitle(`Avatar de ${userAvatar.username}`)
            .setImage(Avatarinfo)
        
        let download = new ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
                .setLabel("Link")
                .setStyle(Discord.ButtonStyle.Link)
                .setURL(Avatarinfo)
            .setEmoji("📩")
        )
        
        interaction.reply({ embeds: [ryan], components: [download] })
    }
}