const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js'),
      request = require('node-superfetch');

module.exports = class BirdCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'bird',
            aliases: ['птица', 'птичка'],
            group: 'animals',
            memberName: 'bird',
            description: 'Рандомное изображение птицы.',
            examples: ['bird'],
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
        msg.react('🐦');

        try {
            const { body } = await request.get("http://random.birb.pw/tweet/");
            let linkImg = /https?:\/\/.+\.(?:png|jpg|jpeg|gif)/gi;
            let img = `https://random.birb.pw/img/${body}`

            if (img.match(linkImg)) {
                let birdEmbed = new RichEmbed()
                .setColor('RANDOM')
                .setTitle('🐦 Чирик... Чирик...')
                .setURL(img)
                .setImage(img)
                return msg.embed(birdEmbed);

            } else {
                return msg.say(img);
            }
            
        } catch(err) {
            return msg.say(err.stack);
        }                
    }
};