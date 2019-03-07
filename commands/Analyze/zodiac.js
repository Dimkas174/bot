const { Command } = require('discord.js-commando');

module.exports = class ZodiacSignCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'zodiac',
			aliases: ['зодиак'],
			group: 'analyze',
			memberName: 'zodiac',
            description: 'Определяет знак зодиака по дате и месяцу.',
            examples: ['zodiac <месяц> <день>'],
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
                duration: 60
            },
			args: [
				{
					key: 'month',
					prompt: 'Для какого месяца вы хотели бы получить знак зодиака? Введите число от 1 до 12! \nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
					type: 'integer',
          min: 1,
					max: 12
				},
				{
					key: 'day',
					prompt: 'Для какого дня вы хотели бы получить знак зодиака? Введите число от 1 до 31! \nУ вас есть 30 секунд. Либо введите \`cancel\` для отвены!',
					type: 'integer',
					min: 1,
					max: 31
				}
			]
		});
	}

	run(msg, { month, day }) {
		const sign = this.determineSign(month, day);
		if (!sign) return msg.reply('Недействительный день.');
		return msg.say(`**Знак зодиака для ${month}/${day}:** ${sign}.`);
	}

	determineSign(month, day) { // eslint-disable-line complexity
		if (month === 1) {
			if (day >= 1 && day <= 19) return ':capricorn: Козерог';
			if (day >= 20 && day <= 31) return ':aquarius: Водолей';
			return null;
		} else if (month === 2) {
			if (day >= 1 && day <= 18) return ':aquarius: Водолей';
			if (day >= 19 && day <= 29) return ':pisces: Рыбы';
			return null;
		} else if (month === 3) {
			if (day >= 1 && day <= 20) return ':pisces: Рыбы';
			if (day >= 21 && day <= 31) return ':aries: Овен';
			return null;
		} else if (month === 4) {
			if (day >= 1 && day <= 19) return ':aries: Овен';
			if (day >= 20 && day <= 31) return ':taurus: Телец';
			return null;
		} else if (month === 5) {
			if (day >= 1 && day <= 20) return ':taurus: Телец';
			if (day >= 21 && day <= 31) return ':gemini: Близнецы';
			return null;
		} else if (month === 6) {
			if (day >= 1 && day <= 20) return ':gemini: Близнецы';
			if (day >= 21 && day <= 31) return ':cancer: Рак';
			return null;
		} else if (month === 7) {
			if (day >= 1 && day <= 22) return ':cancer: Рак';
			if (day >= 23 && day <= 31) return ':leo: Лев';
			return null;
		} else if (month === 8) {
			if (day >= 1 && day <= 22) return ':leo: Лев';
			if (day >= 23 && day <= 31) return ':virgo: Дева';
			return null;
		} else if (month === 9) {
			if (day >= 1 && day <= 22) return ':virgo: Дева';
			if (day >= 23 && day <= 31) return ':libra: Весы';
			return null;
		} else if (month === 10) {
			if (day >= 1 && day <= 22) return ':libra: Весы';
			if (day >= 23 && day <= 31) return ':scorpius: Скорпион';
			return null;
		} else if (month === 11) {
			if (day >= 1 && day <= 21) return ':scorpius: Скорпион';
			if (day >= 22 && day <= 31) return ':sagittarius: Стрелец';
			return null;
		} else if (month === 12) {
			if (day >= 1 && day <= 21) return ':sagittarius: Стрелец';
			if (day >= 22 && day <= 31) return ':capricorn: Козерог';
			return null;
		} else {
			return null;
		}
	}
};