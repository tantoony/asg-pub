const { DotCommand } = require("../../../../base/utils");
class Afk extends DotCommand {

    constructor(client) {
        super(client, {
            name: "afk",
            description: "Belirtilen sebepte sizi afk olarak veritabanına ekler",
            usage: "afk sebep",
            examples: ["afk cumaya gittim geleceğim"],
            category: "Genel",
            cmdChannel: "bot-komut",
            cooldown: 300000
        });
    }

    async run(client, message, args) {
        const sebep = args.join(' ');
        if (sebep.includes("@everyone")) return await message.react("🚫");
        if (sebep.includes("@here")) return await message.react("🚫");
        if (sebep.length > 50 || sebep.length == 0) return await message.react("🚫");
        const member = await client.models.member.findOne({ _id: message.author.id, "afk_data.isAfk": true });
        if (member) return await message.react("🚫");
        await client.models.member.updateOne({ _id: message.author.id }, {
            afk_data: {
                isAfk: true,
                note: sebep,
                created: new Date(),
                inbox: []
            }
        });
        await message.react("👍");
    }
}

module.exports = Afk;