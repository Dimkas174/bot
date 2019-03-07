const { Command } = require('discord.js-commando'),
      request = require ("node-superfetch"),
      { RichEmbed } = require('discord.js');

module.exports = class CatCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'cat',
            aliases: ['кот', 'кошка', 'кошки'],
            group: 'animals',
            memberName: 'cat',
            description: 'Рандомное изображение кошки.',
            examples: ['cat'],
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
        msg.react('🐱');

        try {
            const { body } = await request.get('https://aws.random.cat/meow');
            const img = body.file.replace(/\\/gi, "");
            let linkImg = /https?:\/\/.+\.(?:png|jpg|jpeg|gif)/gi;
            if (img.match(linkImg)) {
              let catEmbed = new RichEmbed()
              .setColor('RANDOM')
              .setTitle('🐱 Мяяяууу!')
              .setURL(img)
              .setImage(img)
              return msg.embed(catEmbed);
            } else {
                return msg.say(img);
            }
        } catch(err) {
            return msg.say(err.stack);
        }               
    }
};