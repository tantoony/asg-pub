const { ClientEvent } = require('../../../base/utils');
class RoleCreate extends ClientEvent {
    constructor(client) {
        super(client, {
            name: "roleCreate",
            action: "ROLE_CREATE",
            punish: "ban",
            privity: true
        });
        this.client = client;
    }

    async rebuild(role) {
        const client = this.client;
        const freshDoc = await client.models.roles.create({
            keyConf: null,
            meta: []
        });
        await role.setPermissions(0n, `Yeni Oluşturuldu`);
        await client.models.roles.updateOne({ _id: freshDoc._id }, {
            $push: {
                meta: {
                    _id: role.id,
                    name: role.name,
                    icon: role.icon,
                    color: role.hexColor,
                    hoist: role.hoist,
                    mentionable: role.mentionable,
                    position: role.rawPosition,
                    bitfield: role.permissions.bitfield.toString(),
                    created: role.createdAt,
                    emoji: role.unicodeEmoji
                }
            }
        })
    }

    async refix(role) {
        await role.delete();
    }
}

module.exports = RoleCreate;