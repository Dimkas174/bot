const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js'),
      request = require ("node-superfetch");

module.exports = class BunnyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'bunny',
            aliases: ['кролик'],
            group: 'animals',
            memberName: 'bunny',
            description: 'Рандомное изображение кролика.',
            examples: ['bunny'],
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

    async run(msg) {
        msg.react('🐇');

        try {
            const { body } = await request.get("https://api.bunnies.io/v2/loop/random/?media=gif,png");
            let linkImg = /https?:\/\/.+\.(?:png|jpg|jpeg|gif)/gi;
            if (body.media.gif.match(linkImg)) {
                let embed = new RichEmbed()
                .setColor('RANDOM')
                .setTitle('🐇')
                .setURL(body.media.gif)
                .setImage(body.media.gif)
                return msg.embed(embed);
            } else {
                return msg.say(body.media.gif);
            }
        } catch(err) {
            return msg.say(err.stack);
        }                
    }
};