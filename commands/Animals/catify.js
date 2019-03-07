const { Command } = require('discord.js-commando'),
      request = require ("request"),
      { Attachment } = require('discord.js');

module.exports = class CatifyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'catify',
            aliases: ['котик', 'котёнок', 'котята', 'киса'],
            group: 'animals',
            memberName: 'catify',
            description: 'Рандомное изображение нарисованного котёнка по предосталенному тексту.',
            examples: ['catify <любой текст> (без <>)'],
            guildOnly: true,
            clientPermissions: [
                'ADD_REACTIONS',
                'MANAGE_MESSAGES',
                'SEND_MESSAGES',
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
            args: [
                {
                    key: 'text',
                    prompt: 'Введите любой текст! \nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
                    type: 'string',
                    validate: text => {
                        if (text.length < 20) return true;
                        return 'Слишком длинное сообщение!'
                    }
                }
            ]
        });
    }

    async run(msg, { text }) {
        msg.react('🐱');

        let options = {
            url: `https://robohash.org/${encodeURIComponent(text)}?set=set4`,
            encoding: null
        };
        let response = await request(options);
   
        const attachment = new Attachment(response, 'catify.png');
        return msg.say(attachment);                
    }
};