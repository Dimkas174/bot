const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js'),
      request = require('request'),
      cheerio = require('cheerio'),
      vmpimg = 'https://i.imgur.com/r9ItZ6p.gif';

module.exports = class RpnickCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'rpnick',
            aliases: ['рпник'],
            group: 'random',
            memberName: 'rpnick',
            description: 'Рандомный RP ник.',
            examples: ['rpnick'],
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
                duration: 10
            },
            args: [
				{
					key: 'gender',
					prompt: 'Вы не указали пол для ника! Выберите м или ж \nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
					type: 'string',
					oneOf: ["м", "ж", "male", "female"]
				},
				{
					key: 'nation',
					prompt: 'Вы не указали тип ника! Выберите русский, японский, итальянский, испанский, французский, шведский, немецкий, датский, румынский, американский\nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
					type: 'string',
					oneOf: ["русский", "Русский", "японский", "Японский", "итальянский", "Итальянский", "латинский", "Латинский", "испанский", "Испанский", "французский", "Французский", "Шведский", "шведский", "немецкий", "Немецкий", "датский", "Датский", "румынский", "Румынский", "американский", "Американский", "american", "russian", "japanese", "italian", "latinos", "french", "swedish", "german", "danish", "romamian"]
				}
			]
        });
    }

    async run(msg, {gender, nation}) {
        msg.react('👌');
      
      if (nation === "американский" || nation === "Американский") nation = "american";
        else if (nation === "русский" || nation === "Русский") nation = "russian";
        else if (nation === "японский" || nation === "Японский") nation = "japanese";
        else if (nation === "итальянский" || nation === "Итальянск") nation = "italian";
        else if (nation === "французский" || nation === "Французский") nation = "french";
        else if (nation === "шведский" || nation === "Шведский") nation = "swedish";
        else if (nation === "немецкий" || nation === "Немецкий") nation = "german";
        else if (nation === "датский" || nation === "Датский") nation = "danish";
        else if (nation === "румынский" || nation === "Румынский") nation = "romanian";
        else if (nation === "испанский" || nation === "Испанский"  || nation === "латинский"  || nation === "Латинский") nation = "latinos";
        
        if (gender === "м" || gender === "М" || gender === "m" || gender === "M") gender = "male";
        else if (gender === "ж") gender = "female";

        const url = `http://www.rp-nicks.aa-roleplay.ru/index.php?gender=${gender}&nation=${nation}&name=&surname=`;

            request(url, function (error, response, body) {
               if (!error) {
                  var $ = cheerio.load(body)

                  let full = $('body').text();
                  let name = /имя: [a-zA-Z_]{2,}/gi;
                  let text = full.match(/имя: [a-zA-Z_]{2,}/gi)[0];
                  let nick = text.replace(/имя: /gi, "");
          
                  let embed = new RichEmbed()
                  embed.setAuthor(`Генератор РП ников`, vmpimg)
                  embed.setColor('RANDOM')
                  embed.setDescription(`Вам наверняка подойдёт это имя:\n\`\`\`css
${nick}
\`\`\``)
                  if (gender === 'male') {
                     embed.addField('Пол', `Мужской`, true)
                  } else if (gender === 'female') {
                     embed.addField('Пол', `Женский`, true)
                  } else {
                     embed.addField('Пол', `${gender}`, true)
                  }
                 
                  if (nation === 'american') {
                     embed.addField('Тип', `Американский`, true)
                     embed.setThumbnail("https://i.imgur.com/C2otJbb.png")
                  } else if (nation === 'russian') {
                     embed.addField('Тип', `Русский`, true)
                     embed.setThumbnail("https://i.imgur.com/MnaGs9V.png")
                  } else if (nation === 'japanese') {
                     embed.setThumbnail("https://i.imgur.com/gakNcoU.png")
                     embed.addField('Тип', `Японский`, true)
                  } else if (nation === 'italian') {
                     embed.setThumbnail("https://i.imgur.com/fsy0wHv.png")
                     embed.addField('Тип', `Итальянский`, true)
                  } else if (nation === 'latinos') {
                     embed.setThumbnail("https://i.imgur.com/nt0WnrC.png")
                     embed.addField('Тип', `Латинский (Испанский)`, true)
                  } else if (nation === 'french') {
                     embed.setThumbnail("https://i.imgur.com/h4CXbY0.png")
                     embed.addField('Тип', `Французский`, true)
                  } else if (nation === 'swedish') {
                     embed.setThumbnail("https://i.imgur.com/TCx3KpU.png")
                     embed.addField('Тип', `Шведский`, true)
                  } else if (nation === 'german') {
                     embed.setThumbnail("https://i.imgur.com/1tXh3iE.png")
                     embed.addField('Тип', `Немецкий`, true)
                  } else if (nation === 'danish') {
                     embed.setThumbnail("https://i.imgur.com/U9ODM3u.png")
                     embed.addField('Тип', `Датский`, true)
                  } else if (nation === 'romanian') {
                     embed.setThumbnail("https://i.imgur.com/m0DMsPb.png")
                     embed.addField('Тип', `Румынский`, true)
                  } else {
                     embed.addField('Тип', `${nation}`, true)
                  }
                  return msg.embed(embed);
            
               } else {
                  return msg.say(error.stack);
               }
            });
    }
};