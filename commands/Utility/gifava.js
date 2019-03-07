const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js'),
      linkImg = /https?:\/\/.+\.(?:png|jpg|jpeg|gif)/gi;

module.exports = class GifavaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'gifava',
            aliases: ['гифава'],
            group: 'utility',
            memberName: 'gifava',
            description: 'Добавление аниме аватарки к акаунту.',
            examples: ['gifava <ссылка на gif> (без <>)'],
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
                duration: 20
            },
            args: [
				{
					key: 'text',
					prompt: 'Введите ссылку на gif! \nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
					type: 'string',
					validate: text => {
						if (text.length < 2000) return true;
                        return 'Сообщение не должно превышать 2000 символов!'
                    }
				}
			]
        });
    }

    async run(msg, { text }) {
        msg.react('👌');
        setTimeout(() => msg.delete(), 1000);
      
      if (text.match(linkImg)) {
        if(!this.client.info.has(`${msg.author.id}`)) {
            this.client.info.set(`${msg.author.id}`, {
               user: msg.author.id,
               gifava: text
            });
          
            let embed = new RichEmbed()
            .setColor('RANDOM')
            .setDescription(`В базу данных добавлена ссылка на аватарку для аккаунта <@${msg.author.id}> `)
            .setImage(text)
            return msg.embed(embed);
          
        } else if (this.client.info.has(`${msg.author.id}`)) {
            this.client.info.set(`${msg.author.id}`, {
               user: msg.author.id,
               gifava: text
            });
          
            let embed = new RichEmbed()
            .setColor('RANDOM')
            .setDescription(`В базе данных обновлена ссылка на аватарку для аккаунта <@${msg.author.id}> `)
            .setImage(text)
            return msg.embed(embed);
        }
        
      } else {
        var _message = await msg.say('Ссылка на аватарку должна быть с .gif, .png или .jpg в конце! Желательно предоставить ссылку с .gif в конце, т.к. эта функция предназначена для гиф изображений.');
        setTimeout(() => _message.delete(), 180000);
      }
    }
};