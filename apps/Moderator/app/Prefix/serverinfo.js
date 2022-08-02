const Discord = require('discord.js');
const Command = require("../../../Base/Command");
const { stripIndents } = require('common-tags');
const { checkDays, rain } = require('../../../../../HELPERS/functions');
const moment = require("moment")
moment.locale('tr');
class Call extends Command {

    constructor(client) {
        super(client, {
            name: "serverinfo",
            description: "Botun durumunu gösterir",
            usage: "serverinfo",
            examples: ["serverinfo"],
            category: "Genel",
            aliases: ["server"],
            cmdChannel: "bot-komut",
            cooldown: 300000
        });
    }

    async run(client, message, args) {
        const embed = new Discord.MessageEmbed().setDescription(stripIndents`
        • Sunucunun adı: **${message.guild.name}**
        • Sunucunun ID'si: \`${message.guild.id}\`
        • Açılma Tarihi: \`${moment(message.guild.createdAt).format("LLL")}\`
        ───────────────────
        • Rol sayısı: \`${message.guild.roles.cache.size}\`
        • Kanal sayısı: \`${message.guild.channels.cache.size}\`
        • Emoji sayısı: \`${message.guild.emojis.cache.size}\`
        ───────────────────
        • Toplam üye sayısı: \`${message.guild.memberCount}\`
        • Çevrimiçi üye sayısı: \`${message.guild.members.cache.filter(m => m.presence.status !== 'offline').size}\`
        • Yetkili üye sayısı: \`${message.guild.members.cache.filter(m => m.roles.cache.has(data.roles["cmd-registry"])).size}\`
        ───────────────────
        • Booster üye sayısı: \`${message.guild.members.cache.filter(m => m.roles.cache.has(data.roles["booster"])).size}\`
        • Taglı üye sayısı: \`${message.guild.members.cache.filter(m => m.roles.cache.has(data.roles["crew"])).size}\`
        • Vip üye sayısı: \`${message.guild.members.cache.filter(m => m.roles.cache.has(data.roles["vip"])).size}\`
        • Sunucudaki Bot sayısı: \`${message.guild.members.cache.filter(x => x && x.user.bot).size}\`
        ───────────────────
        • Erkek üye sayısı: \`${message.guild.members.cache.filter(m => m.roles.cache.has("854162987619057665")).size}\`
        • Kadın üye sayısı: \`${message.guild.members.cache.filter(m => m.roles.cache.has("854162990534623233")).size}\`
        • Kayıtsız üye sayısı: \`${message.guild.members.cache.filter(m => m.roles.cache.has(data.roles["welcome"])).size}\`
        • Cezalı üye sayısı: \`${message.guild.members.cache.filter(m => m.roles.cache.has(data.roles["prisoner"])).size}\`
        ───────────────────
        `);
        await message.reply(embed.setColor('BLACK').setTimestamp().setFooter(`• Şeytan sizi seviyor 🌟`).setThumbnail(message.guild.iconURL({ dynamic: true })).setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }), "https://tantoony.net/")).then(msg => msg.delete({ timeout: 100000 }));
    }
}

module.exports = Call;