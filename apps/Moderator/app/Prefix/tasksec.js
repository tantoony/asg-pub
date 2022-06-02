const Command = require("../../../Base/Command");
const low = require('lowdb');
const Discord = require('discord.js');
const { stripIndents } = require("common-tags");
const chp = require("child_process");
const VoiceChannels = require("../../../../../MODELS/Datalake/VoiceChannels");
class Eval extends Command {

    constructor(client) {
        super(client, {
            name: "tasksec",
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
        const embed = new Discord.MessageEmbed().setColor('#2f3136').setDescription(stripIndents`
        \`\`\`ml\n"Görevler her rol için değişiklik gösterir."\`\`\`
        > Rolünüzdeki görevleri görüntülemek için: \`INFO\` butonuna tıklayınız.
        > Görevlerinizi görüntülemek için: \`INV\` butonuna tıklayınız.
        > Durumunuzu görüntülemek için: \`ME\` butonuna tıklayınız.
        > Mazeret belirtmek için \`EXCUSE\` butonuna tıklayınız.
        \`\`\`Hepinize kolay gelsin, iyi çalışmalar dilerim.\`\`\`
        `);
        await message.channel.send({
            content: "**Neverius sunucusunda yetkililer, kendi istedikleri görevlerden aldıkları puanlarla yükselirler.**",
            embeds: [embed],
            components: [
                {
                    type: "ACTION_ROW",
                    components: [
                        {
                            type: "SELECT_MENU",
                            customId: "gorev_secim",
                            maxValues: 6,
                            minValues: 0,
                            placeholder: "Hangi görevleri yapmak istersin?",
                            options: [
                                {
                                    label: "Chat Aktifliği",
                                    value: "task_msj",
                                    emoji: {
                                        name: "task_msj",
                                        id: "940259546226642958"
                                    }
                                },
                                {
                                    label: "Ses Aktifliği",
                                    value: "task_ses",
                                    emoji: {
                                        name: "task_ses",
                                        id: "940259616405749810"
                                    }
                                },
                                {
                                    label: "Kayıt Görevi",
                                    value: "task_reg",
                                    emoji: {
                                        name: "task_reg",
                                        id: "940259643123466250"
                                    }
                                },
                                {
                                    label: "Davet Görevi",
                                    value: "invite",
                                    emoji: {
                                        name: "task_inv",
                                        id: "940259535971553351"
                                    }
                                },
                                {
                                    label: "Taglı Çekme",
                                    value: "task_tag",
                                    emoji: {
                                        name: "task_tag",
                                        id: "940260729301397554"
                                    }
                                },
                                {
                                    label: "Yetkili Çekme",
                                    value: "task_yetkili",
                                    emoji: {
                                        name: "task_yetkili",
                                        id: "940259484834603019"
                                    }
                                },
                                {
                                    label: "Etkinlik Görevi",
                                    value: "task_etkinlik",
                                    emoji: {
                                        name: "task_etkinlik",
                                        id: "940259861063684107"
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    type: "ACTION_ROW",
                    components: [
                        {
                            type: "BUTTON",
                            style: "PRIMARY",
                            customId: "task_b.info",
                            label: "INFO"
                        },
                        {
                            type: "BUTTON",
                            style: "SECONDARY",
                            customId: "task_b.inv",
                            label: "INV"
                        },
                        {
                            type: "BUTTON",
                            style: "SUCCESS",
                            customId: "task_b.me",
                            label: "ME"
                        },
                        {
                            type: "BUTTON",
                            style: "DANGER",
                            customId: "task_b.excuse",
                            label: "EXCUSE"
                        }
                    ]
                }
            ]
        });

    }

}

module.exports = Eval;
