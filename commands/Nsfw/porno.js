const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js'),
      fetch = require('node-fetch'),
      querystring = require('querystring');

module.exports = class PornoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'porno',
            aliases: ['порно'],
            group: 'nsfw',
            memberName: 'porno',
            description: 'Рандомное порно по вашему запросу. (18+)',
            examples: ['porno <текст> (без <>)'],
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
                 key: 'porn',
                 prompt: 'Введите то, что вы желаете найти? \nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
                 type: 'string'
              }
            ]
        });
    }

    async run (msg, {porn}) {
      
      if (msg.guild.id === '419462029208977409') return;

      if (!msg.channel.nsfw) return msg.say("🔞" + " Эту команду нельзя использовать в канале с отсутствующей настройкой NSFW.");
      
      try {
        const pornEmbed = new RichEmbed(),
        res = await fetch(`https://www.pornhub.com/webmasters/search?${querystring.stringify({search: porn})}`),
        vid = await res.json(),
        vidRandom = Math.floor(Math.random() * vid.videos.length);

        pornEmbed.setURL(vid.videos[vidRandom].url)
        pornEmbed.setTitle(`🔞 | NSFW КОНТЕНТ | 🔞 \n${vid.videos[vidRandom].title}`)
        pornEmbed.setImage(vid.videos[vidRandom].default_thumb)
        pornEmbed.setColor('RANDOM')
        pornEmbed.addField('Ссылка на видео', `[Клик](${vid.videos[vidRandom].url})`, true)
        pornEmbed.addField('Подолжительность', `${vid.videos[vidRandom].duration} минут`, true);
        return msg.embed(pornEmbed);
    
      } catch (err) {
        return msg.reply(`Ничего не найдено для \`${porn}\``);
      }
   }
};