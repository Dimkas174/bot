const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js'),
      request = require ("node-superfetch");

module.exports = class PenguinCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'penguin',
            aliases: ['пенгвина'],
            group: 'animals',
            memberName: 'penguin',
            description: 'Рандомное изображение пенгвина.',
            examples: ['penguin'],
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
        msg.react('🐧');

        try {
            const { body } = await request.get("https://animals.anidiots.guide/penguin");
            let linkImg = /https?:\/\/.+\.(?:png|jpg|jpeg|gif)/gi;

            if (body.link.match(linkImg)) {
                let embed = new RichEmbed()
                .setColor('RANDOM')
                .setTitle('🐧')
                .setURL(body.link)
                .setImage(body.link)
                return msg.embed(embed);

            } else {
                return msg.say(body.link);
            }

        } catch(err) {
            return msg.say(err.stack);
        }                
    }
};