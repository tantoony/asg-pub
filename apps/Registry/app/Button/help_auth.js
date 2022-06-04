const { stripIndent } = require('common-tags/lib');
const { MessageEmbed } = require('discord.js');
const { ButtonCommand } = require("../../../../base/utils");

class RolCekilis extends ButtonCommand {
    constructor(client) {
        super(client, {
            name: "help_b.auth",
            cooldown: 10000
        });
        this.client = client;
    }

    async run(client, interaction, data) {
        const Data = await client.models.member.findOne({ _id: interaction.customId.split('-')[1] });
        const claim = Data.names.filter(peer => client.config.tags.some(tag => peer.name.includes(tag)) || client.config.dis === peer.discriminator).pop();
        const resp = claim && claim.claimer ? {
            id: claim.claimer,
            member: client.guild.members.cache.get(claim.claimer),
            mention: `<@${claim.claimer}>`,
            date: `<t:${claim.pop().date.getTime() / 1000}:R>`
        } : {
            id: "Aldıran Yok",
            date: claim ? `<t:${claim.pop().date.getTime() / 1000}:R>` : ""
        }
        const embed = new MessageEmbed().setDescription(stripIndent`
        Başvuran: <@${interaction.user.id}>
        Katılma Tarihi: <t:${Math.round(interaction.member.joinedTimestamp / 1000)}:R> ${claim ? `\nTag aldıran: ${resp.member ? `${resp.mention}` : `[ID: \`${resp.id}\` ]`}${resp.date}` : ""}
        `).setAuthor({
            iconURL: interaction.user.avatarURL(),
            name: "Yetki Başvurusu"
        }).setColor("DARK_RED");
        const message = await client.guild.channels.cache.get(data.channels["danışma-feed"]).send({
            embeds: [embed],
            components: [
                {
                    type: "ACTION_ROW",
                    components: [
                        {
                            type: "BUTTON",
                            style: "SUCCESS",
                            customId: `temp_danışma-${interaction.user.id}_yetki`,
                            label: "Konuşmaya Başla"
                        }
                    ]
                }
            ]
        });
        await client.models.submit.create({
            userId: interaction.user.id,
            feedId: message.id,
            typeOf: "yetki",
            created: new Date(),
            claim: null
        });
        return await interaction.reply({
            content: "Talebiniz Oluşturuldu, kısa bir süre sonra ilgili yetkili size ulaşacaktır.",
            ephemeral: true
        });

    }
}

module.exports = RolCekilis;