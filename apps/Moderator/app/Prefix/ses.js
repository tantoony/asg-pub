const { PrefixCommand } = require("../../../../base/utils");
class Ses extends PrefixCommand {

    constructor(client) {
        super(client, {
            name: "ses",
            description: "Etiketlenen kişinin ses dökümlerini gösterir",
            usage: "ses id/etiket",
            examples: ["ses 711897884391637062"],
            category: "Düzen",
            aliases: [],
            accaptedPerms: ["yt"],
            cmdChannel: "bot-komut",
            cooldown: 300000
        });
    }

    async run(client, message, args) {
    
        const embed = new Discord.MessageEmbed().setColor('#2f3136');
        const mentioned = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!mentioned) return message.react(data.emojis["error"].split(':')[2].replace('>', ''));
        if (args[1] && sayi(!args[1])) return message.react(data.emojis["error"].split(':')[2].replace('>', ''));
        const data = await VoiceRecords.findOne({ _id: mentioned.user.id });
        const myData = data.records.sort((a, b) => comparedate(b.enter) - comparedate(a.enter));
        const embedi = embed.setDescription(stripIndent`
        **Son Aktivite:**
        Kanal: ${message.guild.channels.cache.get(myData[args[1] || 0].channelID) || "Bilinmiyor"}
        Süre: ${Math.floor(checkMins(myData[args[1] || 0].enter) - checkMins(myData[args[1] || 0].exit))} dakika
        `);
        message.reply(embedi);

    }
}

module.exports = Ses;