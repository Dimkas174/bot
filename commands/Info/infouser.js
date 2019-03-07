const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js');

module.exports = class InfouserCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'infouser',
            aliases: ['инфоюзер'],
            group: 'info',
            memberName: 'infouser',
            description: 'Информация о пользователе.',
            examples: ['infouser <@упоминание пользователя>'],
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
					key: 'text',
					prompt: '@Упомяните кого-нибудь! \nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
					type: 'string',
					validate: text => {
						if (text.length < 2000) return true;
                        return 'Сообщение не должно превышать 2000 символов!'
                    },
                    default: ''
				}
			]
        });
    }

    async run(msg, { text }) {
        msg.react('🔖');
        if (!text) {
            var member = msg.member;
            var user = member.user;
            var embed = new RichEmbed()
            embed.setColor(member.displayHexColor) 
            embed.setAuthor("Информация о пользователе " + msg.author.username, msg.author.displayAvatarURL)
            embed.addField("Имя на сервере", msg.member.displayName, true)
            embed.addField("Имя в Discord", user.username, true)
            embed.addField("ID", '🆔 ' + msg.author.id, true)
            if(msg.author.bot) {
                embed.addField("Бот", `🤖 Да`)
            }
            if(msg.author.presence.status) {
                if(msg.author.presence.status === 'online') {
                    embed.addField("Текущее состояние", '✅ Онлайн', true)
                } else if (msg.author.presence.status === 'idle') {
                    embed.addField("Текущее состояние", '😴 Не активен', true)
                } else if (msg.author.presence.status === 'dnd') {
                    embed.addField("Текущее состояние", ':red_circle: Не беспокоить', true)
                } else if (msg.author.presence.status === 'offline') {
                    embed.addField("Текущее состояние", ':black_circle: Не в сети или невидим', true)
                }
            }
            if (msg.member.presence.game && msg.member.presence.game.name) {
                embed.addField("Играет в", '🎮 ' + msg.member.presence.game && msg.member.presence.game.name, true)
            }
            embed.addField("Присоединился к Discord", new Date(user.createdAt))
            embed.addField("Присоеденился к данному серверу", new Date(member.joinedAt))
            if (msg.member.voiceChannel) {
                embed.addField("Текущий голосовой канал", `🔊 ${msg.member.voiceChannel.name}`)
            }
            embed.addField("Роли", ':crown: ' + msg.member.roles.map(r=> " " + r.name).join(', '))
            embed.addField('Ссылка на аватар', '[Тут](' + msg.author.displayAvatarURL + ')', true);
            embed.setThumbnail(msg.author.displayAvatarURL)
            embed.setFooter("Запрос от " + msg.author.tag, msg.author.displayAvatarURL)
            embed.setTimestamp()
            msg.embed(embed)

        } else {
            var mentionmembers = msg.mentions.members.first()
            var mentionusers = msg.mentions.users.first()
          
            var embed = new RichEmbed()
            embed.setColor(mentionmembers.displayHexColor)
            embed.setAuthor("Информация о пользователе " + `${mentionusers.username}#${msg.author.discriminator}`, mentionusers.displayAvatarURL)
            embed.addField("Имя на сервере", mentionmembers.displayName, true)
            embed.addField("Имя в Discord", mentionusers.username, true)
            embed.addField("ID", '🆔 ' + mentionmembers.id, true)
            if(mentionusers.bot) {
                embed.addField("Бот", `🤖 Да`)
            }
            if(mentionmembers.presence.status) {
                if(mentionmembers.presence.status === 'online') {
                    embed.addField("Текущее состояние", '✅ Онлайн', true)
                } else if (mentionmembers.presence.status === 'idle') {
                    embed.addField("Текущее состояние", '😴 Не активен', true)
                } else if (mentionmembers.presence.status === 'dnd') {
                    embed.addField("Текущее состояние", ':red_circle: Не беспокоить', true)
                } else if (mentionmembers.presence.status === 'offline') {
                    embed.addField("Текущее состояние", ':black_circle: Не в сети или невидим', true)
                }
            }
            if (mentionusers.presence.game && mentionusers.presence.game.name) {
                embed.addField("Играет в", '🎮 ' + mentionusers.presence.game && mentionusers.presence.game.name, true)
            }
            embed.addField("Присоединился к Discord", new Date(mentionusers.createdAt))
            embed.addField("Присоеденился к данному серверу", new Date(mentionmembers.joinedAt))
            if(mentionmembers.voiceChannel) {
                embed.addField("Текущий голосовой канал", `🔊 ${mentionmembers.voiceChannel.name}`)
            }
            embed.addField("Роли", ':crown: ' + mentionmembers.roles.map(r=> " " + r.name).join(', '))
            embed.addField('Ссылка на аватар', '[Тут](' + mentionusers.avatarURL + ')', true);
            embed.setThumbnail(mentionusers.displayAvatarURL)
            embed.setFooter("Запрос от " + msg.author.tag, msg.author.displayAvatarURL)
            embed.setTimestamp()
            msg.embed(embed)
        }
    }
};