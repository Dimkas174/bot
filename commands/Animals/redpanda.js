const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js'),
      request = require ("node-superfetch");

module.exports = class RedpandaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'redpanda',
            aliases: ['краснаяпанда'],
            group: 'animals',
            memberName: 'redpanda',
            description: 'Рандомное изображение красных панд.',
            examples: ['redpanda'],
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
            const { body } = await request.get("https://animals.anidiots.guide/red_panda");
            let linkImg = /https?:\/\/.+\.(?:png|jpg|jpeg|gif)/gi;

            if (body.link.match(linkImg)) {
                let embed = new RichEmbed()
                .setColor('RANDOM')
                .setTitle("Нажмите тут если изображение не загрузилось!")
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