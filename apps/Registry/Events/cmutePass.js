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
		const exeMember = cur.guild.members.cache.get(this.audit.executor.id);
		const cmutes = await client.models.penalties.find({ userId: cur.user.id, typeOf: "CMUTE"});
        if (cmutes.length > 0 && cmutes.some(cmute => cmute.until.getTime() > new Date().getTime())) {
            const mute = cmutes.find(cmute => cmute.until.getTime() > new Date().getTime())
			if (mute && !mute.extras.some(extra => extra.subject === "revoke") && !cur.roles.cache.has(this.data.roles["muted"]) && !entry.executor.bot) {
				if (exeMember.roles.cache.has(this.data.roles["cmute"])) {
					await client.models.penalties.updateOne({ userId: mentioned.user.id, typeOf: "CMUTE" }, {
						$push: {
							extras: {
								subject: "revoke",
								data: {
									executor: message.author.id,
									date: new Date(),
									audit: this.audit.id
								}
							}
						}
					});
				} else {



				}
				await cur.roles.add(this.data.roles["muted"]);
				if (exeMember.roles.cache.has(this.data.roles["root"])) return;
				client.handler.emit("jail", exeMember.user.id, this.client.user.id, "* Mute Açma", "Perma", 1);
			}
        }
	}
}

module.exports = GuildMemberUpdate;
