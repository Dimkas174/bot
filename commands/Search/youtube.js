const { Command } = require('discord.js-commando'),
      search = require('youtube-search')

module.exports = class YtsearchCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'youtube',
            aliases: ['yts', 'ютуб'],
            group: 'search',
            memberName: 'youtube',
            description: 'Поиск через YouTube.',
            examples: ['ytsearch <название> (без <>)'],
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
                    prompt: 'Вы не предоставили какое видео неободимо найти! Введите название видео! \nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
                    type: 'string',
                    validate: query => {
                        if (query.length < 2000) return true;
                        return 'Сообщение не должно превышать 2000 символов!'
                    }
                }
            ]
        });
    }

    async run(msg, { query }) {
        msg.react('👌');

        search(query, {
            maxResults: 1,
            key: process.env.GOOGLE_KEY
        }, (err, res) => {
            if (err) return msg.say("**Нет результатов!**")
            if (!res[0]) return msg.say("**Нет результатов!**")

            msg.say(res[0].link)
        })
     }
};