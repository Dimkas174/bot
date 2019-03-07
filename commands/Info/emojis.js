const { Command } = require('discord.js-commando');

module.exports = class EmojisCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'emojis',
            aliases: ['эмоции', 'смайлики'],
            group: 'info',
            memberName: 'emojis',
            description: 'Показывает emojis данного сервера.',
            examples: ['emojis'],
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
        msg.react('👌');
        
        let emojis;
        if (msg.guild.emojis.size === 0) emojis = 'На этом сервере нет emojis!';
        else emojis = `**Emoji сервера:**\n${msg.guild.emojis.map(e => e).join(' ')}`;
        msg.say(emojis);
    }
};