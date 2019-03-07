const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js');

module.exports = class CoinCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'coin',
            aliases: ['монетка'],
            group: 'random',
            memberName: 'coin',
            description: 'Игра: орёл или решка.',
            examples: ['coin'],
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
                duration: 20
            },
        });
    }
    
    run(msg) {
        msg.react('🎰');
        var choices = [
            'https://imgur.com/IyogFY4.png',
            'https://imgur.com/U5cZe7R.png'
        ];
        var rand = choices[Math.floor(Math.random() * choices.length)];
        var embed = new RichEmbed()
        .setColor('0xFFD700')
        .setThumbnail(rand)
        msg.embed(embed);
    }
};