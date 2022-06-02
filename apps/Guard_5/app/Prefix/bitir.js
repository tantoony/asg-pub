const { PrefixCommand } = require("../../../../base/utils");
const Discord = require('discord.js');
const { stripIndents } = require("common-tags");
class Panel extends PrefixCommand {

    constructor(client) {
        super(client, {
            name: "dns",
            description: "sunucunun linkini gönderir",
            usage: "link",
            examples: ["link"],
            cooldown: 300000,
            ownerOnly: true
        });
    }

    async run(client, message, args, data) {

    }

}

module.exports = Panel;