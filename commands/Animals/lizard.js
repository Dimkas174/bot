const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js'),
      request = require ("node-superfetch");

module.exports = class LizardCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'lizard',
            aliases: ['ящерица'],
            group: 'animals',
            memberName: 'lizard',
            description: 'Рандомное изображение ящерицы.',
            examples: ['lizard'],
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
        msg.react('🦎');

        try {
            const { body } = await request.get("https://nekos.life/api/v2/img/lizard");
            let linkImg = /https?:\/\/.+\.(?:png|jpg|jpeg|gif)/gi;

            if (body.url.match(linkImg)) {
                let embed = new RichEmbed()
                .setColor('RANDOM')
                .setTitle('🦎')
                .setURL(body.url)
                .setImage(body.url)
                return msg.embed(embed);

            } else {
                return msg.say(body.link);
            }

        } catch(err) {
            return msg.say(err.stack);
        }                
    }
};