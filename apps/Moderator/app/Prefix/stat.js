const { MessageAttachment, MessageEmbed } = require('discord.js');
const { stripIndent } = require('common-tags');
const moment = require("moment")
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const { PrefixCommand } = require("../../../../base/utils");
class Stat extends PrefixCommand {
    constructor(client) {
        super(client, {
            name: "stat",
            description: "Belirtilen kullanıcının istatistiklerini gösterir",
            usage: "stat @etiket/id",
            examples: ["stat 674565119161794560"],
            category: "Stats",
            aliases: ["st"],
            cooldown: 10000
        })
    }
    async run(client, message, args) {
        const mentioned = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        //if (mentioned.user.id !== message.author.id) args = args.slice(1);
        const since = moment(new Date()).subtract(7, "days").toISOString();
        const vData = await client.models.voice.find({ userId: mentioned.user.id, created: { $gt: since } }, { sort: 1 });
        const vChannels = await client.models.channels.find({ kindOf: "GUILD_VOICE" });
        const records = {};
        for (let t = 0; t < vData.length - 1; t++) {
            const vLog = vData[t];
            const nextData = vData[t + 1];
            const diff = moment(nextData.created).diff(vLog.created);
            if (!records[vLog.channelId]) records[vLog.channelId] = [];
            if (vLog.channelId) {
                const vCnl_p = vChannels.find(doc => doc.meta.some(m => m._id === vLog.channelId)).parent;
                const parentData = await client.models.channels.findOne({ meta: { $elemMatch: { _id: vCnl_p } } });
                const parent = client.guild.channels.cache.get(parentData.meta.pop()._id);
                const entry = {
                    category: parent ? parent.name : "\`Bilinmiyor\`",
                    channelId: vLog.channelId,
                    isActive: !vLog.self_deaf && !vLog.self_mute && !server_mute && !server_mute,
                    isStreaming: vLog.webcam || vLog.streaming,
                    duration: diff
                };
                records[vLog.channelId].push(entry);
            }
        }
        console.log(kanalGrup);
        /*
        if (mentioned.user.id !== message.author.id) args = args.slice(1);
        let days = args[1] || 7;
        if (!Data) return message.reply(`Veri bulunamadı...`);
        const records = Data.filter(r => checkDays(r.enter) < days);
        const birim = [
            "Saat",
            "Dakika",
            "Saniye"
        ];
        const responseEmbed = new Discord.MessageEmbed().setDescription(stripIndent`
        ${mentioned} kişisine ait ${days} günlük ses bilgileri:
        **Genel Bilgileri:**
        • ID: \`${mentioned.id}\`
        • Kullanıcı: ${mentioned}
        • Sunucuya Katılma Tarihi: \`<t:${Math.round(mentioned.joinedTimestamp / 1000)}:R>
        • Geçirilen toplam süre: \`${new Date(records.map(r => r.duration).reduce((a, b) => a + b, 0)).toISOString().substr(11, 8).toString().split(':').map((v, i) => v > 0 ? `${v} ${birim[i]}` : "").filter(str => str.length > 1).join(' ')}\`

        **Ses Bilgileri:**
        • Public ses süresi: \`${new Date(records.filter(r => r.channelType === "st_public").map(r => r.duration).reduce((a, b) => a + b, 0)).toISOString().substr(11, 8).toString().split(':').map((v, i) => v > 0 ? `${v} ${birim[i]}` : "").filter(str => str.length > 1).join(' ')}\`
        • Register ses süresi: \`${new Date(records.filter(r => r.channelType === "st_registry").map(r => r.duration).reduce((a, b) => a + b, 0)).toISOString().substr(11, 8).toString().split(':').map((v, i) => v > 0 ? `${v} ${birim[i]}` : "").filter(str => str.length > 1).join(' ')}\`
        • Private ses süsresi: \`${new Date(records.filter(r => r.channelType === "st_private").map(r => r.duration).reduce((a, b) => a + b, 0)).toISOString().substr(11, 8).toString().split(':').map((v, i) => v > 0 ? `${v} ${birim[i]}` : "").filter(str => str.length > 1).join(' ')}\`

        **Toplam Ses İstatistikleri**
        • Toplam ses: \`${new Date(records.map(r => r.duration).reduce((a, b) => a + b, 0)).toISOString().substr(11, 8).toString().split(':').map((v, i) => v > 0 ? `${v} ${birim[i]}` : "").join(' ')}\`
        • Mikrofon kapalı: \`${new Date(records.filter(r => r.selfMute).map(r => r.duration).reduce((a, b) => a + b, 0)).toISOString().substr(11, 8).toString().split(':').map((v, i) => v > 0 ? `${v} ${birim[i]}` : "").filter(str => str.length > 1).join(' ')}\`
        • Kulaklık kapalı: \`${new Date(records.filter(r => r.selfMute).map(r => r.duration).reduce((a, b) => a + b, 0)).toISOString().substr(11, 8).toString().split(':').map((v, i) => v > 0 ? `${v} ${birim[i]}` : "").filter(str => str.length > 1).join(' ')}\`
     `).setThumbnail(mentioned.user.displayAvatarURL({ dynamic: true })).setColor(mentioned.displayHexColor).setTitle(message.guild.name);
        return await message.reply(responseEmbed);
        */
        const canvas = new ChartJSNodeCanvas({ width: 960, height: 540 });
        const config = {
            type: "line",
            data: {
                labels: ["cumartesi", "pazar", "pazartesi", "salı", "çarşamba", "perşembe", "cuma"],
                datasets: [
                    {
                        label: "Yayın",
                        backgroundColor: "#7289da",
                        fill: true,
                        data: [1.2, 3.5, 2.8, 2, 0.8, 1.2, 3]
                    },
                    {
                        label: "Aktif",
                        backgroundColor: "#00FF99",
                        fill: true,
                        data: [8, 11, 9, 3, 2, 1, 8]
                    },
                    {
                        label: "Toplam",
                        backgroundColor: "#1e2124",
                        fill: true,
                        data: [12, 13, 10, 5, 3, 5, 10]
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        max: 24,
                        ticks: {
                            beginAtZero: true,
                            suggestedMin: 50,
                            suggestedMax: 100
                        }
                    }
                }
            }
        }
        const buffer = await canvas.renderToBuffer(config);
        const file = new MessageAttachment(buffer, "stat.png");
        const embed = new MessageEmbed().setDescription(stripIndent` sa
        `).setImage("attachment://stat.png").setThumbnail(mentioned.user.displayAvatarURL({ dynamic: true })).setColor(mentioned.displayHexColor);
        return await message.reply({
            files: [file],
            embeds: [embed]
        });
    }
}
module.exports = Stat;
