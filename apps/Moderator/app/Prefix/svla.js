const { PrefixCommand } = require("../../../../base/utils");
class Eval extends PrefixCommand {

    constructor(client) {
        super(client, {
            name: "neval",
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
        function clean(text) {
            if (typeof (text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else return text;
        }
        try {
            const code = message.content.split(' ').slice(1).join(' ');
            let evaled = eval("(async () => {" + code + "})()");

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            const all = await message.reply(clean(evaled), { code: "xl" });
            message.delete();
            all.delete({ timeout: 5000 });
        } catch (err) {
            message.reply(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``).then(msg => msg.delete({ timeout: 5000 }));
            message.delete({ timeout: 1000 });
        }

    }

}

module.exports = Eval;
