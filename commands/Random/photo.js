const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js'),
      request = require('node-superfetch');

module.exports = class PhotoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'photo',
            aliases: ['фото'],
            group: 'random',
            memberName: 'photo',
            description: 'Рандомное изображение.',
            examples: ['photo'],
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
        msg.react('🖼');

        try {
            let{body} = await request
            .get(`http://www.splashbase.co/api/v1/images/random`);
            let linkImg = /https?:\/\/.+\.(?:png|jpg|jpeg|gif)/gi;
            let link = /https?:\/\/.+\.(?:png|jpg|jpeg|gif)[a-zA-Z0-9.%-]{2,}/gi;
            if (body.url.match(link)) {
                return msg.say(body.url);
            } else if (body.url.match(linkImg)) {
                let dogEmbed = new RichEmbed()
                .setColor('RANDOM')
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