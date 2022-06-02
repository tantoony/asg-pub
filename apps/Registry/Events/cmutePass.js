const pm2 = require("pm2");
const { ClientEvent } = require("../../../base/utils");

class GuildMemberUpdate extends ClientEvent {
	constructor(client) {
		super(client, {
			name: "guildMemberUpdate",
            action: "MEMBER_ROLE_UPDATE"
		});
		this.client = client;
	}

	async run(prev, cur) {
		const client = this.client;
		if (cur.guild.id !== client.config.server) return;
		if (entry.createdTimestamp <= Date.now() - 5000) return;
		const exeMember = cur.guild.members.cache.get(this.audit.executor.id);
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
			const model = await client.models.member.findOne({ id: cur.user.id });
			if (!model) {
				await client.models.member.create({
					id: cur.user.id,
					roles: rolex
				});
			} else {
				await client.models.member.updateOne({ id: cur.user.id }, { $set: { roles: rolex } });
				client.log(`${entry.executor.username} => [${entry.changes[0].key}] ${entry.target.username} : ${entry.changes[0].new[0].name}`, "mngdb");
			}
		}
		const cmutes = await client.models.penalties.find({ userId: cur.user.id, typeOf: "CMUTE"});
        if (cmutes.length > 0 && cmutes.some(cmute => cmute.until.getTime() > new Date().getTime())) {
            const mute = cmutes.find(cmute => cmute.until.getTime() > new Date().getTime())
			if (mute && !mute.extras.some(extra => extra.subject === "revoke") && !cur.roles.cache.has(this.data.roles["muted"]) && !entry.executor.bot) {
				if (exeMember.roles.cache.has(this.data.roles["cmute"])) {
					
				}
				await cur.roles.add(this.data.roles["muted"]);
				if (exeMember.roles.cache.has(this.data.roles["root"])) return;
				client.handler.emit("jail", exeMember.user.id, this.client.user.id, "* Mute Açma", "Perma", 1);
			}
        }

	}
}

module.exports = GuildMemberUpdate;
