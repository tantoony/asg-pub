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
        let uCooldown = this.cooldown.get(cur.member.user.id);
        if (!uCooldown) this.cooldown.set(cur.member.user.id, []);
        uCooldown = this.cooldown.get(cur.member.user.id);
        uCooldown.push({
            channel: cur.channel.id,
            date: new Date()
        })
        this.client.cooldown.set(cur.member.user.id, uCooldown);
        uCooldown = this.client.cooldown.get(cur.member.user.id);
        let uCount = uCooldown.filter(d => d.channel === cur.channel.id && new Date().getTime() - d.date.getTime() < 1000);
        if (!uCooldown) this.cooldown.set(cur.member.user.id, uCount);
        const count = uCount.length;
        if (count === 3) await cur.guild.channels.cache.get(this.data.channels["chat"]).send(`<@${cur.member.user.id}> Mikrofonun açıp kapamaya devam edersen sesli kanallardan susturulacaksın.`);
        if (count === 5) {
            client.emit("vmute", cur.member.user.id, this.client.user.id, "MIC-BUG", 5);
            await cur.guild.channels.cache.get(this.data.channels["chat"]).send(`<@${cur.member.user.id}> Mikrofonunu çok fazla açıp kapattığın için 5 dakika mutelendin!`);
        }

    }
}
module.exports = MicBug;