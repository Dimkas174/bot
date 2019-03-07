const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js'),
      request = require ("node-superfetch");

module.exports = class FoxCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'fox',
            aliases: ['лиса', 'лис'],
            group: 'animals',
            memberName: 'animals',
            description: 'Рандомное изображение лисы.',
            examples: ['fox'],
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
        msg.react('🦊');
      
       try {
            const { body } = await request.get("https://randomfox.ca/floof/");
            let linkImg = /https?:\/\/.+\.(?:png|jpg|jpeg|gif)/gi;

            if (body.image.match(linkImg)) {
                let embed = new RichEmbed()
                .setColor('RANDOM')
                .setTitle('🦊')
                .setURL(body.link)
                .setImage(body.image)
                return msg.embed(embed);

            } else {
                return msg.say(body.image);
            }

        } catch(err) {
            return msg.say(err.stack);
        }                     
    }
};