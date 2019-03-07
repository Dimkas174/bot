const { Command } = require('discord.js-commando'),
      got = require('got'),
      { RichEmbed } = require('discord.js'),
      API_KEY = 'dc6zaTOxFJmzC';

var gif= [
    "https://netizency.files.wordpress.com/2018/01/api_giphy_logo_sparkle_clear.gif", 
    "https://cdn1.digitalartsonline.co.uk/cmsdata/slideshow/3640076/cindy-suen.gif",
    "https://media.giphy.com/media/tm521PleKwiR2/giphy.gif",
    "http://www.ryanseslow.com/wp-content/uploads/2013/07/giphy-logo-riff-21.gif",
    "https://giffiles.alphacoders.com/168/168290.gif",
    "https://payload321.cargocollective.com/1/4/140568/8734534/GIPHYTV_1280_1.gif"
];

module.exports = class EmbCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'gif',
            aliases: ['гиф'],
            group: 'search',
            memberName: 'gif',
            description: 'Поиск gif.',
            examples: ['gif <запрос>'],
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
					prompt: 'Вы должны предоставить что-то для поиска! Введите секст! \nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
					type: 'string',
					validate: text => {
						if (text.length < 2000) return true;
                        return 'Сообщение не должно превышать 2000 символов!'
					}
				}
			]
        });
    }

    async run(msg, { text }) {
        const res = await got(`http://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${encodeURIComponent(text)}`, { json: true });
    
        if (!res || !res.body || !res.body.data) {
            throw 'Не удалось найти GIF, который соответствовал бы вашему запросу!';
        }

        var tmbimg = gif[Math.floor(Math.random() * gif.length)];

        let embed = new RichEmbed()
            .setColor('RANDOM')
            .setThumbnail(tmbimg)
            .setDescription(`[По запросу gif **${text}** есть результат:](${res.body.data.image_url})`)
            .setImage(res.body.data.image_url)
            .setFooter("Запрос от " + msg.author.tag, msg.author.displayAvatarURL)
        return msg.embed(embed);
    }
};