const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js'),
      randomPuppy = require('random-puppy');

module.exports = class PussyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pussy',
            aliases: ['киска', 'вагина', 'влагалище'],
            group: 'nsfw',
            memberName: 'pussy',
            description: 'Рандомное изображение киски. (18+)',
            examples: ['pussy'],
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
        var subreddits = [
            'pussy',
            'rearpussy',
            'simps',
            'vagina',
            'MoundofVenus',
            'PerfectPussies',
            'spreading'
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
        })
    }
};