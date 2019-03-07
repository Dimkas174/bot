const { Command } = require('discord.js-commando'),
      request = require('request'),
      { RichEmbed } = require('discord.js');

module.exports = class RadioCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'radio',
            aliases: ['радио', 'rd'],
            group: 'voice',
            memberName: 'radio',
            description: 'Включает радио.',
            examples: ['radio http://air.radiorecord.ru:8101/rr_320'],
            guildOnly: true,
            clientPermissions: [
                'CONNECT',
                'SPEAK',
                'ADD_REACTIONS',
                'MANAGE_MESSAGES',
                'SEND_MESSAGES',
                'EMBED_LINKS',
                'READ_MESSAGE_HISTORY'
            ],
            userPermissions: [
                'CONNECT',
                'SPEAK',
                'ADD_REACTIONS',
                'SEND_MESSAGES',
                'READ_MESSAGE_HISTORY'
            ],
            throttling: {
                usages: 2,
                duration: 120
            },
            args: [
				{
					key: 'text',
					prompt: '.',
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
        msg.react('📻');
        
        if (text !== "record") return;
        request("https://www.radiorecord.ru/radioapi/stations/now/", async function (error, response, body) {
            if (error) {
                return;
            } 
            var data = JSON.parse(body)
          
            var embed = new RichEmbed()
            embed.setColor('RANDOM')
            embed.setAuthor("Record Dance Radio", "http://www.radiorecord.ru/radioapi/stations/st_rr@3x.png")
          
            if (data.result[0].image600) {
                if (data.result[0].image600.match(/https?:\/\/e?-?cdn-images.deezer.com\/images\/cover\/2b43aa26e0fcd66501faa3843c71ccff\/600x600-000000-80-0-0.jpg/gi)) {
                    embed.setThumbnail(`http://e-cdn-images.deezer.com/images/cover/2b43aa26e0fcd66501faa3843c71ccff/600x600-000000-80-0-0.jpg`)
                } else if (data.result[0].image600.match(/https?:\/\/(www)?.radiorecord.ru\/radioapi\/covers\/rr_600.jpg/gi)) {
                  embed.setThumbnail(`http://www.radiorecord.ru/radioapi/covers/rr_600.jpg`)
                } else {
                  embed.setThumbnail(`http://www.radiorecord.ru/radioapi/stations/st_rr@3x.png`)
                  embed.setImage(data.result[0].image600)
                }
            } else {
                embed.setThumbnail("http://www.radiorecord.ru/radioapi/stations/st_rr@3x.png")
            }

            if (data.result[0].artist && data.result[0].song) {
                if (data.result[0].listenURL) {
                    if (data.result[0].itunesURL) {
                        embed.setDescription(`[▶](${data.result[0].listenURL}) [${data.result[0].artist} - ${data.result[0].song}](${data.result[0].itunesURL})`)
                    } else {
                        embed.setDescription(`[▶](${data.result[0].listenURL}) ${data.result[0].artist} - ${data.result[0].song}`)
                    }
                } else if (data.result[0].itunesURL) {
                    embed.setDescription(`[${data.result[0].artist} - ${data.result[0].song}](${data.result[0].itunesURL})`)
                } else {
                    embed.setDescription(`${data.result[0].artist} - ${data.result[0].song}`)
                }

            } else if (data.result[0].artist) {
                if (data.result[0].listenURL) {
                    if (data.result[0].itunesURL) {
                        embed.setDescription(`[▶](${data.result[0].listenURL}) [${data.result[0].artist}](${data.result[0].itunesURL})`)
                    } else {
                        embed.setDescription(`[▶](${data.result[0].listenURL}) ${data.result[0].artist}`)
                    }
                } else if (data.result[0].itunesURL) {
                    embed.setDescription(`[${data.result[0].artist}](${data.result[0].itunesURL})`)
                } else {
                    embed.setDescription(`${data.result[0].artist}`)
                }

            } else if (data.result[0].song) {
                if (data.result[0].listenURL) {
                    if (data.result[0].itunesURL) {
                        embed.setDescription(`[▶](${data.result[0].listenURL}) [${data.result[0].song}](${data.result[0].itunesURL})`)
                    } else {
                        embed.setDescription(`[▶](${data.result[0].listenURL}) ${data.result[0].song}`)
                    }
                } else if (data.result[0].itunesURL) {
                    embed.setDescription(`[${data.result[0].song}](${data.result[0].itunesURL})`)
                } else {
                    embed.setDescription(`${data.result[0].song}`)
                }
            }

            embed.addField('✴  ✴  ✴', `[Расписание программ Радио Рекорд](http://www.radiorecord.ru/radio/schedule/)`);
            embed.setFooter("Запрос от " + msg.author.tag, msg.author.displayAvatarURL)
            embed.setTimestamp()
            await msg.embed(embed)   
        })
    }
}; 