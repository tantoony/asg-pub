const Command = require("../../../Base/Command");
const Discord = require("discord.js");

<<<<<<< HEAD
class RoleInfo extends Command {
=======
class BanList extends Command {
>>>>>>> 969d29057f0a3be631171bf2c4bdb8071468e2ed

    constructor(client) {
        super(client, {
            name: "banlist",
            description: "sunucudaki banlı üyeleri gösterir.",
            usage: "banlist",
            examples: ["banlist"],
            category: "Yetkili",
            aliases: ["banlar"],
            accaptedPerms: ["root", "owner"],
            cooldown: 10000
        });
    }

<<<<<<< HEAD
    async run(client, message, args) {

        message.guild.fetchBans(true).then(banuser => {
        let Banneduser = banuser.map(x => `${x.user.tag} (\`${x.user.id}\`)`)
            message.reply(`
=======
    async run(client, message, args, data) {

        message.guild.fetchBans(true).then(banuser => {
        let Banneduser = banuser.map(x => `${x.user.tag} (\`${x.user.id}\`)`)
        message.react(data.emojis["ok"])
        message.reply(`
>>>>>>> 969d29057f0a3be631171bf2c4bdb8071468e2ed
• Banlı Kullanıcılar.
• Toplam Banlı Kullancı sayısı: \`${banuser.size}\`           
${Banneduser.join("\n")})`, 
{ split: true })
        })
    }
}
<<<<<<< HEAD
module.exports = RoleInfo;
=======
module.exports = BanList;
>>>>>>> 969d29057f0a3be631171bf2c4bdb8071468e2ed
