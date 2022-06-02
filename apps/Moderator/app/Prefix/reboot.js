const { PrefixCommand } = require("../../../../base/utils");
class Reboot extends PrefixCommand {
    constructor(client) {
        super(client, {
            name: "reboot",
            description: "Açıklama Belirtilmemiş.",
            usage: "Kullanım Belirtilmemiş.",
            examples: ["Örnek Bulunmamakta"],
            category: "OWNER",
            aliases: [],
            accaptedPerms: [],
            cooldown: 5000,
            enabled: true,
            adminOnly: false,
            ownerOnly: true,
            onTest: false,
            rootOnly: false,
            dmCmd: false
        });
    }
    async run(client, message, args, data) {
        await message.reply(`\`Hazırlanıyor...\``);
        await message.react("👍");
        //(await low(this.client.adapters('utils'))).set("lastCrush", message.channel.id).write();
        process.exit();
    }
}
module.exports = Reboot;