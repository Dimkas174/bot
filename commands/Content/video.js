const { Command } = require('discord.js-commando');

module.exports = class VideoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'video',
            aliases: ['видео'],
            group: 'content',
            memberName: 'video',
            description: 'Видео c группы vk.com/gta5m или YouTube канала PLAYMP.',
            examples: ['video <vmp> (без <>)'],
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
                    prompt: 'Из какой категории вы желаете посмотреть рандомное видео? Выберите один из вариантов: vmp или playmp \nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
                    type: 'string',
                    oneOf: ["vmp", "playmp"]
                },
            ]
        });
    }

    run(msg, { text }) {
        msg.react('👌');
      
        if (text === "vmp") {
          try{
                const numba = Math.floor(Math.random() * (119 - 30)) + 0;
                if (numba === 100 || numba > 100 && numba < 119) {
                   return msg.say(`https://vk.com/video-23881761_456239${numba}`)
                } else if (numba > 29 && numba < 100) {
                   return msg.say(`https://vk.com/video-23881761_4562390${numba}`)
                }
           } catch(err) {
                return console.log(err.stack);
           }
          
        } else if (text === "playmp") {
            var plaympvideo = [
                "https://www.youtube.com/watch?v=BFGMftw968I", 
                "https://www.youtube.com/watch?v=Pvu_MvVC1rs",
                "https://www.youtube.com/watch?v=C9cHd9aPolU",
                "https://www.youtube.com/watch?v=06giPgogWgw",
                "https://www.youtube.com/watch?v=e76iQCvbeZo",
                "https://www.youtube.com/watch?v=kDA6FFD0lxw",
                "https://www.youtube.com/watch?v=p--vKd3QdAk",
                "https://www.youtube.com/watch?v=wzJ4AsfbKSc",
                "https://www.youtube.com/watch?v=05h5wgoGCY0",
                "https://www.youtube.com/watch?v=S7UHeMK0FPg",
                "https://www.youtube.com/watch?v=VMZBq01AglU",
                "https://www.youtube.com/watch?v=EK6PZZgINXI",
                "https://www.youtube.com/watch?v=6JW_mQQfmnY",
                "https://www.youtube.com/watch?v=VCFgNNecH04",
                "https://www.youtube.com/watch?v=3e4Epw3rxgA",
                "https://www.youtube.com/watch?v=JvavQuHI6kw",
                "https://www.youtube.com/watch?v=EHsVWDUSsB0",
                "https://www.youtube.com/watch?v=x3xg2hsQjVQ",
                "https://www.youtube.com/watch?v=4_AISlUH-3s",
                "https://www.youtube.com/watch?v=tOkeGi53YUo",
                "https://www.youtube.com/watch?v=WNPHmspV8Jk",
                "https://www.youtube.com/watch?v=x-zSdwX_iWc",
                "https://www.youtube.com/watch?v=4CKktELbw8w",
                "https://www.youtube.com/watch?v=WyKmtQSQ5vo",
                "https://www.youtube.com/watch?v=Uu9xrpUk5G0"
            ];
            var randplaympvideo = plaympvideo[Math.floor(Math.random() * plaympvideo.length)];
            return msg.say(randplaympvideo)
        }
    }
};