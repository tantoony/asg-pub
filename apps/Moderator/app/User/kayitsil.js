const { MessageEmbed } = require('discord.js');
const { AppUserCommand } = require('../../../../base/utils');

class ClickDel extends AppUserCommand {
    constructor(client) {
        super(client, {
            name: "kayitsil",
            type: "USER",
            customId: "kayitsil",
        });
    }
    async run(client, intg, data) {
        const target = intg.guild.members.cache.get(intg.targetId);
        if (!target) return intg.reply({ content: `Kullanıcı bulunamadı. Lütfen etiketleyerek işlem yapmayı deneyin.`, ephemeral: true, fetchReply: true });

        if (intg.member.roles.highest.rawPosition <= target.roles.highest.rawPosition) return await intg.reply(`${data.emojis["missingPerms"]} Bunu yapmak için yeterli yetkiye sahip değilsin`, {
            ephemeral: true
        });
        if (!target.bannable) return await intg.reply(`Bu kişiyi banlamak için yeterli yetkiye sahip değilim`, {
            ephemeral: true
        });
        await target.roles.remove(target.roles.cache.map(m => m.id).filter(m => m !== data.roles["booster"]));
        await target.roles.add(data.roles["welcome"]);
        await client.models.members.deleteOne({ _id: target.id });
        const myEmbed = new MessageEmbed().setDescription(`${target} kişisinin kaydı <@${intg.user.id}> tarafından silindi`);
        await intg.reply({
            embeds: [myEmbed]
        });

    }
}

module.exports = ClickDel;