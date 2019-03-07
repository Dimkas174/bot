const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js'),
      request = require ("node-superfetch");

module.exports = class DogCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dog',
            aliases: ['пёс', 'собака', 'пёсик'],
            group: 'animals',
            memberName: 'dog',
            description: 'Рандомное изображение собаки.',
            examples: ['dog'],
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
        msg.react('🐶');

        try {
            let{body} = await request
            .get(`https://random.dog/woof.json`);
            let linkImg = /https?:\/\/.+\.(?:png|jpg|jpeg|gif)/gi;

            if (body.url.match(linkImg)) {
                let dogEmbed = new RichEmbed()
                .setColor('RANDOM')
                .setTitle('🐶 Гав!')
                .setURL(body.url)
                .setImage(body.url)
                return msg.embed(dogEmbed);

            } else {
                return msg.say(body.url);
            }

        } catch(err) {
            return msg.say(err.stack);
        }                
    }
};