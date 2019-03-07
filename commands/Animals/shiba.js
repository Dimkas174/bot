const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js'),
      request = require ("node-superfetch");

module.exports = class ShibaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'shiba',
            aliases: ['сиба', 'шиба'],
            group: 'animals',
            memberName: 'shiba',
            description: 'Рандомное изображение собаки породы Сиба-ину.',
            examples: ['shiba'],
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

        try {
            const { body } = await request.get("http://shibe.online/api/shibes");
            let linkImg = /https?:\/\/.+\.(?:png|jpg|jpeg|gif)/gi;

            if (body[0].match(linkImg)) {
                let embed = new RichEmbed()
                .setColor('RANDOM')
                .setTitle("🐕")
                .setURL(body[0])
                .setImage(body[0])
                return msg.embed(embed);

            } else {
                return msg.say(body[0]);
            }

        } catch(err) {
            return msg.say(err.stack);
        }                
    }
};