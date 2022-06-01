const { ClientEvent } = require('../../../base/utils');

class LinkBlock extends ClientEvent {
    constructor(client) {
        super(client, {
            name: "messageCreate"
        });
        this.client = client;
    }
    async run(message) {
        const client = this.client;
        if (message.guild && (message.guild.id !== client.config.server)) return;
        let mcache = this.cooldown.get(`${message.author.id}+${message.channel.id}`);
        if (!mcache) mcache = [];
        const peer = {
            cnt: message.content,
            dte: new Date()
        };
        mcache.push(peer);
        this.cooldown.set(`${message.author.id}+${message.channel.id}`, mcache.filter(log => require('moment')(log.dte).add(1, "hour").toDate().getTime() > new Date().getTime()));
        const msglogs = this.cooldown.get(`${message.author.id}+${message.channel.id}`);
        if (msglogs.filter(m => m.cnt === message.content).length > 3) {
            client.emit("cmute", message.author.id, client.user.id, `${message.channel.name} kanalında spam.`, 10);
            message.channel.send(`<@${message.author.id}> \`[${message.author.id}]\` sus sürtük.`);
            this.cooldown.set(`${message.author.id}+${message.channel.id}`, []);
        }
    }

}
module.exports = LinkBlock;