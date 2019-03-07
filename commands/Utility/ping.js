const { Command } = require('discord.js-commando');

module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            aliases: ['пинг'],
            group: 'utility',
            memberName: 'ping',
            description: 'Время ответа бота.',
            examples: ['ping'],
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
        var start = new Date(msg.createdAt).getTime();
        msg.channel.send('Понг!')
            .then(msg2 => msg2.edit('Понг! ' + (msg2.createdAt.getTime() - start) + ' мс.'))
            .catch(console.error);
    }
};