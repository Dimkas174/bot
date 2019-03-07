const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js'),
      request = require('node-superfetch');

module.exports = class RanimeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ranime',
            aliases: ['раниме', 'anime', 'аниме'],
            group: 'anime',
            memberName: 'ranime',
            description: 'Рандомное изображение аниме.',
            examples: ['ranime'],
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
        msg.react('㊙');

        let res = await request.get('http://api.cutegirls.moe/json');
        if (res.body.status !== 200) {
            return msg.say('Произошла ошибка при обработке этой команды!');
            }
            let animepicembed = new RichEmbed()
            .setColor('RANDOM')
            .setImage(res.body.data.image);
    
            msg.embed(animepicembed);           
    }
};