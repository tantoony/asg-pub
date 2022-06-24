const { PrefixCommand } = require("../../../../base/utils");
class Cihaz extends PrefixCommand {

    constructor(client) {
        super(client, {
            name: "cihaz",
            description: "Belirtilen kullanıcının bağlandığı cihazı gösterir",
            usage: "cihaz",
            examples: ["cihaz 711897884391637062"],
            category: "Genel",
            accaptedPerms: [],
            aliases: [],
            cooldown: 300000
        });
    }

    async run(client, message, args) {
        const mentioned = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const embed = new MessageEmbed().setColor("RANDOM").setDescription(`${mentioned} Kullanıcısının şu anda kullandığı cihaz: \`${adana}\``)
        if (!mentioned) return message.react(data.emojis["error"].split(':')[2].replace('>', ''));
        if (mentioned.user.id === message.member.user.id) return message.react(data.emojis["error"].split(':')[2].replace('>', ''));
        if (mentioned.user.presence.status == "offline") return message.react(data.emojis["error"].split(':')[2].replace('>', ''));

        let adana = "Bilinmiyor";
        let ceyhan = Object.keys(mentioned.user.presence.clientStatus)
        if (ceyhan[0] == "desktop") adana = "Masaüstü Uygulama"
        if (ceyhan[0] == "web") adana = "İnternet Tarayıcısı"
        if (ceyhan[0] == "mobile") adana = "Mobil Telefon"
        await message.reply({embeds: [embed]})

    }
}

module.exports = Cihaz;