const { stripIndent } = require("common-tags/lib");
const { ButtonCommand } = require("../../../../base/utils");
const { MessageEmbed } = require('discord.js');
class RolCekilis extends ButtonCommand {
    constructor(client) {
        super(client, {
            name: "temp_danışma_karar",
            cooldown: 10000
        });
        this.client = client;
    }

    async run(client, interaction, data) {
        const memberId = interaction.customId.split('-').pop().split('_')[0];
        const member = interaction.guild.members.cache.get(memberId);
        const feedData = await client.models.submit.findOne({ userId: memberId, typeOf: "yetki", claimer: interaction.user.id });
        if (!member) {
            await interaction.message.edit()
            return await interaction.reply('kullanıcı bulunamadı!', {
                ephemeral: true
            });
        }
        const pass = interaction.customId.split('_').pop() === "onay";
        const feedMsg = await interaction.guild.channels.cache.get(data.channels["danışma-feed"]).messages.fetch(feedData.feedId);
        if (pass) {
            const embed = new MessageEmbed().setDescription(stripIndent`
            Başvuran: <@${interaction.user.id}>
            Katılma Tarihi: <t:${Math.round(interaction.member.joinedTimestamp / 1000)}:R> ${claim ? `\nTag aldıran: ${resp.member ? `${resp.mention}` : `[ID: \`${resp.id}\` ]`}${resp.date}` : ""}
            Onaylayan: <@${interaction.user.id}>
            `).setAuthor({
                name: "Yetki Başvurusu"
            }).setColor("GREEN");
            await member.roles.add([data.roles["yetkili"], data.roles["registry"], data.roles["yetki-başlangıç"]]);
            await feedMsg.edit({
                embeds: [embed]
            })
        } else {
            const embed = new MessageEmbed().setDescription(stripIndent`
            Başvuran: <@${interaction.user.id}>
            Katılma Tarihi: <t:${Math.round(interaction.member.joinedTimestamp / 1000)}:R> ${claim ? `\nTag aldıran: ${resp.member ? `${resp.mention}` : `[ID: \`${resp.id}\` ]`}${resp.date}` : ""}
            Reddeden: <@${interaction.user.id}>
            `).setAuthor({
                name: "Yetki Başvurusu"
            }).setColor("RED");
            await feedMsg.edit({
                embeds: [embed]
            })
        }



    }
}

module.exports = RolCekilis;