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
        const piece = {
            old: mcache.length == 0 ? null : mcache.pop().cur,
            cur: peer
        };
        mcache.push(piece);
        this.cooldown.set(`${message.author.id}+${message.channel.id}`, mcache.filter(log => Date.now() - log.cur.dte.getTime() < 60000));
        if (piece.old) return;
        const msglogs = this.cooldown.get(`${message.author.id}+${message.channel.id}`);
        const msgLog = msglogs.map(perce => {
            return {
                isSame: perce.old.cnt === perce.cur.cnt,
                diff: require('moment')(perce.old.dte).diff(perce.cur.diff)
            }
        });
        for (let i = 0; i < msglogs.length - 1; i++) {
            const log = msgLog[msglogs.length - i];
            console.log(log)
            if (log.isSame && msgLog.filter(c => c.cur.content === message.content).length > 3) {
                client.emit("cmute", message.author.id, client.user.id, `${message.channel.name} kanalında spam.`, 10);
                message.channel.send(`<@${message.author.id}> \`[${message.author.id}]\` sus sürtük.`);
            }
            i = i + 1;

        }
    }

}
module.exports = LinkBlock;