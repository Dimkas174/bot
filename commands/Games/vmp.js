const { Command } = require('discord.js-commando'),
      request = require('node-superfetch'),
      { RichEmbed } = require('discord.js'),
      welcomeimg = require('../../assets/json/welcomeimg');

async function statusVmpAlpha() {
    const { body } = await request.get("http://185.71.66.105:4490/health");
    return body;
}; 

async function statusVmpBeta() {
    const { body } = await request.get("http://185.71.66.105:4491/health");
    return body;
};  

module.exports = class VmpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'vmp',
            aliases: ['статус', 'status'],
            group: 'games',
            memberName: 'vmp',
            description: 'Статус V-MP сервера.',
            examples: ['vmp <01|02>'],
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
                duration: 300
            },
            args: [
                {
                    key: 'server',
                    prompt: 'Выберите сервер. Введите \`alpha\` или \`бета\` \nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
                    type: 'string',
                    oneOf: ["01", "02"],
                    default: ''
                }
              ]
        });
    }

    async run(msg, { server }) {
        msg.react('👌');
      
      if (!server) {
          try {
           const first = await statusVmpAlpha();
           const second = await statusVmpBeta();
           let randgif = welcomeimg[Math.floor(Math.random() * welcomeimg.length)];
          
           var embed = new RichEmbed()
            .setColor('#008000')
            .setAuthor("Мониторинг серверов V-MP.ru", this.client.user.displayAvatarURL)
            .setThumbnail(this.client.user.displayAvatarURL)
            .addField("Server 01 [TEXT PRIORITY]:", `\`\`\`js\r\n${first.Players}/${first.MaxPlayers}\r\n\`\`\``, true)
            .addField("IP адрес Server 01:", '```js\r\n185.71.66.105 порт: 4491\r\n```', true)
            .addField("Server 02 [VOICE CHAT]:", `\`\`\`js\r\n${second.Players}/${second.MaxPlayers}\r\n\`\`\``, true)
            .addField("IP адрес Server 02:", '```js\r\n185.71.66.105 порт: 4490\r\n```', true)
            .addField("Версия клиента:", `<#381114214489784331>`, true)
            .setImage(randgif)
            .setFooter("Запрос от " + msg.author.tag, msg.author.displayAvatarURL)
            .setTimestamp()
            msg.embed(embed)
            
          } catch(err) {
            return msg.reply("Для более точной информации введите **/vmp 01** или **/vmp 02**")
             }
        } else {
        
      if (server === '01') {
        try {
            const { body } = await request.get("http://185.71.66.105:4490/health");
   
            var embed = new RichEmbed()
            .setColor('#FF0000')
            .setAuthor("Server 01 [TEXT PRIORITY]", "https://i.imgur.com/Vxnj8DF.png")
            .setThumbnail("https://i.imgur.com/Vxnj8DF.png")
            .addField("Игроков/Слотов:", `\`\`\`js\r\n${body.Players}/${body.MaxPlayers}\r\n\`\`\``, true)
            .addField("IP адрес:", '```js\r\n185.71.66.105 порт: 4490\r\n```', true)
            .addField("Транспорта:", `${body.NetWorldStats.Entities.Vehicle}`, true)
            .addField("Меток:", `${body.NetWorldStats.Entities.Marker}`, true)
            .addField("Пикапов:", `${body.NetWorldStats.Entities.Pickup}`, true)
            .addField("Педов(нипов):", `${body.NetWorldStats.Entities.Ped}`, true)
            .addField("Маппинга:", `${body.NetWorldStats.Entities.Prop}`, true)
            .addField("Частиц:", `${body.NetWorldStats.Entities.Particle}`, true)
            .addField("Миров:", `${body.NetWorldStats.Entities.World}`, true)
            .addField("Значков на карте:", `${body.NetWorldStats.Entities.Blip}`)
            .addField("Прикреплённого текста:", `${body.NetWorldStats.Entities.TextLabel}`)
            .addField("Версия клиента:", `<#381114214489784331>`, true)
            .setFooter("Запрос от " + msg.author.tag, msg.author.displayAvatarURL)
            .setTimestamp()
            msg.embed(embed)
          
        } catch(err) {
            var embed = new RichEmbed()
            .setColor('#FF0000')
            .setAuthor("Server 01 [TEXT PRIORITY]", "https://i.imgur.com/Vxnj8DF.png")
            .setThumbnail("https://i.imgur.com/Vxnj8DF.png")
            .addField("Игроков/Слотов:", '```js\r\n0/500\r\n```', true)
            .addField("Статус:", '```md\r\n[-]: offline\r\n```', true)
            .addField("IP адрес:", '```js\r\n185.71.66.105 порт: 4490\r\n```', true)
            .addField("Версия клиента:", `<#381114214489784331>`, true)
            .setFooter("Запрос от " + msg.author.tag, msg.author.displayAvatarURL)
            .setTimestamp()
            return msg.embed(embed)
        }
        
      } else if (server === '02') {
        try {
            const { body } = await request.get("http://185.71.66.105:4491/health");
   
            var embed = new RichEmbed()
            .setColor('FFA500')
            .setAuthor("Server 02 [VOICE CHAT]", "https://i.imgur.com/EuU0ndQ.png")
            .setThumbnail("https://i.imgur.com/EuU0ndQ.png")
            .addField("Игроков/Слотов:", `\`\`\`js\r\n${body.Players}/${body.MaxPlayers}\r\n\`\`\``, true)
            .addField("IP адрес:", '```js\r\n185.71.66.105 порт: 4491\r\n```', true)
            .addField("Транспорта:", `${body.NetWorldStats.Entities.Vehicle}`, true)
            .addField("Меток:", `${body.NetWorldStats.Entities.Marker}`, true)
            .addField("Пикапов:", `${body.NetWorldStats.Entities.Pickup}`, true)
            .addField("Педов(нипов):", `${body.NetWorldStats.Entities.Ped}`, true)
            .addField("Маппинга:", `${body.NetWorldStats.Entities.Prop}`, true)
            .addField("Частиц:", `${body.NetWorldStats.Entities.Particle}`, true)
            .addField("Миров:", `${body.NetWorldStats.Entities.World}`, true)
            .addField("Значков на карте:", `${body.NetWorldStats.Entities.Blip}`)
            .addField("Прикреплённого текста:", `${body.NetWorldStats.Entities.TextLabel}`)
            .addField("Версия клиента:", `<#381114214489784331>`, true)
            .setFooter("Запрос от " + msg.author.tag, msg.author.displayAvatarURL)
            .setTimestamp()
            msg.embed(embed)
        } catch(err) {
            var embed = new RichEmbed()
            .setColor('#FFA500')
            .setAuthor("Server 02 [VOICE CHAT]", "https://i.imgur.com/EuU0ndQ.png")
            .setThumbnail("https://i.imgur.com/EuU0ndQ.png")
            .addField("Игроков/Слотов:", '```js\r\n0/500\r\n```', true)
            .addField("Статус:", '```md\r\n[-]: offline\r\n```', true)
            .addField("IP адрес:", '```js\r\n185.71.66.105 порт: 4491\r\n```', true)
            .addField("Версия клиента:", `<#381114214489784331>`, true)
            .setFooter("Запрос от " + msg.author.tag, msg.author.displayAvatarURL)
            .setTimestamp()
            return msg.embed(embed)
        }
       }
      }   
     }
};