const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js'),
      choices = require('../../assets/json/8ball');

module.exports = class BallCommand extends Command {
    constructor(client) {
        super(client, {
            name: '8ball',
            aliases: ['шар', '8шар'],
            group: 'random',
            memberName: '8ball',
            description: 'Задай вопрос магическому шару.',
            examples: ['8ball Ты знаешь ответ?'],
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
                    key: 'text',
                    prompt: 'Давай! Задай вопрос!\nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
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
        msg.react('🔮');
        var rand = choices[Math.floor(Math.random() * choices.length)];                    
        var embed = new RichEmbed()
        .setColor('0xFF4500')
        .setThumbnail('https://orig00.deviantart.net/d741/f/2013/100/b/8/magic_ball_by_luisbc-d613bgb.gif')  // Правое изображение
        .setDescription(rand)
        return msg.embed(embed);
    }
};