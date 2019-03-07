const { Command } = require('discord.js-commando'),
      { stripIndents } = require('common-tags'),
      { RichEmbed } = require('discord.js'),
      words = require('../../assets/json/balda')

module.exports = class BaldaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'balda',
            aliases: ['балда', 'палач', 'висельница'],
            group: 'quiz',
            memberName: 'balda',
            description: 'Угадайте слово, что бы человечик не был повешен.',
            examples: ['balda'],
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
                duration: 10
            },
        });

		this.playing = new Set();
	}

	async run(msg) { 
    if (msg.guild.id === '548383798425813012') {
            if (msg.channel.id === '551009615077179402') {
		if (this.playing.has(msg.channel.id)) return msg.reply('Только одна игра может происходить в канале!');
		this.playing.add(msg.channel.id);
		try {
			const word = words[Math.floor(Math.random() * words.length)].toLowerCase();
			let points = 0;
			let displayText = null;
			let guessed = false;
			const confirmation = [];
			const incorrect = [];
			const display = new Array(word.length).fill('||░||');
			while (word.length !== confirmation.length && points < 6) {
        await msg.say(stripIndents`
					${displayText === null ? 'Мы начинаем!' : displayText ? '👍 Хорошая работа! 👍' : '❌ Нету! ❌'}
					${display.join(' ')}. 
          Какую букву вы выбираете?
					**Отсутствующие буквы:** ${incorrect.join(', ') || '-'}
          \`\`\`
					_______
					|     |
					|     ${points > 0 ? '😵' : ''}
					|    ${points > 2 ? '┌' : ' '}${points > 1 ? '()' : ''}${points > 3 ? '┐' : ''}
					|     ${points > 4 ? '/' : ''} ${points > 5 ? '\\' : ''}
					|
          |
          \`\`\`
        `);
				const filter = res => {
					const choice = res.content.toLowerCase();
					return res.author.id === msg.author.id && !confirmation.includes(choice) && !incorrect.includes(choice);
				};
				const guess = await msg.channel.awaitMessages(filter, {
					max: 1,
					time: 30000
				});
				if (!guess.size) {
					await msg.say('⌛ Извините! Время вышло! ⌛');
					break;
				}
				const choice = guess.first().content.toLowerCase();
				if (choice === 'end') break;
				if (choice.length > 1 && choice === word) {
					guessed = true;
					break;
				} else if (word.includes(choice)) {
					displayText = true;
					for (let i = 0; i < word.length; i++) {
						if (word.charAt(i) !== choice) continue; // eslint-disable-line max-depth
						confirmation.push(word.charAt(i));
						display[i] = word.charAt(i);
					}
				} else {
					displayText = false;
					if (choice.length === 1) incorrect.push(choice);
					points++;
				}
			}
			this.playing.delete(msg.channel.id);
			if (word.length === confirmation.length || guessed) return msg.say(`🎉 Вы победили! Это было слово: **${word}**! 🎉`);
			return msg.say(`🤷 Очень плохо... Это было слово: **${word}**... 🤷`);
		} catch (err) {
			this.playing.delete(msg.channel.id);
			console.log(err.stack);
			return msg.reply(`🤷 Данная команда временно недоступна! 🤷`);
		}
              } else {
                setTimeout(() => msg.delete(), 1000);
                var _message = await msg.say(msg.author + ` **Используйте канал <#551009615077179402> для данной команды!**`)
                setTimeout(() => _message.delete(), 60000);
            }
      } else {
         msg.reply(`🤷 Разработчик ещё не настроил эту команду для других серверов. Напомните ему! 🤷`);
      }
	}
};