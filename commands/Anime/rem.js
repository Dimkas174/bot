const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js'),
      request = require('node-superfetch');

module.exports = class RemCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'rem',
            aliases: ['rem', 'рем'],
            group: 'anime',
            memberName: 'rem',
            description: 'Рандомное изображение Рем.',
            examples: ['rem'],
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
        msg.react('👌');

        try {
            const { body } = await request.get(`https://rra.ram.moe/i/r?type=rem`);
            let linkImg = /https?:\/\/.+\.(?:png|jpg|jpeg|gif)/gi;
            let img = `https://cdn.ram.moe/${body.path.replace("/i/", "")}`
            if (img.match(linkImg)) {
                let embed = new RichEmbed()
                .setColor('RANDOM')
                .setTitle("Нажмите тут если изображение не загрузилось!")
                .setURL(img)
                .setImage(img)
                return msg.embed(embed);
            } else {
                return msg.say(img);
            }
        } catch(err) {
            return msg.say(err.stack);
        }                
    }
};