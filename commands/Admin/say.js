const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'say',
            aliases: ['повтор', 'повтори'],
            group: 'admin',
            memberName: 'say',
            description: 'Бот повторит текст. В целях безопасности данную команду может использовать только пользователи с правами администратора.',
            examples: ['say <Привет!>'],
            guildOnly: true,
            clientPermissions: [
                'ADD_REACTIONS',
                'MANAGE_MESSAGES',
                'SEND_MESSAGES',
                'READ_MESSAGE_HISTORY'
            ],
            userPermissions: [
                'ADMINISTRATOR',
                'ADD_REACTIONS',
                'SEND_MESSAGES',
                'READ_MESSAGE_HISTORY'
            ],
            throttling: {
                usages: 2,
                duration: 60
            },
            args: [
				{
					key: 'text',
					prompt: 'Введите текст для отправки! \nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
					type: 'string',
					validate: text => {
						if (text.length < 2000) return true;
                        return 'Сообщение не должно превышать 2000 символов!'
					}
				}
			]
        });
    }

    run(msg, { text }) {
        msg.react('📣');
        setTimeout(() => msg.delete(), 1000);
        return msg.say(text)
    }
};