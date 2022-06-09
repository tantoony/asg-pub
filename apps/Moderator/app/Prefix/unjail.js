const { PrefixCommand } = require("../../../../base/utils");
class unJail extends PrefixCommand {
    constructor(client) {
        super(client, {
            name: "unjail",
            description: "Belirtilen kullanıcının varolan jail cezasını kaldırır",
            usage: "unjail etiket/id",
            examples: ["unjail 674565119161794560"],
            category: "Moderasyon",
            aliases: ["unj"],
            accaptedPerms: ["root", "yt", "perm_jailor"],
            cooldown: 10000
        })
    }
    async run(client, message, args, data) {
        let mentioned = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!mentioned) return message.reply({
            embeds: [
                new MessageEmbed().setDescription(`Kullanıcı bulunamadı!`).setColor('#2f3136')
            ]
        }).then(msg => msg.delete({ timeout: 10_000 }));
        if (!mentioned) {
            await message.react("🚫");
            return message.reply({
                embeds: [
                    new MessageEmbed().setDescription(`Kullanıcı bulunamadı!`).setColor('#2f3136')
                ]
            }).then(msg => msg.delete({ timeout: 10_000 }))
        }
        if (!mentioned) return await message.react("🚫");
        const Data = await client.models.penalties.findOne({ userId: mentioned.user.id, typeOf: "JAIL" });
        if (!Data) return await message.react("🚫");
        await client.models.penalties.updateOne({ userId: mentioned.user.id, typeOf: "VMUTE" }, {
            $push: {
                extras: {
                    subject: "revoke",
                    data: {
                        executor: message.author.id,
                        date: new Date(),
                        channel: message.channel.id,
                        message: message.id
                    }
                }
            }
        });
        await mentioned.roles.add(Data.extras.filter(r => e.subject === "roles").map(e => e.data));
        await mentioned.roles.remove(data.roles["prisoner"]);
        await message.react("👍");
        // client.cmdCooldown[message.author.id][this.info.name] = Date.now() + this.info.cooldown;
    }
}
module.exports = unJail;