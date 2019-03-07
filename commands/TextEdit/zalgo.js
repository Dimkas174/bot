const { Command } = require('discord.js-commando'),
      banish = require('to-zalgo/banish'),
      zalgo = require('to-zalgo');

module.exports = class ZalgoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'zalgo',
            aliases: ['залго'],
            group: 'textedit',
            memberName: 'zalgo',
            description: 'п͂̇̉р̡ͯ̈́е̓͑̂о͈ͪ̓б̈́̆̒р́̓̍а̸̽̎з̎̇ͬо̍ͣ̋в͋ͫ̋а̺ͦͅн̐͐̏и̧͌̐еͭͣ̐ ͩ̆̈т̇ͦ̂еͥ̉̈́к̈̐͞с̂̃́тͣ̈́̂аͬ͑̒.',
            examples: ['zalgo <текст> (без <>)'],
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
                    key: 'txt',
                    prompt: 'Введите текст! \nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
                    type: 'string'
                }
            ]
        });
    }

    run(msg, { txt }) {
        msg.say(zalgo(banish(txt)));
    }
};