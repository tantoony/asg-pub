const { ClientEvent } = require("../../../base/utils");

class GuildMemberRemove extends ClientEvent {
    constructor(client) {
        super(client, {
            name: "guildMemberRemove",
            action: "MEMBER_PRUNE",
            privity: true,
            punish: "ban"
        })
        this.client = client;
    }

}
module.exports = GuildMemberRemove;