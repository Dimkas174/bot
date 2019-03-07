const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js');

module.exports = class DiceCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dice',
            aliases: ['кости'],
            group: 'fun',
            memberName: 'dice',
            description: 'Игра в кости.',
            examples: ['dice'],
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
                duration: 10
            },
        });
    }
    
    run(msg) {
        msg.react('🎲');
        var choices = [
            'https://i.imgur.com/5EnUvsp.png', 
            'https://i.imgur.com/9cF6W20.png',
            'https://i.imgur.com/90zcwtg.png',
            'https://i.imgur.com/jgfhaKU.png', 
            'https://i.imgur.com/gDEAiid.png',
            'https://i.imgur.com/MBtotvd.png',
        ];
        var rand = choices[Math.floor(Math.random() * choices.length)];
        var embed = new RichEmbed()
        .setColor('FF0000')
        .setThumbnail(rand)
        msg.embed(embed);
    }
};