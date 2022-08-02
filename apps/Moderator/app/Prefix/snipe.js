const Discord = require('discord.js');
const Command = require("../../../Base/Command");
const msg_snipe = require("../../../../../MODELS/Temprorary/Snipe.js");

class Upgrade extends Command {

    constructor(client) {
        super(client, {
            name: "snipe",
            description: "Sunucuda silinen son mesajı gösterir.",
            usage: "snipe @etiket/id",
            examples: ["snipe 479293073549950997"],
            category: "Management",
            accaptedPerms: ["root", "owner", "cmd-ceo", "cmd-double", "cmd-single"],
        });
    }

    async run(client, message, args) {
        let embed = new Discord.MessageEmbed().setColor("#780580");
        let mentioned = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.channels.cache.get(args[0]);
        if (!mentioned) await message.react(data.emojis["error"].split(':')[2].replace('>', ''));
        let sData = mentioned.user ? await msg_snipe.findOne({ author: mentioned.user.id }) : await msg_snipe.findOne({ channel: mentioned.id });
        if (!sData) return message.react(data.emojis["error"].split(':')[2].replace('>', ''));
        let channel = message.guild.channels.cache.get(sData.channel);
        await message.reply(embed.setDescription(`<@${sData.author}> (\`${sData.author}\`) kullanıcısı ${channel ? channel : `[\`${sData.channel}\`]`} kanalında en son silinen mesajı yakaladı. \n\n**Kullanıcı:**\n**Mesaj Iceriği:**\n\`\`\`${sData.content ? sData.content : "Bulunamadı"}\`\`\``));

    }
}

module.exports = Upgrade;