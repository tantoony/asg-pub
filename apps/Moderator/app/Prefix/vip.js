const Discord = require('discord.js');
const Command = require("../../../Base/Command");
class Vip extends Command {

    constructor(client) {
        super(client, {
            name: "vip",
            description: "Belirtilen kullanıcıya özel üye rolü verir.",
            usage: "vip @Ktria/ID",
            examples: ["vip @Ktria/ID"],
            category: "Genel",
            aliases: ["vib", "elite"],
            accaptedPerms: ["root", "owner"],
            cooldown: 10000
        });
    }

    async run(client, message, args, data) {
        const roleID = data.roles["vip"];
        const myRole = message.guild.roles.cache.get(roleID);
        const embed = new Discord.MessageEmbed().setColor("RANDOM")
        const mentioned = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        
        if (!mentioned) return message.react(data.emojis["error"].split(':')[2].replace('>', ''));
        if (!mentioned.roles.cache.has(roleID)) {
            await message.reply(embed
                .setDescription(`${mentioned} kullanıcısına **${myRole.name}** isimli vip permini başarıyla verdim!`));
            await mentioned.roles.add(myRole.id);
        } else {
            await mentioned.roles.remove(myRole.id);
            await message.reply(embed
            .setDescription(`${mentioned} kullanıcısından **${myRole.name}** isimli vip permini başarıyla aldım!`));
        }
        await message.react(data.emojis["ok"]);
    }
}

module.exports = Vip;