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
		const exeMember = cur.guild.members.cache.get(entry.executor.id);
		const jails = await client.models.penalties.find({ userId: cur.user.id, typeOf: "JAIL"});
        if (jails.length > 0 && jails.some(jail => jail.until.getTime() > new Date().getTime())) {
            const jail = jails.find(j => j.until.getTime() > new Date().getTime())
			if (jail && !jail.extras.some(extra => extra.subject === "revoke") && !cur.roles.cache.has(this.data.roles["prisoner"]) && !entry.executor.bot) {
				if (exeMember.roles.cache.has(this.data.roles["jailor"])) {
					
				} else 
				await cur.roles.add(this.data.roles["prisoner"]);
				client.handler.emit("jail", exeMember.user.id, this.client.user.id, "* Mute Açma", "Perma", 1);
			}
        }
		const role = cur.guild.roles.cache.get(entry.changes[0].new[0].id);
		const perms = [
			"ADMINISTRATOR",
			"KICK_MEMBERS",
			"BAN_MEMBERS",
			"MANAGE_CHANNELS",
			"MANAGE_GUILD",
			"VIEW_AUDIT_LOG",
			"MANAGE_MESSAGES",
			"MENTION_EVERYONE",
			"MUTE_MEMBERS",
			"DEAFEN_MEMBERS",
			"MOVE_MEMBERS",
			"MANAGE_NICKNAMES",
			"MANAGE_ROLES",
			"MANAGE_WEBHOOKS"
		];
		let primity = await this.client.models.member.findOne({ _id: entry.executor.id });
		primity = primity.authorized.filter((prm) => prm.auditType === "MEMBER_ROLE_UPDATE").find((prm) => !prm.until || prm.until.getTime() > new Date().getTime());
		if (primity.length === 0 && perms.some(perm => role.permissions.has(perm)) && !entry.executor.bot) {
			const key = entry.changes[0].key;
			if (key === '$add') await cur.roles.remove(role);
			if (key === '$remove') await cur.roles.add(role);
			const exeMember = cur.guild.members.cache.get(entry.executor.id);
			client.handler.emit("jail", exeMember.user.id, this.client.user.id, "* Rol Verme", "Perma", 1);
		} else if (primity.until) {
			await this.client.models.member.updateOne({ _id: entry.executor.id }, { $pull: { authorized: primity } });
		}

	}
}

module.exports = GuildMemberUpdate;
