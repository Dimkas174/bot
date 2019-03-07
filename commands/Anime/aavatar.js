const { Command } = require('discord.js-commando'),
      { Attachment } = require('discord.js'),
      request = require('node-superfetch');

module.exports = class AavatarCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'aavatar',
            aliases: ['animea', 'aava', 'анимеа', 'аниме ава'],
            group: 'anime',
            memberName: 'aavatar',
            description: 'Рандомная аниме аватарка.',
            examples: ['aavatar'],
            guildOnly: true,
            clientPermissions: [
                'ADD_REACTIONS',
                'MANAGE_MESSAGES',
                'SEND_MESSAGES',
                'ATTACH_FILES',
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
        msg.react('🖼');

        try {
            const { body } = await request.get(`https://nekos.life/api/v2/img/${msg.channel.nsfw ||msg.channel.name.startsWith("nsfw-") || msg.channel.name.startsWith("nsfw_") ? "nsfw_" : ""}avatar`);
            let linkImg = /https?:\/\/.+\.(?:png|jpg|jpeg|gif)/gi;
            if (body.url.match(linkImg)) {
                const attachment = new Attachment(body.url, 'catify.png');
                return msg.say(attachment);
            } else {
                return msg.say(body.url);
            }
        } catch(err) {
            return msg.say(err.stack);
        }                
    }
};