const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js');

const linkImg = /https?:\/\/.+\.(?:png|jpg|jpeg|gif)/gi;

module.exports = class IncognitaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'incognita',
            aliases: ['инкогнито', 'incog'],
            group: 'admin',
            memberName: 'incognita',
            description: 'Бот повторит текст, который вы ему предоставите, встроив его в embed (инкогнито). В целях безопасности данную команду может использовать только владелец бота.',
            examples: ['incognita <Привет!>'],
            guildOnly: true,
            clientPermissions: [
                'ADD_REACTIONS',
                'MANAGE_MESSAGES',
                'SEND_MESSAGES',
                'EMBED_LINKS',
                'READ_MESSAGE_HISTORY'
            ],
            userPermissions: [
                'ADMINISTRATOR',
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
					key: 'text',
					prompt: 'Введите текст для отправки! \nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
					type: 'string',
					validate: text => {
						if (text.length < 2000) return true;
                        return 'Сообщение не должно превышать 2000 символов!'
					}
				}
			]
        });
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author);
    }

    run(msg, { text }) {
        msg.react('📢');
		let embed = new RichEmbed()
        embed.setColor('RANDOM')
        if (text.match(linkImg)) {
            const link = text.match(linkImg)
            const textbl = text.replace(linkImg, "");
            embed.setImage(link[0])
            embed.setDescription(textbl)
                
        } else {
            embed.setDescription(text)
        }
        setTimeout(() => msg.delete(), 1000);
        return msg.embed(embed)
    }
};