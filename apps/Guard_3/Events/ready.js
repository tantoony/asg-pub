const { ClientEvent } = require('../../../base/utils');
const { CronJob } = require('cron');

class ControlBan extends ClientEvent {
    constructor(client) {
        super(client, {
            name: "_ready"
        });
        this.client = client;
    }

    async run(client) {
        client = this.client;
        const Banneds = new Map();
        async function revoke(params) {
            const now = new Date();
            let asd = await this.client.models.penalties.find({ until: { $ne: null } });
            asd.filter((ban) => ban.until.getTime() < new Date().getTime() + 1000 * 60 * 60).forEach(async (ban) => {
                if (now.getTime() < ban.until.getTime()) {
                    switch (ban.typeOf) {
                        case "BAN":
                            await this.client.guild.members.unban(ban.userId);
                            break;

                        case "CMUTE":
                            if (this.client.guild.members.cache.get(ban.userId)) await this.client.guild.members.members.cache.get(ban.userId).roles.remove(this.data.roles["muted"]);
                            break;

                        case "JAIL":
                            await this.client.guild.members.cache.get(ban.userId).roles.add(ban.roles.map(rname => this.client.guild.roles.cache.find(role => role.name === rname) || this.data["member"]));
                            await this.client.guild.members.cache.get(ban.userId).roles.remove(this.data["prisoner"]);

                            break;

                        case "VMUTE":
                            if (this.client.guild.members.cache.get(doc.userId) && this.client.guild.members.cache.get(doc.userId).voice.channel) await this.client.guild.members.cache.get(doc.userId).voice.setMute(false);
                            break;

                        default:
                            break;
                    }
                } else if (!Banneds.has(ban._id.toString())) Banneds.set(ban._id.toString(), {
                    id: ban._id,
                    ms: (d) => ban.until.getTime() - d.getTime()
                });
            });
            
        }

        async function reload(params) {
            const now = new Date();
            let asd = await this.client.models.penalties.find({ until: { $ne: null } });
            
        }

        const mapcron = new CronJob('*/1 * * * * *', async () => {
            const now = new Date();
            let asd = await this.client.models.penalties.find({ until: { $ne: null } });
            asd.filter((ban) => ban.until.getTime() < new Date().getTime() + 1000 * 60 * 60).forEach(async (ban) => {
                if (now.getTime() < ban.until.getTime()) {
                    switch (ban.typeOf) {
                        case "BAN":
                            await this.client.guild.members.unban(ban.userId);
                            break;

                        case "CMUTE":
                            if (this.client.guild.members.cache.get(ban.userId)) await this.client.guild.members.members.cache.get(ban.userId).roles.remove(this.data.roles["muted"]);
                            break;

                        case "JAIL":
                            await this.client.guild.members.cache.get(ban.userId).roles.add(ban.roles.map(rname => this.client.guild.roles.cache.find(role => role.name === rname) || this.data["member"]));
                            await this.client.guild.members.cache.get(ban.userId).roles.remove(this.data["prisoner"]);

                            break;

                        case "VMUTE":
                            if (this.client.guild.members.cache.get(doc.userId) && this.client.guild.members.cache.get(doc.userId).voice.channel) await this.client.guild.members.cache.get(doc.userId).voice.setMute(false);
                            break;

                        default:
                            break;
                    }
                } else if (!Banneds.has(ban._id.toString())) Banneds.set(ban._id.toString(), {
                    id: ban._id,
                    ms: (d) => ban.until.getTime() - d.getTime()
                });
            });
        });
        mapcron.start();
        const checkbans = new CronJob('* * * * * *', () => {
            let date = new Date();
            Banneds.forEach((ban) => {
                setTimeout(async () => {
                    switch (ban.typeOf) {
                        case "BAN":
                            await this.client.guild.members.unban(ban.userId);
                            break;

                        case "CMUTE":
                            if (this.client.guild.members.cache.get(ban.userId)) await this.client.guild.members.members.cache.get(ban.userId).roles.remove(this.data.roles["muted"]);
                            break;

                        case "JAIL":
                            await this.client.guild.members.cache.get(ban.userId).roles.add(ban.roles.map(rname => this.client.guild.roles.cache.find(role => role.name === rname) || this.data["member"]));
                            await this.client.guild.members.cache.get(ban.userId).roles.remove(this.data["prisoner"]);
                            break;

                        case "VMUTE":
                            if (this.client.guild.members.cache.get(doc.userId) && this.client.guild.members.cache.get(doc.userId).voice.channel) await this.client.guild.members.cache.get(doc.userId).voice.setMute(false);
                            break;

                        default:
                            break;
                    }
                    Banneds.delete(ban.id);
                }, ban.ms(date));
            });
        });
        checkbans.start();


    }
}
module.exports = ControlBan