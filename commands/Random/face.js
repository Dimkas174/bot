const { Command } = require('discord.js-commando');

const faces = ['(∩ ͠°ل͜ °)⊃━☆',
    '☞ ﾟ ͜ʖ ﾟ☞',
    'ᖗ ◉ ᨓ ◉ ᖘ',
    'ᕦ(ʘᴥʘ)ᕥ',
    '(づ◉ ͜ʖ◉)づ',
    '(づ>﹏<)づ',
    '(☉ ͜ʖ☉)',
    '(ง ò ʖ̯ ó )ง',
    'ʕ ◕ ͜ʖ ◕ ʔ',
    'ᕙ( ☉ Ꮂ ☉ )ᕗ',
    '( ͡° ͜ʖ ͡° )',
    '༼ つ ◕_◕ ༽つ',
    'ಠ_ಠ',
    '(ಥ﹏ಥ)',
    '┬─┬ノ( º _ ºノ)',
    '(▰˘◡˘▰)',
    '╚(ಠ_ಠ)=┐',
    '( ಠ ͜ʖರೃ)',
    '┬┴┬┴┤ ͜ʖ ͡°) ├┬┴┬┴',
    '( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)',
    '(ง ﾟ ͜つ ﾟ)ง',
    '( ͡°O ͜ʖ ͡°O)',
    'ヽ༼ຈل͜ຈ༽ﾉ',
    '(͡◔ ͜ʖ ͡◔)',
    '( ͡ ͜ ʖ ͡ )',
    '( ͡°Ĺ̯ ͡° )',
    '( ͡~ ͜ʖ ͡~)',
    '( ͜。 ͡ʖ ͜。)',
    '( ° ͜ʖ͡°)╭∩╮',
    '( ͡~ ͜ʖ ͡°)',
    'ᕕ( ͡° ͜ʖ ͡°)ᕗ',
    '( ͡ _ ͡°)ﾉ⚲ ♫',
    '(╯ຈل͜ຈ) ╯︵ ┻━┻',
    '( ͡° ͜ʖ ͡°)=ε✄',
    '✺◟( ͡° ͜ʖ ͡°)◞✺',
    '(╯ ͝° ͜ʖ͡°)╯︵ ┻━┻',
    '┬━┬ノ(▀̿̿Ĺ̯̿̿▀̿ ̿ノ)',
    '━╤デ╦︻(▀̿̿Ĺ̯̿̿▀̿ ̿)',
    'ᕙ(░ಥ╭͜ʖ╮ಥ░)━☆ﾟ.*･｡ﾟ',
    '（╯°□°）╯︵ ( ͜。 ͡ʖ ͜。)',
    '(∩ ͡ ° ʖ ͡ °) ⊃-(===>',
    '︵‿︵(´ ͡༎ຶ ͜ʖ ͡༎ຶ `)︵‿︵',
    'ヽ༼ ຈل͜ຈ༼ ▀̿̿Ĺ̯̿̿▀̿ ̿༽Ɵ͆ل͜Ɵ͆ ༽ﾉ',
];

module.exports = class FaceCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'face',
            aliases: ['лицо'],
            group: 'random',
            memberName: 'face',
            description: 'Случайное лицо.',
            examples: ['face'],
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
        });
    }
    
    run(msg) {
        msg.react('👌');
        
        msg.say(faces[Math.floor(Math.random() * faces.length)]);
    }
};