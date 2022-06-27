const pm2 = require("pm2");
const { ClientEvent } = require("../../../base/utils");

class GuildMemberUpdate extends ClientEvent {
	constructor(client) {
		super(client, {
			name: "guildMemberUpdate"
		});
		this.client = client;
	}

	async run(prev, cur) {
		const client = this.client;
		if (cur.guild.id !== client.config.server) return;
		const entry = await cur.guild.fetchAuditLogs({ type: "MEMBER_ROLE_UPDATE" }).then(logs => logs.entries.first());
		if (entry.createdTimestamp <= Date.now() - 5000) return;
		const eskiYetkili = prev.roles.cache.has(this.data.roles["yetkili"]) && !cur.roles.cache.has(this.data.roles["yetkili"]);
		const yeniYetkili = !prev.roles.cache.has(this.data.roles["yetkili"]) && cur.roles.cache.has(this.data.roles["yetkili"]);
		const pointed = (client.config.tags.some((t) => cur.user.username.includes(t)) || client.config.dis === cur.user.discriminator) ? client.config.point.tagged : client.config.point.default;
		const point = Object.keys(client.config.point).find(p => cur.displayName.includes(p));
		if (point && yeniYetkili) await cur.setNickname(cur.displayName.replace(point, pointed));
		if (point && eskiYetkili) await cur.setNickname(cur.displayName.replace(point, pointed));
		let ohal = false;
		pm2.list((err, list) => {
			if (err) return;
			ohal = list.map(item => item.name).filter(item => item.startsWith("CD")).length > 0;
		});
		if (!ohal) {
			let rolex = cur.roles.cache.map((r) => r.id);
			const model = await client.models.member.findOne({ _id: cur.user.id });
			if (!model) {
				await client.models.member.create({
					_id: cur.user.id,
					roles: rolex
				});
			} else {
				await client.models.member.updateOne({ _id: cur.user.id }, { $set: { roles: rolex } });
			}
            client.log(`${entry.executor.username} => [${entry.changes[0].key}] ${entry.target.username} : ${entry.changes[0].new[0].name}`, "mngdb");
		}
	}
}

module.exports = GuildMemberUpdate;
