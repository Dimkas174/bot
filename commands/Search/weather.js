const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js'),
      request = require('node-superfetch'),
      weather = require('weather-js');

module.exports = class WeatherCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'weather',
            aliases: ['погода', 'wth'],
            group: 'search',
            memberName: 'weather',
            description: 'Погода для указанного города.',
            examples: ['weather <город> (без <>)'],
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
                    key: 'query',
                    prompt: 'Введите название города! \nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
                    type: 'string',
                    validate: query => {
                        if (query.length < 2000) return true;
                        return 'Сообщение не должно превышать 2000 символов!'
                    }
                }
            ]
        });
    }

    async run(msg, { query }) {
      msg.react('👌');
      
      if (msg.channel.id === '242922753500512258' || msg.channel.id === '222674909858496512') {
        msg.delete();
        var _message = await msg.say(msg.author + ` **Используйте канал <#489835949052657694> для данной команды!**`)
        setTimeout(() => _message.delete(), 5000);
        
      } else {

        weather.find ({
				  search: query,
				  degreeType: 'C'
        }, function(err, result) {
				  if (err) {
					  msg.reply(`На запрос \`${query}\` нет результатов.`)
            
				  };
          
          const strana = `${result[0].location.name}`
        
           const embed = new RichEmbed()
            embed.setColor('RANDOM')
            embed.setTimestamp()
            embed.setTitle(result[0].location.name)
            embed.setURL(`https://www.google.com/maps/search/${encodeURIComponent(query)}`)
            embed.setThumbnail(result[0].current.imageUrl)
            embed.addField('Температура', `🌡 ${(result[0].current.temperature)} °C`, true)
            embed.addField('По ощущению', `🌡 ${(result[0].current.feelslike)} °C`, true)
            embed.addField('Влажность', `💧 ${result[0].current.humidity} %`, true)
            embed.addField('Скорость ветра', `🌬 ${(result[0].current.windspeed)}`, true)
            return msg.embed(embed).catch(console.error);
        });
      }
      }
};