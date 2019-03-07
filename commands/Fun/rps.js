const { Command } = require('discord.js-commando'),
      choices = ['камень', 'бумага', 'ножницы'];

module.exports = class RpsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'rps',
			aliases: ['кнб'],
			group: 'fun',
			memberName: 'rps',
            description: 'Игра камень, ножницы, бумага.',
            examples: ['rps <камень/ножницы/бумага>'],
            guildOnly: true,
            throttling: {
				usages: 2,
				duration: 10
			},
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
			args: [
				{
					key: 'choice',
					prompt: 'Камень, ножницы или бумага? \nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
					type: 'string',
					parse: choice => choice.toLowerCase()
				}
			]
		});
	}

	run(msg, { choice }) {
		const response = choices[Math.floor(Math.random() * choices.length)];
		if (choice === 'камень') {
			if (response === 'камень') return msg.reply('Камень! Оу... Ничья...');
			if (response === 'бумага') return msg.reply('Бумага! Да! Я побеждаю!');
			if (response === 'ножницы') return msg.reply('Ножницы! Ой... Я проигрываю...');
		}
		if (choice === 'бумага') {
			if (response === 'камень') return msg.reply('Камень! Ой... Я проиграл...');
			if (response === 'бумага') return msg.reply('Бумага! Оу... Ничья...');
			if (response === 'ножницы') return msg.reply('Ножницы! Да! Я побеждаю!');
		}
		if (choice === 'ножницы') {
			if (response === 'камень') return msg.reply('Камень! Да! Я побеждаю!');
			if (response === 'бумага') return msg.reply('Бумага! Ой... Я проигрываю...');
			if (response === 'ножницы') return msg.reply('Ножницы! Оу... Ничья...');
		}
		return msg.reply('Я побеждаю по умолчанию, вы немного обманываете.');
	}
};