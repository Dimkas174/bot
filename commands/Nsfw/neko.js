const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js'),
      request = require('node-superfetch');

module.exports = class NekoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'neko',
            aliases: ['неко'],
            group: 'nsfw',
            memberName: 'neko',
            description: 'Рандомное аниме изображение. (18+)',
            examples: ['neko'],
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
        const { body } = await request.get(`https://nekos.life/api${msg.channel.nsfw === true ? "/lewd" : ""}/neko`);
        let linkImg = /https?:\/\/.+\.(?:png|jpg|jpeg|gif)/gi;
        if (body.neko.match(linkImg)) {
            let embed = new RichEmbed()
                .setColor('RANDOM')
                .setTitle("🔞 | NSFW КОНТЕНТ | 🔞 ")
                .setURL(body.neko)
                .setImage(body.neko)
            return msg.embed(embed);
        } else {
            return msg.say(body.neko);
        }
    }
};