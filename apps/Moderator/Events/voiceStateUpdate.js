const { ClientEvent } = require('../../../base/utils');
class VoiceStateUpdate extends ClientEvent {
    constructor(client) {
        super(client, {
            name: "voiceStateUpdate"
        });
        this.client = client;
    }
    async run(prev, cur) {
        const client = this.client;
        const vmutes = await this.client.models.penalties.find({ typeOf: "VMUTE", userId: cur.member.user.id });
        if (vmutes.length > 0 && vmutes.some(vmute => vmute.until.getTime() > new Date().getTime())) {
            const mute = vmutes.find(vmute => vmute.until.getTime() > new Date().getTime())
            if(!cur.serverMute && !mute.extras.some(extra => extra.subject === "revoke")) await cur.setMute(true);
        } else if (cur.serverMute && prev.serverMute) await cur.setMute(false);
        if (prev && cur && prev.selfMute && !cur.selfMute) {
            let uCooldown = this.client.actionlist.voicespam.get(cur.member.user.id);
            if (!uCooldown) this.client.actionlist.voicespam.set(cur.member.user.id, []);
            uCooldown = this.client.actionlist.voicespam.get(cur.member.user.id);
            uCooldown.push({
                channel: cur.channel.id,
                date: Date.now()
            })
            this.client.actionlist.voicespam.set(cur.member.user.id, uCooldown);
            uCooldown = this.client.actionlist.voicespam.get(cur.member.user.id);
            console.log(uCooldown);
            let uCount = uCooldown.filter(d => d.channel === cur.channel.id && Date.now() - d.date < 10000);
            const count = uCount.length;
            if (count === 3) await cur.guild.channels.cache.get(this.data.channels["chat"]).send(`<@${cur.member.user.id}> Mikrofonun açıp kapamaya devam edersen sesli kanallardan susturulacaksın.`);
            if (count === 5) {
                client.emit("vmute", cur.member.user.id, this.client.user.id, "MIC-BUG", 5);
                await cur.guild.channels.cache.get(this.data.channels["chat"]).send(`<@${cur.member.user.id}> Mikrofonunu çok fazla açıp kapattığın için 5 dakika mutelendin!`);
            }
        }
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