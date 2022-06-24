const { PrefixCommand } = require("../../../../base/utils");
class Slowmode extends PrefixCommand {

    constructor(client) {
        super(client, {
            name: "slowmode",
            description: "Belirtilen roldeki üyeleri gösterir.",
            usage: "slowmode 1",
            examples: ["slowmode 1m"],
            category: "Yetkili",
            aliases: ["slow", "sm"],
            accaptedPerms: ["root", "owner", "cmd-ceo", "cmd-double"],
            cooldown: 10000
        });
    }

    async run(client, message, args, data) {
        
        const slowtime = args[0];
        if (!slowtime) return message.react(data.emojis["error"].split(':')[2].replace('>', ''));
        if (isNaN(slowtime)) return message.react(data.emojis["error"].split(':')[2].replace('>', ''));
        if (slowtime > 1000) return message.react(data.emojis["error"].split(':')[2].replace('>', ''));
        message.channel.setRateLimitPerUser(args[0]);
        message.react(data.emojis["ok"].split(':')[2].replace('>', ''))
        message.reply(`Bu kanalda artık ${slowtime} saniye süresinde bir yazıla bilecek.`);
   
    }
}
module.exports = Slowmode;