const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js'),
      request = require ("node-superfetch");

module.exports = class OwlCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'owl',
            aliases: ['сова'],
            group: 'animals',
            memberName: 'owl',
            description: 'Рандомное изображение совы.',
            examples: ['owl'],
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
        msg.react('🦉');

        try {
            const owl = await request.get("http://pics.floofybot.moe/owl").then(r => r.body.image);
            let linkImg = /https?:\/\/.+\.(?:png|jpg|jpeg|gif)/gi;

            if (owl.match(linkImg)) {
                let embed = new RichEmbed()
                .setColor('RANDOM')
                .setTitle('🦉')
                .setURL(owl)
                .setImage(owl)
                return msg.embed(embed);

            } else {
                return msg.say(owl);
            }

        } catch(err) {
            return msg.say(err.stack);
        }                
    }
};