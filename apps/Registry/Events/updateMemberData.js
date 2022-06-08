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
		let ohal = false;
		pm2.list((err, list) => {
			if (err) return;
			ohal = list.map(item => item.name).filter(item => item.startsWith("CD")).length > 0;
		});
		if (!ohal) {
			let rolex = [];
			cur.roles.cache.map((r) => r.id).forEach((r) => {
				client.models.roles.findOne({ meta: { $elemMatch: { _id: r } } }).then((doc) => {
					rolex.push(doc._id);
				});
			});
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
