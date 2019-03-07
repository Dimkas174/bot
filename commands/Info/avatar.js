const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js');

module.exports = class AvatarCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            aliases: ['аватар', 'аватарка', 'ава', 'ava'],
            group: 'info',
            memberName: 'avatar',
            description: 'Показывает аватарку @участника.',
            examples: ['avatar @упоминание'],
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
                duration: 20
            },
            args: [
                {
                    key: 'value',
                    prompt: '@Упомяните кого-нибудь! \nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
                    type: 'integer',
                    validate: value => {
                        if (value.length < 2000) return true;
                        return 'Размер упоминания не должен превышать 2000 символов!'
                    },
                    default: 'msg.author'
                }
            ]
        });
    }

    run(msg, { value }) {
        msg.react('👌');
        if (!value) {
            let mentionusers = msg.mentions.users.first()
            let embed = new RichEmbed()
            embed.setColor('RANDOM')
            if (this.client.info.has(mentionusers.id)) {
                let ava = this.client.info.get(mentionusers.id).gifava;
                embed.setImage(ava)
            } else {
                embed.setImage(mentionusers.displayAvatarURL)
            }
             embed.setFooter("Запрос от " + msg.author.tag, msg.author.displayAvatarURL)
            return msg.embed(embed);
        } else {  
            let embed = new RichEmbed()
            embed.setColor('RANDOM')
            embed.setDescription("Ваша текущая аватарка")
            if (this.client.info.has(msg.author.id)) {
                let ava = this.client.info.get(msg.author.id).gifava;
                embed.setImage(ava)
             } else {
                embed.setImage(msg.author.displayAvatarURL)
             }
             embed.setFooter("Запрос от " + msg.author.tag, msg.author.displayAvatarURL)
            return msg.embed(embed);                  
        }
    }
};