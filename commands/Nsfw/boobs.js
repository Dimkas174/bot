const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js');

module.exports = class BoobsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'boobs',
            aliases: ['груди', 'титьки', 'буфера'],
            group: 'nsfw',
            memberName: 'boobs',
            description: 'Рандомное груди. (18+)',
            examples: ['boobs'],
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

        if (!msg.channel.nsfw) return msg.say("🔞" + " Эту команду нельзя использовать в канале с отсутствующей настройкой NSFW.");  
        var max = 12119;
        var min = 10000;
        var MathRan = Math.floor(Math.random() * (max - min + 0)) + min;
        var MathLoL = Math.round(MathRan);
        const boobslink = `http://media.oboobs.ru/boobs_preview/${MathLoL}.jpg`
        let linkImg = /https?:\/\/.+\.(?:png|jpg|jpeg|gif)/gi;
        if (boobslink.match(linkImg)) {
            let embed = new RichEmbed()
                .setColor('RANDOM')
                .setTitle("🔞 | NSFW КОНТЕНТ | 🔞 ")
                .setURL(boobslink)
                .setImage(boobslink)
            return msg.embed(embed);
        } else {
            return msg.say(boobslink);
        }
    }
};