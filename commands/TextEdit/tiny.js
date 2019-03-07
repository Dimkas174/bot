const { Command } = require('discord.js-commando');

const mappings = (function (object) {
    let text = [];

    for (let key in object) {
        text.push({
            regex: new RegExp(key, 'ig'),
            replacement: object[key]
        });
    }

    return text;
})({
    a: '\u1D00',
    b: '\u0299',
    c: '\u1D04',
    d: '\u1D05',
    e: '\u1D07',
    f: '\uA730',
    g: '\u0262',
    h: '\u029C',
    i: '\u026A',
    j: '\u1D0A',
    k: '\u1D0B',
    l: '\u029F',
    m: '\u1D0D',
    n: '\u0274',
    o: '\u1D0F',
    p: '\u1D18',
    q: '\u0071',
    r: '\u0280',
    s: '\uA731',
    t: '\u1D1B',
    u: '\u1D1C',
    v: '\u1D20',
    w: '\u1D21',
    x: '\u0078',
    y: '\u028F',
    z: '\u1D22',

    а: '\u1D00',
    б: '\u0431',
    в: '\u0299',
    г: '\u0433',
    д: '\u0434',
    е: '\u1D07',
    ё: '\u0451',
    ж: '\u0436',
    з: '\u0437',
    и: '\u0438',
    й: '\u0439',
    к: '\u1D0B',
    л: '\u043b',
    м: '\u1D0D',
    н: '\u029C',
    о: '\u1D0F',
    п: '\u043F',
    р: '\u1D18',
    с: '\u1D04',
    т: '\u1D1B',
    у: '\u028F',
    ф: '\u0444',
    х: '\u0078',
    ц: '\u0446',
    ч: '\u0447',
    ш: '\u0448',
    щ: '\u0449',
    ъ: '\u044A',
    ы: '\u044B',
    ь: '\u044C',
    э: '\u044D',
    ю: '\u044E',
    я: '\u044F'

});

module.exports = class TinyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'tiny',
            aliases: ['мелкий'],
            group: 'textedit',
            memberName: 'tiny',
            description: 'Преобразует текст в заглавный-уменьшенный (некоторые Русские буквы остаются прежними).',
            examples: ['tiny <текст> (без <>)'],
            guildOnly: true,
            clientPermissions: [
                'ADD_REACTIONS',
                'MANAGE_MESSAGES',
                'SEND_MESSAGES',
                'READ_MESSAGE_HISTORY'
            ],
            userPermissions: [
                'ADD_REACTIONS',
                'MANAGE_MESSAGES',
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
					prompt: 'Вы должны предоставить некоторый текст для уменьшения! \nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
					type: 'string',
					validate: text => {
						if (text.length < 2000) return true;
                        return 'Сообщение не должно превышать 2000 символов!'
                    },
				}
			]
        });
    }

    run(msg, { text }) {
        msg.react('🗜');
        
        mappings.forEach(replacer => text = text.replace(replacer.regex, replacer.replacement));
    
        msg.delete();
        msg.channel.send(text);
    }
};