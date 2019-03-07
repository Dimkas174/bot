const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js');

module.exports = class TryCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'try',
			aliases: ['попытка'],
			group: 'fun',
			memberName: 'try',
            description: 'Игра удачно или неудачно.',
            examples: ['try <текст> (без <>)'],
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 20
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
                    key: 'content',
                    prompt: 'Предоставте текст!\nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
                    type: 'string',
                    validate: text => {
                        if (text.length < 2000) return true;
                        return 'Сообщение не должно превышать 2000 символов!'
                    }
                }
            ]
		});
	}

	async run(msg, { content }) {
        setTimeout(() => msg.delete(), 1000);
        var choices = ['[Удачно]', '[Неудачно]'];
        var rand = choices[Math.floor(Math.random() * choices.length)];                    
        var embed = new RichEmbed()
        if (rand === `[Удачно]`) {
            embed.setColor('0x008000')
            embed.setThumbnail(`https://i.imgur.com/XGE8pbR.png`)
            embed.setDescription("<@" + msg.author.id + "> " + ` ` + content)
        } else if (rand === `[Неудачно]`) {
            embed.setColor('0xFF0000')
            embed.setThumbnail(`https://i.imgur.com/E9MOX95.png`)
            embed.setDescription("<@" + msg.author.id + "> " + ` ` + content)
        }
        msg.say(embed);
	}
};