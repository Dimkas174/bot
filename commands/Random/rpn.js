const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js'),
      request = require('request'),
      cheerio = require('cheerio'),
      vmpimg = 'https://i.imgur.com/r9ItZ6p.gif';

module.exports = class RpnCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'rpn',
            aliases: ['рпн'],
            group: 'random',
            memberName: 'rpn',
            description: 'Рандомный, мужской RP ник.',
            examples: ['rpn'],
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
                duration: 5
            },
        });
    }

    async run(msg) {
        msg.react('👌');
      
      let embed = new RichEmbed()
                  embed.setAuthor(`Генератор РП ников`, this.client.user.displayAvatarURL)
                  embed.setColor('RANDOM')
                  embed.setDescription(`Выберите флаг нажав на emoji под данным сообщением в течение минуты!`)
                  var mes2 = await msg.reply({embed});
                  await mes2.react('🇺🇸')
                  await mes2.react('🇪🇸')
                  await mes2.react('🇯🇵')
                  await mes2.react('🇮🇹')
                  await mes2.react('🇷🇺')
                  await mes2.react('🇫🇷')
                  await mes2.react('🇸🇪')
                  await mes2.react('🇩🇪')
                  await mes2.react('🇩🇰')
                  await mes2.react('🇷🇴')
                  await mes2.react('🏳️‍🌈')
                      
                  const collector = mes2.createReactionCollector((reaction, user) => reaction.emoji.name === '🇷🇺' || reaction.emoji.name === '🇺🇸' || reaction.emoji.name === '🇯🇵' || reaction.emoji.name === '🇮🇹' || reaction.emoji.name === '🇫🇷' || reaction.emoji.name === '🇸🇪' || reaction.emoji.name === '🇩🇪' || reaction.emoji.name === '🇩🇰'  || reaction.emoji.name === '🇷🇴' || reaction.emoji.name === '🇪🇸' && user.id == msg.author.id, {time: 60000})
                  collector.on('collect', async r => {
                    switch(r.emoji.name) {
                      case '🇷🇺':
                        
                      var url = `http://www.rp-nicks.aa-roleplay.ru/index.php?gender=male&nation=russian&name=&surname=`;
                        
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
                          embed.setThumbnail("https://i.imgur.com/MnaGs9V.png")
                          return msg.say(embed);
                        } else {
                           return msg.say(error.stack);
                        }
                      });
                      break
                      
                      case '🇺🇸':
                      var url = `http://www.rp-nicks.aa-roleplay.ru/index.php?gender=male&nation=american&name=&surname=`;
                        
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
                          embed.setThumbnail("https://i.imgur.com/C2otJbb.png")
                          return msg.say(embed);
                        } else {
                           return msg.say(error.stack);
                        }
                      });
                      break
                      
                      case '🇯🇵':
                      var url = `http://www.rp-nicks.aa-roleplay.ru/index.php?gender=male&nation=japanese&name=&surname=`;
                        
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
                          embed.setThumbnail("https://i.imgur.com/gakNcoU.png")
                          return msg.say(embed);
                          } else {
                           return msg.say(error.stack);
                        }
                      });  
                      break
                      
                      case '🇮🇹':
                      var url = `http://www.rp-nicks.aa-roleplay.ru/index.php?gender=male&nation=italian&name=&surname=`;
                        
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
                          embed.setThumbnail("https://i.imgur.com/fsy0wHv.png")
                          return msg.say(embed);
                          } else {
                           return msg.say(error.stack);
                        }
                      });  
                      break
                      
                      case '🇫🇷':
                      var url = `http://www.rp-nicks.aa-roleplay.ru/index.php?gender=male&nation=french&name=&surname=`;
                        
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
                          embed.setThumbnail("https://i.imgur.com/h4CXbY0.png")
                          return msg.say(embed);
                          } else {
                           return msg.say(error.stack);
                        }
                      });  
                      break
                      
                      case '🇸🇪':
                      var url = `http://www.rp-nicks.aa-roleplay.ru/index.php?gender=male&nation=swedish&name=&surname=`;
                        
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
                          embed.setThumbnail("https://i.imgur.com/TCx3KpU.png")
                          return msg.say(embed);
                          } else {
                           return msg.say(error.stack);
                        }
                      });
                      break
                      
                      case '🇩🇪':
                      var url = `http://www.rp-nicks.aa-roleplay.ru/index.php?gender=male&nation=german&name=&surname=`;
                        
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
                          embed.setThumbnail("https://i.imgur.com/1tXh3iE.png")
                          return msg.say(embed);
                          } else {
                           return msg.say(error.stack);
                        }
                      });  
                      break
                      
                      case '🇩🇰':
                      var url = `http://www.rp-nicks.aa-roleplay.ru/index.php?gender=male&nation=danish&name=&surname=`;
                        
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
                          embed.setThumbnail("https://i.imgur.com/U9ODM3u.png")
                          return msg.say(embed);
                          } else {
                           return msg.say(error.stack);
                        }
                      });
                      break
                  
                      case '🇷🇴':
                      var url = `http://www.rp-nicks.aa-roleplay.ru/index.php?gender=male&nation=romanian&name=&surname=`;
                        
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
                          embed.setThumbnail("https://i.imgur.com/m0DMsPb.png")
                          return msg.say(embed);
                          } else {
                           return msg.say(error.stack);
                        }
                      });
                      break
                      
                      case '🇪🇸':
                      var url = `http://www.rp-nicks.aa-roleplay.ru/index.php?gender=male&nation=latinos&name=&surname=`;
                        
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
                          embed.setThumbnail("https://i.imgur.com/nt0WnrC.png")
                          return msg.say(embed);
                          } else {
                           return msg.say(error.stack);
                        }
                      });
                      break
                    }
                  })
        
                  collector.on('end', async () => {
                  })
    }
};