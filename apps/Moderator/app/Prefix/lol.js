const { stripIndent } = require("common-tags");
const { MessageAttachment } = require("discord.js");
const { PrefixCommand } = require("../../../../base/utils");
class Eval extends PrefixCommand {

    constructor(client) {
        super(client, {
            name: "lol",
            description: "Açıklama Belirtilmemiş.",
            usage: "Kullanım Belirtilmemiş.",
            examples: ["Örnek Bulunmamakta"],
            category: "OWNER",
            aliases: [],
            accaptedPerms: [],
            cooldown: 5000,
            enabled: true,
            adminOnly: false,
            ownerOnly: true,
            onTest: false,
            rootOnly: false,
            dmCmd: false
        });
    }

    async run(client, message, args) {
        await message.channel.send({
            embeds: [
                new (require('discord.js')).MessageEmbed().setDescription(stripIndent`
                Lütfen oluşturmak istediğiniz talebi seçiniz.
                Konudan sorumlu müsait bir yetkilimiz çok geçmeden sizinle ilgilenecektir. 
                `).setImage("attachment://img").setAuthor({
                    iconURL: "attachment://icn",
                    name: "**146 Danışma Paneli**"
                })
            ],
            files: [
                new MessageAttachment(client.base + "/media/asgWpp.jpg", "img"),
                new MessageAttachment(client.base + "/media/sym.png", "icn"),
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
                            customId: "help_b.oth",
                            label: "Diğer"
                        }
                    ]
                }
            ]
        });

    }

}

module.exports = Eval;
