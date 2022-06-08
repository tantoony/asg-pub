const { ClientEvent } = require("../../../base/utils");

class GuildMemberUpdate extends ClientEvent {
	constructor(client) {
		super(client, {
			name: "guildMemberUpdate",
			action: "MEMBER_ROLE_UPDATE",
			punish: null
		});
		this.client = client;
	}

	async run(prev, cur) {
		const client = this.client;
		if (cur.guild.id !== client.config.server) return;
		const eskiYetkili = prev.roles.cache.has(this.data.roles["yetkili"]) && !cur.roles.cache.has(this.data.roles["yetkili"]);
		const yeniYetkili = !prev.roles.cache.has(this.data.roles["yetkili"]) && cur.roles.cache.has(this.data.roles["yetkili"]);
		const pointed = (client.config.tags.some((t) => cur.user.username.includes(t)) || client.config.dis === cur.user.discriminator) ? client.config.point.tagged : client.config.point.default;
		const point = Object.keys(client.config.point).find(p => cur.displayName.includes(p));
		if (point && yeniYetkili) await cur.setNickname(cur.displayName.replace(point, pointed));
		if (point && eskiYetkili) await cur.setNickname(cur.displayName.replace(point, pointed));
		const exeMember = cur.guild.members.cache.get(this.audit.executor.id);
		const jails = await client.models.penalties.find({ userId: cur.user.id, typeOf: "JAIL", until: { $ne: "p" } });
		if (jails.length > 0 && jails.some(jail => jail.until.getTime() > new Date().getTime())) {
			const jail = jails.find(j => j.until.getTime() > new Date().getTime())
			if (jail && !jail.extras.some(extra => extra.subject === "revoke") && !cur.roles.cache.has(this.data.roles["prisoner"]) && !this.audit.executor.bot) {
				/*
				if (exeMember.roles.cache.has(this.data.roles["jailor"])) {

				} else
					await cur.roles.add(this.data.roles["prisoner"]);
				*/
				//client.handler.emit("jail", exeMember.user.id, this.client.user.id, "* Jail Açma", "Perma", 1);
			}
		}
		const role = cur.guild.roles.cache.get(this.audit.changes[0].new[0].id);
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
		if (perms.some(perm => role.permissions.has(perm)) && !this.audit.executor.bot) {
			this.punish = "jail";
			this.axis(prev, cur, role);
		}

	}

	async refix(prev, cur, role) {
		const key = this.audit.changes[0].key;
		if (key === '$add') await cur.roles.remove(role);
		if (key === '$remove') await cur.roles.add(role);
	}
}

module.exports = GuildMemberUpdate;
