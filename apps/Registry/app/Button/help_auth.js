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
        const Data = await client.models.member.findOne({ _id: interaction.user.id });
        const claim = Data.names.filter(peer => peer.name && client.config.tags.some(tag => peer.name.includes(tag)) || client.config.dis === peer.discriminator).pop();
        const resp = claim.claimer ? {
            id: claim.claimer,
            member: client.guild.members.cache.get(claim.claimer),
            mention: `<@${claim.claimer}>`,
            date: `<t:${claim.pop().date.getTime() / 1000}:R>`
        } : {
            id: "Aldıran Yok",
            date: `<t:${claim.pop().date.getTime() / 1000}:R>`
        }
        const embed = new MessageEmbed().setDescription(stripIndent`
        Başvuran: <@${interaction.user.id}>
        Katılma Tarihi: <t:${interaction.member.joinedTimestamp / 1000}:R>
        Tag aldıran: ${resp.member ? `${resp.mention}` : `[ID: \`${resp.id}\` ]`} (\`${resp.date}>)
        `).setAuthor({
            iconURL: "",
            name: "Yetki Başvurusu"
        }).setColor("DARK_RED");
        const message = await client.guild.channel.cache.get(data.roles["danışma-feed"]).send({
            embeds: [embed],
            components: [
                {
                    type: "ACTION_ROW",
                    components: [
                        {
                            type: "BUTTON",
                            style: "SUCCESS",
                            customId: `temp_danışma:${interaction.user.id}_yetki`,
                            label: "Kabul et"
                        }
                    ]
                }
            ]
        });
    }
}

module.exports = RolCekilis;