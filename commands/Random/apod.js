const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js'),
      request = require('node-superfetch'),
      { GOV_KEY } = process.env;

module.exports = class ApodCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'apod',
            aliases: ['астрономия'],
            group: 'random',
            memberName: 'apod',
            description: 'Астрономическое изображение на сегодняшний день.',
            examples: ['photo'],
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
        });
    }

    async run(msg) {
        msg.react('🌌');

      try {
            const { body } = await request
				     .get('https://api.nasa.gov/planetary/apod')
				.    query({ api_key: GOV_KEY });
            let linkImg = /https?:\/\/.+\.(?:png|jpg|jpeg|gif)/gi;
            let link = /https?:\/\/.+\.(?:png|jpg|jpeg|gif)[a-zA-Z0-9.%-]{2,}/gi;
            if (body.url.match(link)) {
                return msg.say(body.url);
            } else if (body.url.match(linkImg)) {
                let dogEmbed = new RichEmbed()
                .setAuthor('Астрономическое изображение на сегодняшний день', 'https://i.imgur.com/iMNSKz6.png')
                .setTitle(body.title)
                .setThumbnail('https://i.imgur.com/iMNSKz6.png')
                .setURL(`http://apod.nasa.gov/`)
                .setColor('#033B92')
                .setImage(body.url)
                .setFooter(`Работает благодаря NASA • Изображение от ${body.copyright}`)
                return msg.embed(dogEmbed);
            } else {
              if (body.url.match(/\/embed\//gi)) {
                const text = body.url.replace(/\/embed\//gi, "/watch?v=");
                const texta = text.replace(/\?rel=0/gi, "");
                return msg.say(texta);
              } else {
                return msg.say(body.url);
              }
            }
        } catch(err) {
            return msg.say(err.stack);
        }  
    }
};