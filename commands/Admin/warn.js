const { Command } = require('discord.js-commando');

module.exports = class WarnCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'warn',
            aliases: ['варн'],
            group: 'admin',
            memberName: 'warn',
            description: 'Выдаёт варн @упомянутому участнику. Команда создана только для сервера "Барахолка".',
            examples: ['warn <@упоминание пользователя> <причина> (без <>)'],
            guildOnly: true,
            clientPermissions: [
                'ADD_REACTIONS',
                'MANAGE_MESSAGES',
                'SEND_MESSAGES',
                'READ_MESSAGE_HISTORY',
                'KICK_MEMBERS'
            ],
            userPermissions: [
                'ADD_REACTIONS',
                'SEND_MESSAGES',
                'READ_MESSAGE_HISTORY'
            ],
            throttling: {
                usages: 2,
                duration: 600
            },
        });
    }
    
    async run(msg) {
        msg.react('🔨');
    }
};