const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js'),
      booru = require('booru');

module.exports = class E621Command extends Command {
    constructor(client) {
        super(client, {
            name: 'e621',
            aliases: ['eee', 'еее'],
            group: 'nsfw',
            memberName: 'e621',
            description: 'Рандомное e621 изображение. (18+)',
            examples: ['e621'],
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
        msg.react('👀');
      
        if (msg.guild.id === '419462029208977409') return;

        if (!msg.channel.nsfw) return msg.say("🔞" + " Эту команду нельзя использовать в канале с отсутствующей настройкой NSFW.");  
        
        try {
          
          var subreddits = [
            'nsfw',
            'sexy',
            'porn',
            'lips',
            'adult',
            'anus',
            'blush',
            'balls',
            'bestiality',
            'penis',
            'big_breasts',
            'breasts',
            'alternate_species',
            'animal_genitalia',
            'animal_penis',
            'bed',
            'bedroom',
            'pussy',
            'vagina',
            'domination'
        ]
        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

          const search = await booru.search('e621', sub, {
            limit: 1,
            random: true
          }),
          common = await booru.commonfy(search),
            
          embed = new RichEmbed(),
          imageTags = [];

          for (const tag in common[0].common.tags) {
            imageTags.push(`#${common[0].common.tags[tag]}`);
          }
          
          embed.setTitle(`🔞 | NSFW КОНТЕНТ | 🔞`)
          embed.setURL(common[0].common.file_url)
          embed.setColor('RANDOM')
          embed.setDescription(`${imageTags.slice(0, 5).join(' ')}`)
          embed.setImage(common[0].common.file_url);

          return msg.embed(embed);
          
        } catch(err) {
          return console.log(err.stack);
       }   
    }
};