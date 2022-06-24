const { PrefixCommand } = require("../../../../base/utils");
class ForceCek extends PrefixCommand {

    constructor(client) {
        super(client, {
            name: "forcecek",
            description: "İstediğiniz kişinin odasına gidin",
            usage: "forcecek etiket/id",
            examples: ["forcecek 711897884391637062"],
            accaptedPerms: ["cmd_dante","root"],
            aliases: ["fcek","fçek"],
            category: "Moderasyon",
            cooldown: 10000
        });
    }

    async run(client, message, args, data) {
        
        const mentioned = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!mentioned) return message.react(data.emojis["error"].split(':')[2].replace('>', ''));
        if (mentioned.user.id === message.member.user.id) return message.channel.message.react(data.emojis["error"].split(':')[2].replace('>', ''));
        let kanal = message.member.voice.channel;
        if (!kanal) return message.react(data.emojis["error"].split(':')[2].replace('>', ''));
        if (!mentioned.voice || !mentioned.voice.channel) return message.react(data.emojis["error"].split(':')[2].replace('>', ''));
        if (kanal.id === mentioned.voice.channel.id) return message.react(data.emojis["error"].split(':')[2].replace('>', ''));
        await mentioned.voice.setChannel(kanal.id);
        let embed = new MessageEmbed().setColor("RANDOM").setDescription(`${mentioned} kullanıcısını yanınıza çektiniz!`)
        await message.react(data.emojis["ok"].split(':')[2].replace('>', ''));
        await message.reply({embeds: [embed]})
   
    }
}
module.exports = ForceCek;