const { Command } = require('discord.js-commando');

module.exports = class DmCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dm',
            aliases: ['copycat', 'repeat', 'echo', 'parrot', 'лс', 'дм', 'личка'],
            group: 'owner',
            memberName: 'dm',
            description: 'Отправляет сообщение пользователю, которого вы @упомянули. В целях безопасности данную команду может использовать только владелец бота',
            examples: ['dm @упоминание Привет!'],
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
                duration: 60
            },
            args: [
                {
                    key: 'user',
                    prompt: '@Упомяните того, гому отправить ЛС! \nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
                    type: 'user',
                    validate: text => {
                        if (text.length < 2000) return true;
                        return 'Это не @упоминание. Оно не должно превышать 2000 символов!'
                    }
                },
                {
                    key: 'content',
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

    hasPermission(msg) {
        return this.client.isOwner(msg.author);
    }

    run(msg, { user, content }) {
        msg.react('🎙');
        msg.delete(msg.author);
        if (msg.author.id === '230701854940463114') {
            return user.send(content);
        } else {
            return msg.say('В целях безопасности данную команду может использовать только владелец бота.');
        }
    }
};