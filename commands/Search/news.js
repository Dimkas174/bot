const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js'),
      myGoogleNews = require('my-google-news');

module.exports = class NewsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'news',
            aliases: ['новости'],
            group: 'search',
            memberName: 'news',
            description: 'Новости.',
            examples: ['news <запрос>'],
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
				            prompt: 'На какую тему вы желаете найти новости? Введите текст! \nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
                    type: 'string'
                }
			      ]
		});
	}

	async run(msg, { text }) {
            var e = new RichEmbed()
            .setTitle('Google Новости')
            .setColor(msg.guild.me.displayColor)
            .setFooter('Работает на Google News')
            .setTimestamp();
            myGoogleNews.resultsPerPage = 10;
            myGoogleNews(msg.content, (err, res) => {
                if (err) console.error(err);
                res.links.forEach(item => {
                    e.addField(item.title, item.href);
                    console.log(item.description + '\n');
                });
                msg.say({ embed: e });
            });
    }
};