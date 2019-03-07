const { Command } = require('discord.js-commando'),
      got = require('got'),
      cheerio = require('cheerio');

function getText(children) {
    if (children.children) return getText(children.children);
    return children.map(c => {
        return c.children ? getText(c.children) : c.data;
    }).join('');
}

module.exports = class GoogleCommand extends Command {
	  constructor(client) {
		   super(client, {
			      name: 'google',
            group: 'search',
            aliases: ['гугл'],
			      memberName: 'google',
			      description: 'Поиск.',
            examples: ['google текст'],
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
                    type: 'string'
                }
            ]
		   });
    }
    async run(msg, {text}) {

        const res = await got(`https://www.google.com/search?q=${encodeURIComponent(text)}`);
        if (res.statusCode !== 200) {
            return msg.edit(`:no_entry_sign: Ошибка! (${res.statusCode}): ${res.statusMessage}`);
        }

        let $ = cheerio.load(res.body);
        let results = [];

        $('.g').each((i) => {
            results[i] = {};
        });

        $('.g>.r>a').each((i, e) => {
            let raw = e.attribs['href'];
            results[i]['link'] = decodeURIComponent(raw.substr(7, raw.indexOf('&sa=U') - 7));
        });

        $('.g>.s>.st').each((i, e) => {
            results[i]['description'] = getText(e);
        });

        let output = results.filter(r => r.link && r.description)
        .slice(0, 5)
        .map(r => `${r.link}\n\t${r.description}\n`)
        .join('\n');

        msg.say(`**Результаты поиска для \`"${text}"\`:** \r\n${output}`)
	  }
};