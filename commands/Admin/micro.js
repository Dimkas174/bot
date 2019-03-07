const { Command } = require('discord.js-commando');

module.exports = class MicroCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'micro',
            aliases: ['микро'],
            group: 'admin',
            memberName: 'micro',
            description: 'Бот повторит текст в канал который вы указали.',
            examples: ['micro <имя_канала> <Привет!> (без <>)'],
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
					        key: 'channell',
					        prompt: 'Введите назкание канала! \nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
					        type: 'string',
					        validate: text => {
						      if (text.length < 2000) return true;
                        return 'Сообщение не должно превышать 2000 символов!'
					       }
				       },
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

    run(msg, { channell, text }) {
        msg.react('📣');

        setTimeout(() => msg.delete(), 1000);

        return this.client.channels.find(c => c.id === channell).send(text);
    }
};