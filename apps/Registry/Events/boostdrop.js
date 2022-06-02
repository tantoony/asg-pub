const { ClientEvent } = require("../../../base/utils");

class BoostDrop extends ClientEvent {
	constructor(client) {
		super(client, {
			name: "guildMemberUpdate"
		});
		this.client = client;
	}

	async run(prev, cur) {
		const client = this.client;
		if (cur.guild.id !== client.config.server) return;
		const memberDb = await client.models.member.findOne({ _id: cur.user.id });
		if (prev && prev.roles.cache.has(this.data.roles["booster"]) && !cur.roles.cache.has(this.data.roles["booster"])) {
			if (!memberDb) {
				await cur.roles.remove(cur.roles.cache.map(r => r.id));
				await cur.roles.add(this.data.roles["welcome"]);
				return;
			}
			const pointed = client.config.tags.some(t => target.user.username.includes(t)) ? client.config.tag[0] : client.config.extag;
			await cur.setNickname(`${pointed} ${memberDb.registries.pop().name}`);
			return;
		}
    }
}
module.exports = BoostDrop;