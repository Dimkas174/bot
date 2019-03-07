const { Command } = require('discord.js-commando');

module.exports = class ChooseCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'choose',
            aliases: ['выбор', 'chs'],
            group: 'random',
            memberName: 'choose',
            description: 'Выбор из нескольких вариантов.',
            examples: ['choose <вариант1> <вариант2> <вариант3> (без <>)'],
            guildOnly: true,
            clientPermissions: [
                'ADD_REACTIONS',
                'MANAGE_MESSAGES',
                'SEND_MESSAGES',
                'READ_MESSAGE_HISTORY'
            ],
            userPermissions: [
                'ADD_REACTIONS',
                'SEND_MESSAGES',
                'READ_MESSAGE_HISTORY'
            ],
            throttling: {
                usages: 2,
                duration: 120
            },
            args: [
				{
					key: 'choices',
					prompt: 'Что вы хотите что бы я выбрал? Предоставте несколько вариантов через пробел! \nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
					type: 'string',
					infinite: true,
					max: 1950
				}
			]
        });
    }
    
    run(msg, { choices }) {
        msg.react('⚖');
        return msg.say(`Я выбираю ${choices[Math.floor(Math.random() * choices.length)]}!`);
    }
};