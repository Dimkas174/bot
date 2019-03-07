const { Command } = require('discord.js-commando'),
      request = require('request');

module.exports = class WikiCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'wiki',
            group: 'search',
            aliases: ['вики', 'википедия'],
			memberName: 'wiki',
			description: 'Поиск по Википедии.',
            examples: ['wiki текст'],
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
                    key: 'text',
				    prompt: 'Что вы желаете найти на Википедии? Введите текст! \nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
                    type: 'string',
                    validate: text => {
						if (encodeURIComponent(text).length < 1950) return true;
                        return 'Недопустимый запрос, ваш запрос слишком длинный!';
                    }
                }
            ]
		});
	}
	run(msg, {text}) {
		let url = `https://ru.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(text)}&utf8=&format=json`
		request({
			url: url,
			json: true
		}, function getteamdata(error, response, body) {
			if (!error && response.statusCode === 200 && body.query.search[0]) {
				msg.say(`Результат найден: :book: ${body.query.search[0].title}. \r\nhttp://ru.wikipedia.org/?curid=${body.query.search[0].pageid}`);
			} else {
				msg.reply(`На запрос \`${text}\` нет результатов.`);
			}
		})
		return;
	}
};