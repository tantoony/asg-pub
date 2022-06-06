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
        const vData = await client.models.voice.find({ userId: mentioned.user.id, created: { $gt: since } }, [
            "channelId",
            "self_deaf",
            "self_mute",
            "server_mute",
            "server_mute",
            "webcam",
            "streaming",
            "_id",
            "created"
        ], { sort: { created: 1 } });
        const records = {};
        for (let t = 0; t < vData.length - 1; t++) {
            const vLog = vData[t];
            const nextData = vData[t + 1];
            const diff = moment(nextData.created).diff(vLog.created);
            const vCnl_p = await client.models.channels.findOne({ meta: { $elemMatch: { _id: vLog.channelId } } });
            if (vLog.channelId) {
                if (!records[vLog.channelId]) records[vLog.channelId] = [];
                let ary = records[vLog.channelId];
                const parentData = await client.models.channels.findOne({ meta: { $elemMatch: { _id: vCnl_p.parent } } });
                const parent = client.guild.channels.cache.get(parentData.meta.pop()._id);
                const entry = {
                    category: parent ? parent.name : "\`Bilinmiyor\`",
                    channelId: vLog.channelId,
                    isActive: !vLog.self_deaf && !vLog.self_mute && !vLog.server_mute && !vLog.server_mute,
                    isStreaming: vLog.webcam || vLog.streaming,
                    duration: diff,
                    day: vLog.created.getDay()
                };
                ary.push(entry);
                records[vLog.channelId] = ary;
            }
        };
        const myData = {
            total: Object.values(records).flat(),
            aktif: Object.values(records).flat().filter(d => d.isActive),
            yayın: Object.values(records).flat().filter(d => d.isStreaming)
        };
        function getDataDay(data) {
            const res = [];
            for (let d = 0; d < 7; d++) {
                res.push(data.filter(dt => dt.day === d).map(dt => dt.duration).reduce((p, c) => c + p, 0));
            }
            return res;
        };
        const daysTr = ["pazartesi", "salı", "çarşamba", "perşembe", "cuma", "cumartesi", "pazar", "pazartesi", "salı", "çarşamba", "perşembe", "cuma", "cumartesi", "pazar"];
        const canvas = new ChartJSNodeCanvas({ width: 960, height: 540 });
        const dayNum = new Date().getDay();
        const config = {
            type: "line",
            data: {
                labels: daysTr.slice(dayNum, daydayNumsTr + 7),
                datasets: [
                    {
                        label: "Yayın",
                        backgroundColor: "#7289da",
                        fill: true,
                        data: getDataDay(myData.yayın)
                    },
                    {
                        label: "Aktif",
                        backgroundColor: "#00FF99",
                        fill: true,
                        data: getDataDay(myData.aktif)
                    },
                    {
                        label: "Toplam",
                        backgroundColor: "#1e2124",
                        fill: true,
                        data: getDataDay(myData.total)
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
