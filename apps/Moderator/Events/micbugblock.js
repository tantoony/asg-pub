const { ClientEvent } = require('../../../base/utils');
class MicBug extends ClientEvent {
    constructor(client) {
        super(client, {
            name: "voiceStateUpdate"
        });
        this.client = client;
    }
    async run(prev, cur) {
        const client = this.client;
        const selfMuted = cur.selfMute && !prev.selfMute;
        const unMuted = !cur.selfMute && prev.selfMute;
        if (selfMuted || unMuted) {
            let uCooldown = this.cooldown.get(cur.member.user.id);
            if (!uCooldown) this.cooldown.set(cur.member.user.id, []);
            uCooldown = this.cooldown.get(cur.member.user.id);
            uCooldown.push({
                channel: cur.channel.id,
                date: new Date()
            })
            this.cooldown.set(cur.member.user.id, uCooldown);
            uCooldown = this.cooldown.get(cur.member.user.id);
            let uCount = uCooldown.filter(d => d.channel === cur.channel.id && new Date().getTime() - d.date.getTime() < 1000);
            if (!uCooldown) this.cooldown.set(cur.member.user.id, uCount);
            const count = uCount.length;
            if (count === 5) {
                client.emit("vmute", cur.member.user.id, this.client.user.id, "MIC-BUG", 5);
                cur.guild.channels.cache.get(this.data.channels["chat"]).send(`<@${cur.member.user.id}> Mikrofonunu çok fazla açıp kapattığın için 5 dakika mutelendin!`).then((msg) => {
                    msg.delete({ timeout: 60_000 })
                });
            }
        }
        const muted = cur.serverMute && !prev.serverMute;
        const unmuted = !cur.serverMute && prev.serverMute
        if (muted || unmuted) {
            const entry = await message.guild.fetchAuditLogs({ type: 'MEMBER_UPDATE' }).then(logs => logs.entries.first());
            const executor = client.guild.members.cache.get(entry.executor.id);
            if (executor.roles.cache.has(this.data.roles["vmute"]) || executor.roles.cache.has(this.data.roles["yt"])) {
                if (muted) client.emit("vmute", cur.member.user.id, entry.executor.idd, "[sağ tık ile]", 5);
                if (unmuted) {
                    await client.models.penalties.updateOne({ userId: cur.member.user.id, typeOf: "VMUTE" }, {
                        $push: {
                            extras: {
                                subject: "revoke",
                                data: {
                                    executor: entry.executor.id,
                                    date: new Date(),
                                    channel: cur.channel.id,
                                    message: "invoice"
                                }
                            }
                        }
                    });
                    if (mentioned.voice && mentioned.voice.channel) await mentioned.voice.setMute(false);
                }
            }
        }

    }
}
module.exports = MicBug;