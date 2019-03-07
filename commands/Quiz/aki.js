const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js'),
      request = require('node-superfetch');

const swearwords = require('../../assets/json/swearwords');

const yes = ['yes', 'y', 'да', 'д', 'yup', 'yea', 'ya'];
const no = ['no', 'n', 'нет', 'nope', 'н'];

const proekt = /sa:?mp|arizona|evolve|advance|five star|Criminal Russia|diamond|CRMP|IceLand|GamBit|RPStalker|Plastilino|role play|RP|MTA|YDDY|Amazing/gi

async function verify(channel, user, time = 30000) {
    const filter = res => {
        const value = res.content.toLowerCase();
        return res.author.id === user.id && (yes.includes(value) || no.includes(value));
    };
    const verify = await channel.awaitMessages(filter, {
        max: 1,
        time
    });
    if (!verify.size) return 0;
    const choice = verify.first().content.toLowerCase();
    if (yes.includes(choice)) return true;
    if (no.includes(choice)) return false;
    return false;
}

module.exports = class АkiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'aki',
            aliases: ['akinator', 'перс', 'аки', 'акинатор', 'угадай', 'отгадай'],
            group: 'quiz',
            memberName: 'aki',
            description: 'Подумайте о реальном или вымышленном персонаже и я постараюсь угадать, кто это.',
            examples: ['aki'],
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
                duration: 60
            },
        });
        this.sessions = new Map();
    }

    async run(msg) {
        msg.react('👌');
      
      if (this.sessions.has(msg.channel.id)) return msg.reply('Только одна игра может происходить в канале!');
		try {
			let ans = null;
			this.sessions.set(msg.channel.id, { progression: 0 });
			while (this.sessions.get(msg.channel.id).progression < 95) {
				const data = ans === null ? await this.createSession(msg.channel) : await this.progress(msg.channel, ans);
				if (!data || !data.answers || this.sessions.get(msg.channel.id).step >= 80) break;
				const answers = data.answers.map(answer => answer.answer.toLowerCase());
				answers.push('end');
        const guess = await this.guess(msg.channel);
				const embed = new RichEmbed()
				  embed.setColor('RANDOM')
          if (swearwords.words.some(word => data.question.includes(word)) ) {
             console.log(`Скрыт ответ: ${data.question}`)
             embed.setDescription(`[**${data.question}**](${guess.absolute_picture_path})`)
          } else if (swearwords.tabu.some(word => data.question.includes(word)) ) {
             console.log(`Скрыт ответ: ${data.question}`)
             embed.setDescription(`[**${data.question}**](${guess.absolute_picture_path})`)
          } else if (data.question.match(proekt)) {
             const text = data.question.replace(proekt, "...скрыто...");
             embed.setDescription(text)
          } else {
             embed.setDescription(`[**${data.question}**](${guess.absolute_picture_path})`)
          }
          embed.setThumbnail(`${guess.absolute_picture_path}`)
				  embed.addField("Варинаты ответов: ", `${data.answers.map(answer => answer.answer).join(' \n')}`)
          embed.setFooter(`Прогресс: ${Math.round(Number.parseInt(data.progression, 10))}%. Вопрос №${++data.step} для ${msg.author.username}.`, msg.author.displayAvatarURL)
			    await msg.embed(embed);
				const filter = res => res.author.id === msg.author.id && answers.includes(res.content.toLowerCase());
				const msgs = await msg.channel.awaitMessages(filter, {
					max: 1,
					time: 60000
				});
				if (!msgs.size) {
					await msg.say('⌛ Извините! Время вышло! ⌛');
					break;
				}
				if (msgs.first().content.toLowerCase() === 'end') break;
				ans = answers.indexOf(msgs.first().content.toLowerCase());
			}
			const guess = await this.guess(msg.channel);
			if (!guess) return msg.reply('Хм... Кажется, у меня проблемы. Попробуйте позже!');
			const embed = new RichEmbed()
				embed.setColor('RANDOM')
				embed.setTitle(`${Math.round(guess.proba * 100)}% это...`)
        if (swearwords.words.some(word => guess.name.includes(word)) ) {
            console.log(`Скрыт ответ: ${guess.name}`)
            embed.setDescription(`**[${guess.name}](${guess.absolute_picture_path})${guess.description ? `**\n_${guess.description}_` : ''}`)
        } else if (swearwords.tabu.some(word => guess.name.includes(word)) ) {
            console.log(`Скрыт ответ: ${guess.name}`)
            embed.setDescription(`**[${guess.name}](${guess.absolute_picture_path})${guess.description ? `**\n_${guess.description}_` : ''}`)
        } else if (guess.name.match(proekt) || guess.description && guess.description.match(proekt)) {
            const text = guess.name.replace(proekt, "...скрыто");
            if (guess.description && guess.description.match(proekt)) {
               const des = guess.description.replace(proekt, "...скрыто");
               embed.setDescription(`**...${guess.description ? `**\n...` : ''}`)
            } else {
               embed.setDescription(`**${text}${guess.description ? `**\n_${guess.description}_` : ''}`)
            }
        } else {
            embed.setDescription(`**[${guess.name}](${guess.absolute_picture_path})${guess.description ? `**\n_${guess.description}_` : ''}`)
        }
        embed.setImage(`${guess.absolute_picture_path}`)
        embed.addField("Варинаты ответов: ", 'Да \nНет')
			await msg.embed(embed);
			const verification = await verify(msg.channel, msg.author);
			this.sessions.delete(msg.channel.id);
			if (verification === 0) return msg.say(`Я думаю, ваше молчание означает, что я выиграл. \nВы снова можете попробовать введя \`/aki\``);
			if (!verification) return msg.say(`Либо ваш персонаж малоизвестен, либо вы отвечали неточно! \nВы снова можете попробовать введя \`/aki\``);
			return msg.say(`Давай еще раз! Мне понравилось!  \nВы снова можете попробовать введя \`/aki\``);
		} catch (err) {
			this.sessions.delete(msg.channel.id);
      console.log(err.stack);
			return msg.reply(`Данная команда временно недоступна!`);
		}
	}

	async createSession(channel) {
		const { body } = await request
			.get('https://srv3.akinator.com:9206/ws/new_session')
			.query({
				partner: '',
				player: 'website-desktop',
				uid_ext_session: '',
				frontaddr: 'NDYuMTA1LjExMC40NQ==',
				constraint: 'ETAT<>\'AV\'',
				soft_constraint: channel.nsfw ? '' : 'ETAT=\'EN\'',
				question_filter: channel.nsfw ? '' : 'cat=1'
			});
		if (body.completion !== 'OK') return null;
		const data = body.parameters;
		this.sessions.set(channel.id, {
			id: data.identification.session,
			signature: data.identification.signature,
			step: 0,
			progression: Number.parseInt(data.step_information.progression, 10)
		});
		return data.step_information;
	}

	async progress(channel, answer) {
		const session = this.sessions.get(channel.id);
		const { body } = await request
			.get('https://srv3.akinator.com:9206/ws/answer')
			.query({
				session: session.id,
				signature: session.signature,
				step: session.step,
				answer,
				question_filter: channel.nsfw ? '' : 'cat=1'
			});
		if (body.completion !== 'OK') return null;
		const data = body.parameters;
		this.sessions.set(channel.id, {
			id: session.id,
			signature: session.signature,
			step: Number.parseInt(data.step, 10),
			progression: Number.parseInt(data.progression, 10)
		});
		return data;
	}

	async guess(channel) {
		const session = this.sessions.get(channel.id);
		const { body } = await request
			.get('https://srv3.akinator.com:9206/ws/list')
			.query({
				session: session.id,
				signature: session.signature,
				step: session.step,
				size: 2,
				max_pic_width: 246,
				max_pic_height: 294,
				pref_photos: 'VO-OK',
				duel_allowed: 1,
				mode_question: 0
			});
		if (body.completion === 'KO - ELEM LIST IS EMPTY') return 0;
		if (body.completion !== 'OK') return null;
		return body.parameters.elements[0].element;
	}
};