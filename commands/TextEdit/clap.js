const { Command } = require('discord.js-commando');

module.exports = class ClapCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'clap',
            aliases: ['хлоп', 'хлопок', 'хлопки'],
            group: 'textedit',
            memberName: 'clap',
            description: 'Помещает 👏 в 👏 тексте.',
            examples: ['clap <текст>'],
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
            args: [
                {
                    key: 'text',
                    prompt: 'Предоставте текст! \nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
                    type: 'string',
                    validate: text => {
                        if (text.replace(/ /g, ' 👏 ').length < 2000) return true;
                        return 'Сообщение не должно превышать 2000 символов!'
                    }
                }
            ]
        });
    }

    run(msg, { text }) {
        setTimeout(() => msg.delete(), 1000);
		return msg.say(text.replace(/ /g, ' 👏 '));
    }
};