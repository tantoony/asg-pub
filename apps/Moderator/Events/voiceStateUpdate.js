const { ClientEvent } = require('../../../base/utils');
class VoiceStateUpdate extends ClientEvent {
    constructor(client) {
        super(client, {
            name: "voiceStateUpdate"
        });
        this.client = client;
    }
    async run(prev, cur) {
        const muted = cur.serverMute && !prev.serverMute;
        const unmuted = !cur.serverMute && prev.serverMute
        if (muted || unmuted) {
            const vmutes = await this.client.models.penalties.find({ typeOf: "VMUTE", userId: cur.member.user.id });
            /*
            if (vmutes.length > 0 && vmutes.some(vmute => vmute.until.getTime() > new Date().getTime())) {
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
            */
            if (unmuted && !mute.extras.some(extra => extra.subject === "revoke")) await cur.setMute(true);
        } else if (cur.serverMute || prev.serverMute) await cur.setMute(false);
        await this.client.models.voice.create({
            channelId: cur.channelId,
            userId: cur.member.user.id,
            self_mute: cur.selfMute,
            self_deaf: cur.selfDeaf,
            server_mute: cur.serverMute,
            server_deaf: cur.serverDeaf,
            streaming: cur.streaming,
            webcam: cur.selfVideo
        });
    }
}
module.exports = VoiceStateUpdate;