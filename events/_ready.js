const { ClientEvent } = require('../base/utils');
const { createCanvas, loadImage } = require('canvas');
class Ready extends ClientEvent {
    constructor(client) {
        super(client, {
            name: "ready"
        });
        this.client = client;
    }

    async run(client) {
        client = this.client;
        this.client.guild = client.guilds.cache.get(client.config.server);
        this.client.owner = client.users.cache.get(client.config.owner);
        this.client.canvas = createCanvas(960, 540, "svg");
        client.log(`${client.user.tag}, ${client.users.cache.size} kişi için hizmet vermeye hazır!`, "ready");
        client.user.setPresence({ activities: client.config.status, status: "idle" });
        require('chart.js').Chart.getChart("0").destroy();
        if (this.data && this.data.channels["lastCrush"]) {
            await client.channels.cache.get(this.data.channels["lastCrush"]).send("**TEKRAR ONLINE!**");
        }
        client.handler.hello(this.client);
    }
}
module.exports = Ready;
