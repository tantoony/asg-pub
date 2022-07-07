const { Discord, createMessageComponentCollector, MessageActionRow, MessageSelectMenu  } = require("discord.js");
const { intersection } = require("lodash");

class KB extends Command {
    constructor(client) {
        super(client, {
            name: "kb",
            description: "kullanıcı bilgisini gösterir",
            usage: "kb etiket/id",
            examples: ["kb 711897884391637062"],
            cooldown: 10000
        });
    };
    async run(client, message, args, data) {
        client = this.client;
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!member) return message.replt({content: `bir kullanıcı belirtmelisiniz!`})
        const kbpanel = new MessageActionRow().addComponents(new MessageSelectMenu().setPlaceholder('Kullanıcı panel').setCustomId('kbpanel').addOptions([{ label:"",value:""}, { label: "", value:""}, ]));
        const message = await message.reply({content:`${member} üyesine bir aşağıdaki menüden yapmak istediğiniz işlemi seçin!`,components: [kbpanel]});
        const ktria = await message.createMessageComponentCollector({ componentType: 'SELECT_MENU', filter: (ktria) => ktria.user.id === message.author.id, time: 50000,});
        ktria.on('collect', async (interaction) => {
            
            if (interaction.values[0] == "") {


              //doldur
                
                
                }});
                
                
                if (interaction.values[0] == "") {


                    //doldur
                      
                      
                      }}};
   
module.exports = KB;