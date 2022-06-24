const { PrefixCommand } = require("../../../../base/utils");
class ForceGit extends PrefixCommand {

    constructor(client) {
        super(client, {
            name: "git",
            description: "İstediğiniz kişinin odasına gidin",
            usage: "forcecek etiket/id",
            examples: ["forcecek 711897884391637062"],
            accaptedPerms: ["cmd_dante","root"],
            aliases: ["fgit"],
            category: "Moderasyon",
            cooldown: 10000
        });
    }

    async run(client, message, args, data) {
        
        const mentioned = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!mentioned) return message.channel.semessage.react(data.emojis["error"].split(':')[2].replace('>', ''));
        if (mentioned.user.id === message.member.user.id) return message.react(data.emojis["error"].split(':')[2].replace('>', ''));
        let kanal = mentioned.voice.channel;
        if (!kanal) return message.react(data.emojis["error"].split(':')[2].replace('>', ''));
        if (!message.member.voice || !message.member.voice.channel) return message.react(data.emojis["error"].split(':')[2].replace('>', ''));
        if (kanal.id === message.member.voice.channel.id) return message.react(data.emojis["error"].split(':')[2].replace('>', ''));
        if(!kanal) return message.react(data.emojis["error"].split(':')[2].replace('>', ''));
        await message.member.voice.setChannel(kanal.id);
        let embed = new MessageEmbed().setColor("RANDOM").setDescription(`${mentioned} kullanıcısının yanına taşındınız!`)
        await message.react(data.emojis["ok"].split(':')[2].replace('>', ''))
        await message.reply({embeds: [embed]})
   
    }
}
module.exports = ForceGit;