const Discord = require("discord.js");

const { JsonDatabase } = require("wio.db");
const dbC = new JsonDatabase({ databasePath: "./databases/myJsonBotConfig.json" });

module.exports = {
    name: "ativarsugestoes",
    description: "Ative o Coletor de Sugestões em um Canal!",
    options: [
        {
            name: 'canal',
            type: Discord.ApplicationCommandOptionType.Channel,
            description: 'Escolha o Canal.',
            required: false,
            channelTypes: [0]
        }
    ],
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {

            await interaction.reply({
                content: `❌ | Você não possui permissão para utilizar este comando!`,
                ephemeral: true
            });

        } else {

            const channel = interaction.options.getChannel('canal') || interaction.channel;

            try {

                const filter = (message) => message.author.id !== client.user.id;
                const collector = channel.createMessageCollector({ filter })
                collector.on("collect", async message => {

                    if (message.attachments.size > 0) {

                        message.delete();
                        return interaction.followUp({
                            content: `❌ | Sugestão inválida. Envie apenas textos!`,
                            ephemeral: true
                        });

                    } else {

                        console.log(`${channel.name} - ${message.author.tag}: ${message.content}`);

                        if (message.content === "legacydesativar") {

                            if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
                                return interaction.reply({
                                    content: `❌ | Você não possui permissão para desativar o collector!`,
                                    ephemeral: true
                                });

                            } else {

                                message.delete();
                                collector.stop();
                                console.log(`${channel.name}: Coletor de mensagens Desativado com Sucesso.`)
                                await interaction.followUp({
                                    content: `⚠ | Coletor de mensagens Desativado com Sucesso.`,
                                    ephemeral: true
                                });
                            };

                        } else {

                            message.delete();
                            const sgMessage = await channel.send({
                                embeds: [new Discord.EmbedBuilder()
                                    .setAuthor({ name: `${message.author.username} - ${message.author.id}`, iconURL: message.author.avatarURL({ dynamic: true }) })
                                    .setTitle(`${message.author.username} | Nova Sugestão`)
                                    .setDescription(`**🤵 | Autor: ${message.author}**`)
                                    .addFields(
                                        { name: `**🍃 | Sugestão:**`, value: `\`\`\`${message.content}\`\`\`` }
                                    )
                                    .setFooter({ text: `${interaction.guild.name} | Todos os Direitos Reservados.` })
                                    .setColor(dbC.get(`color`))
                                ]
                            });
                            await sgMessage.react(`✅`);
                            await sgMessage.react(`❌`);

                        };

                    };
                });

                await interaction.reply({
                    content: `✅ | Coletor de mensagens Ativado no canal ${channel}, para desativar, envie a mensagem \`"legacydesativar"\`.`,
                    ephemeral: true
                });

            } catch (error) {
                return interaction.reply({
                    content: `❌ | Não consegui Ativar o Coletor no canal ${channel}.`,
                    ephemeral: true
                });
            };

        };
    }
}