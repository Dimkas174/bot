const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js'),
      randomPuppy = require('random-puppy');

module.exports = class NsfwCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'nsfw',
            aliases: ['нсфв'],
            group: 'nsfw',
            memberName: 'nsfw',
            description: 'Рандомное nsfw изображение. (18+)',
            examples: ['nsfw'],
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
            'NSFW_Wallpapers',
            'SexyWallpapers',
            'HighResNSFW',
            'nsfw_hd',
            'UHDnsfw',

            "NSFW_GIF",
            "nsfw_gifs",
            "porninfifteenseconds",
            "60FPSPorn",
            "porn_gifs",
            "nsfw_Best_Porn_Gif",
            "LipsThatGrip",
            "adultgifs",

            'naughtyinpublic',
            'gwpublic',
            'exposedinpublic',
            'beachgirls',

            'NSFW_Snapchat',
            'snapchatgw',

            'MilitaryGoneWild',
            'sexyuniforms'
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