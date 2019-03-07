const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js');

const linkImg = /https?:\/\/.+\.(?:png|jpg|jpeg|gif)/gi;

module.exports = class EmbCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'emb',
            aliases: ['встраивание'],
            group: 'admin',
            memberName: 'emb',
            description: 'Бот повторит текст, который вы ему предоставите, встроив его в embed. В целях безопасности данную команду может использовать только пользователи с правами администратора.',
            examples: ['emb <Привет!>'],
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

    run(msg, { text }) {
        msg.react('📢');
        let author = msg.author;
      
		    let embed = new RichEmbed()
        embed.setColor('RANDOM')
        embed.setTitle(author.username + "#" + author.discriminator)
        if (this.client.info.has(msg.author.id)) {
            let ava = this.client.info.get(msg.author.id).gifava;
            embed.setThumbnail(ava)
        } else {
            embed.setThumbnail(msg.author.displayAvatarURL)
        }
        if (text.match(linkImg)) {
            const link = text.match(linkImg)
            const textbl = text.replace(linkImg, "");
            embed.setDescription(textbl)
            embed.setImage(link[0])
                
        } else {
            embed.setDescription(text)
        }
        setTimeout(() => msg.delete(), 1000);
        msg.embed(embed)
        return
    }
};