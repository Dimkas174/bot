const { Command } = require('discord.js-commando'),
      ascii = require('ascii-art');

module.exports = class AsciiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ascii',
            aliases: ['asc'],
            group: 'textedit',
            memberName: 'ascii',
            description: 'Преобразование текста.',
            examples: ['ascii <текст> (без <>)'],
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
                    key: 'query',
                    prompt: 'Введите текст! (только на англ. языке) \nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
                    type: 'string'
                }
            ]
        });
    }

    run(msg, { query }) {
        ascii.font(query, 'Doom', function(rendered) {
            rendered = rendered.trimRight();
    
            msg.say(`\`\`\`md\r\n${rendered}\r\n\`\`\``);
        });
    }
};