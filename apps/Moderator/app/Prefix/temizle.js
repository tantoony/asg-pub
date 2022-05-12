const { DotCommand } = require("../../../../base/utils");
class Avatar extends DotCommand {

    constructor(client) {
        super(client, {
            name: "temizle",
            description: "mesaj atılan kanalda belirtilen sayıdalki mesajları temizler.",
            usage: "temizle 10",
            examples: ["temizle 10", "temizle 100"],
            category: "Düzen",
            aliases: ["sil"],
            accaptedPerms: ["yt"],
            cooldown: 10000
        });
    }

    async run(client, message, args) {        
        function sayi(anan) {
            var reg = new RegExp("^\\d+$");
            var valid = reg.test(anan);
            return valid;
        }

        if (!sayi(args[0])) return await message.react("🚫");


        const amount = args[0];

        if (!amount) return await message.react("🚫");
        if (isNaN(amount)) return await message.react("🚫");

        if (amount > 100) return await message.react("🚫");
        if (amount < 1) return await message.react("🚫");

        await message.channel.messages.fetch(
            { limit: amount }).then(messages => {
                message.channel.bulkDelete(messages);
                message.reply(`${messages.size} Mesaj Temizlenmiştir`)
            });

    }
}

module.exports = Avatar;