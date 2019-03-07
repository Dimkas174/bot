const { Command } = require('discord.js-commando');

module.exports = class PruneCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'prune',
			aliases: ['clear'],
			group: 'admin',
			memberName: 'prune',
			description: 'Удаляет до 99 сообщений в текущем канале.',
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 20
			},
			clientPermissions: [
				'SEND_MESSAGES',
				'READ_MESSAGE_HISTORY', 
				'MANAGE_MESSAGES'
			],
			userPermissions: [
                'SEND_MESSAGES',
				'MANAGE_MESSAGES',
				'READ_MESSAGE_HISTORY'
			],
			args: [
				{
					key: 'count',
					label: 'количество собщений',
					prompt: 'Сколько сообщений вы хотите удалить? Введите число от 1 до 99! \nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
					type: 'integer',
					min: 1,
					max: 99
				}
			]
		});
	}

	async run(msg, { count }) {
        try {
			const amount = parseInt(count) + 1;
			await msg.channel.bulkDelete(amount, true);
			return null;
		} catch (err) {
			return msg.reply('Нет сообщений написанных в течении последних двух недель, которые можно удалить.');
		}
	}
};