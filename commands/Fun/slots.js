const { Command } = require('discord.js-commando');
const slots = ['🍇', '🍊', '🍐', '🍒', '🍋'];

module.exports = class SlotsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'slots',
			aliases: ['автомат', 'слоты'],
			group: 'fun',
			memberName: 'slots',
            description: 'Игра в слоты.',
            examples: ['slots'],
            guildOnly: true,
            throttling: {
				usages: 2,
				duration: 10
			},
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
            ]
		});
	}

	run(msg) {
		const slotOne = slots[Math.floor(Math.random() * slots.length)];
		const slotTwo = slots[Math.floor(Math.random() * slots.length)];
		const slotThree = slots[Math.floor(Math.random() * slots.length)];
		if (slotOne === slotTwo && slotOne === slotThree) {
			return msg.reply(`${slotOne}|${slotTwo}|${slotThree} \r\nВау! Ты победил! Отлично!`);
		}
		return msg.reply(`${slotOne}|${slotTwo}|${slotThree} \r\nОх... Вы проиграли... Попробуйте снова!`);
	}
};