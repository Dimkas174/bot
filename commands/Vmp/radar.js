const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js');

module.exports = class RadarCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'radar',
            aliases: ['радар'],
            group: 'vmp',
            memberName: 'radar',
            description: 'Карта радаров на V-MP.',
            examples: ['radar'],
            guildOnly: true,
            clientPermissions: [
                'ADD_REACTIONS',
                'MANAGE_MESSAGES',
                'SEND_MESSAGES',
                'EMBED_LINKS',
                'READ_MESSAGE_HISTORY'
            ],
            userPermissions: [
                'ADD_REACTIONS',
                'SEND_MESSAGES',
                'READ_MESSAGE_HISTORY'
            ],
            throttling: {
                usages: 2,
                duration: 30
            }
        });
    }

    async run(msg) {
        msg.react('👌');
      
        var embed = new RichEmbed()
            .setColor('#008000')
            .setDescription("**Лос Сантос. Центральная часть**")
            .setImage("https://i.imgur.com/VfvmLQh.jpg")
            msg.embed(embed) 
        
           var embed = new RichEmbed()
            .setColor('#008000')
            .setDescription("**Доки**")
            .setImage("https://i.imgur.com/I95lh04.jpg")
            msg.embed(embed) 
          
           var embed = new RichEmbed()
            .setColor('#008000')
            .setDescription("**Чумаш**")
            .setImage("https://i.imgur.com/3VAdYMh.jpg")
            .setFooter("Запрос от " + msg.author.tag, msg.author.displayAvatarURL)
            .setTimestamp()
            msg.embed(embed)
    }
};