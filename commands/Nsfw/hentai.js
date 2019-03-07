const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js'),
      randomPuppy = require('random-puppy');

module.exports = class HentaiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hentai',
            aliases: ['хентай'],
            group: 'nsfw',
            memberName: 'hentai',
            description: 'Рандомное hentai изображение. (18+)',
            examples: ['hentai'],
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

    run(msg) {
        msg.react('👀');
      
        if (msg.guild.id === '419462029208977409') return;

        if (!msg.channel.nsfw) return msg.say("🔞" + " Эту команду нельзя использовать в канале с отсутствующей настройкой NSFW.");  
        var subreddits = [
            'HENTAI_GIF',
            'hentai_irl'
        ]
        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
        randomPuppy(sub).then(url => {
            let linkImg = /https?:\/\/.+\.(?:png|jpg|jpeg|gif)/gi;
            if (url.match(linkImg)) {
                let embed = new RichEmbed()
                .setColor('RANDOM')
                .setTitle("🔞 | NSFW КОНТЕНТ | 🔞 ")
                .setURL(url)
                .setImage(url)
                return msg.embed(embed);
            } else {
                return msg.say(url);
            }
        });
    }
};