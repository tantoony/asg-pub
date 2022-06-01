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
        let mcache = this.cooldown.get(`${message.author.id}+${message.channel.id}`) || [];
        const peer = {
            cnt: message.content,
            dte: new Date()
        };
        mcache.push(peer);
        this.cooldown.set(`${message.author.id}+${message.channel.id}`, mcache.filter(log => log.cnt === message.content && Date.now() - log.dte.getTime() < 5000));
        const msglogs = this.cooldown.get(`${message.author.id}+${message.channel.id}`);
        if (msglogs > 3) {
            client.emit("cmute", message.author.id, client.user.id, `${message.channel.name} kanalında spam.`, 10);
            message.channel.send(`<@${message.author.id}> \`[${message.author.id}]\` sus sürtük.`);
        }
    }

}
module.exports = LinkBlock;