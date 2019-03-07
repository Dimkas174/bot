const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js');

module.exports = class LeaveCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'leave',
            aliases: ['покинуть', 'lv', 'пока'],
            group: 'voice',
            memberName: 'leave',
            description: 'Заставляет бота покинуть голосовой канал.',
            examples: ['leave'],
            guildOnly: true,
            clientPermissions: [
                'CONNECT',
                'SPEAK',
                'ADD_REACTIONS',
                'MANAGE_MESSAGES',
                'SEND_MESSAGES',
                'EMBED_LINKS',
                'READ_MESSAGE_HISTORY'
            ],
            userPermissions: [
                'CONNECT',
                'SPEAK',
                'ADD_REACTIONS',
                'SEND_MESSAGES',
                'READ_MESSAGE_HISTORY',
                'KICK_MEMBERS'
            ],
            throttling: {
                usages: 2,
                duration: 120
            },
        });
    }
    
    run(msg) {
        msg.react('👋');
        if (msg.member.voiceChannel) {
            const embed = new RichEmbed()
            .setColor("#68ca55")
            .addField('Отлично!', "Я покидаю голосовой канал!")
            msg.member.voiceChannel.leave();
            return msg.say(embed);

        } else {
            const embed = new RichEmbed()
            .setColor("#ff0000")
            .addField('Ошибка!', "Вы должны находиться в голосовом канале, чтобы выгнать меня!")
            return msg.say(embed);
        }
    }
};