const { ClientEvent } = require("../../../base/utils");

class GuildMemberRemove extends ClientEvent {
    constructor(client) {
        super(client, {
            name: "guildMemberRemove",
            action: "MEMBER_KICK"
        })
        this.client = client;
    }

    async run(member) {
        const client = this.client;
        if (member.guild.id !== client.config.server) return;
        const model = await client.models.member.findOne({ _id: member.user.id });
        if (model) await client.models.member.updateOne({ _id: member.user.id }, { $set: { authorized: [], roles: [] } });
    }
}
module.exports = GuildMemberRemove;