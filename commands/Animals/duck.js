const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js'),
      request = require ("node-superfetch");

module.exports = class DuckCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'duck',
            aliases: ['утка'],
            group: 'animals',
            memberName: 'duck',
            description: 'Рандомное изображение утки.',
            examples: ['duck'],
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
        msg.react('🦆');

        try {
            const { body } = await request.get("https://random-d.uk/api/v1/random?type=gif");
            let linkImg = /https?:\/\/.+\.(?:png|jpg|jpeg|gif)/gi;

            if (body.url.match(linkImg)) {
                let embed = new RichEmbed()
                .setColor('RANDOM')
                .setTitle('🦆 Кря... Кря...')
                .setURL(body.url)
                .setImage(body.url)
                return msg.embed(embed);

            } else {
                return msg.say(body.url);
            }
            
        } catch(err) {
            return msg.say(err.stack);
        }                
    }
};