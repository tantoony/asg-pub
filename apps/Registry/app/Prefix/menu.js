const { PrefixCommand } = require("../../../../base/utils");
const { MessageAttachment, MessageEmbed } = require('discord.js');
const { stripIndent } = require("common-tags");
class Eval extends PrefixCommand {

    constructor(client) {
        super(client, {
            name: "menu",
            description: "sunucunun linkini gönderir",
            usage: "link",
            examples: ["link"],
            cooldown: 300000,
            ownerOnly: true
        });
    }
    async run(client, message, args) {
        const files = [
            new MessageAttachment(client.base + "/media/danisma.jpg"),
            new MessageAttachment(client.base + "/media/sym.png"),
        ]
        await message.channel.send({
            files,
            embeds: [
                new MessageEmbed().setDescription(stripIndent`
                Lütfen oluşturmak istediğiniz talebi seçiniz.
                Konudan sorumlu müsait bir yetkilimiz çok geçmeden sizinle ilgilenecektir. 
                `).setImage("attachment://danisma.jpg").setAuthor({
                    iconURL: "attachment://sym.png",
                    name: "146 Danışma Paneli"
                })
            ],
            components: [
                {
                    type: "ACTION_ROW",
                    components: [
                        {
                            type: "BUTTON",
                            style: "PRIMARY",
                            customId: "help_b.auth",
                            label: "Yetki Talep"
                        },
                        {
                            type: "BUTTON",
                            style: "DANGER",
                            customId: "help_b.median",
                            label: "Sorun Çözme"
                        },
                        {
                            type: "BUTTON",
                            style: "SUCCESS",
                            customId: "help_b.sponsor",
                            label: "Sponsorluk"
                        },
                        {
                            type: "BUTTON",
                            style: "SECONDARY",
                            customId: "help_b.other",
                            label: "Diğer"
                        }
                    ]
                }
            ]
        });

    }

}

module.exports = Eval;
