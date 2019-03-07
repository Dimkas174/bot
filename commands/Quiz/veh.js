const { Command } = require('discord.js-commando'),
      got = require('got'),
      { RichEmbed } = require('discord.js'),
      API_KEY = 'dc6zaTOxFJmzC',
      quiz = require('../../assets/json/car');

module.exports = class VehCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'veh',
            aliases: ['car', 'транспорт', 'авто', 'кар'],
            group: 'quiz',
            memberName: 'veh',
            description: 'Викторина на тему транспорта из GTA 5.',
            examples: ['veh'],
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
                duration: 60
            },
        });
    }

    async run(msg) {
        msg.react('🚗');

        if (msg.guild.id === '548383798425813012') {
            if (msg.channel.id === '551009249556430850') {
 
                const text = 'Congratulations'
                const res = await got(`http://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${encodeURIComponent(text)}`, { json: true });
                        
                const item = quiz[Math.floor(Math.random() * quiz.length)];
                const linkCheck = /https?:\/\/.+\.(?:png|jpg|jpeg)/gi;
                const img = item.question.match(linkCheck)
                const filter = response => {
                    return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
                };
                let embed = new RichEmbed()
                .setColor('RANDOM')
                .setTitle("Какое название у данного т/c?")
                .addField("✴ ✴ ✴", `[Если изображение не появилось, нажмите на данный текст!](${img})`, true)
                .setThumbnail('http://i.yapx.ru/B4JW4.gif')
                .setImage(`${img} `)  // Нижнее изображение
                .setFooter("У вас есть 30 секунд на ответ!", this.client.user.displayAvatarURL)
                msg.embed(embed).then(() => {
                    msg.channel.awaitMessages(filter, { maxMatches: 1, time: 30000, errors: ['время'] })
                    .then(collected => {
                        let embed = new RichEmbed()
                        embed.setColor('RANDOM')
                        embed.setDescription(`🎉 ${collected.first().author} ответил верно! 🎉`)
                        if (this.client.info.has(collected.first().author.id)) {
                            let ava = this.client.info.get(collected.first().author.id).gifava;
                            embed.setThumbnail(ava)
                        } else {
                            embed.setThumbnail(collected.first().author.displayAvatarURL)
                        }
                        embed.addField("Правильные ответы", item.answers, true)
                        if (!res || !res.body || !res.body.data) {
                            embed.setImage(`https://media1.tenor.com/images/4f586b8d5cdc536ada9889b58e6d91e8/tenor.gif`)
                        } else { 
                            embed.setImage(res.body.data.image_url)
                        }
                        embed.setFooter("Вы сново сможете использовать команду /car спустя 30 секунд после предыдущей!", this.client.user.displayAvatarURL)
                        msg.embed(embed);             
                    })
                    .catch(collected => {
                        let embed = new RichEmbed()
                        .setColor('RANDOM')
                        .setTitle(`🤷 Никто не ответил! 🤷`)
                        .addField("Правильные ответы:", item.answers, true)
                        .setThumbnail(`${img} `)
                        .setFooter("Вы сново можете использовать команду /car ", this.client.user.displayAvatarURL)
                        msg.embed(embed);
                    });
                });
            } else {
                setTimeout(() => msg.delete(), 1000);
                var _message = await msg.say(msg.author + ` **Используйте канал <#551009249556430850> для данной команды!**`)
                setTimeout(() => _message.delete(), 60000);
            }
        } else {
            const text = 'Congratulations'
            const res = await got(`http://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${encodeURIComponent(text)}`, { json: true });
          
            const item = quiz[Math.floor(Math.random() * quiz.length)];
            const linkCheck = /https?:\/\/.+\.(?:png|jpg|jpeg)/gi;
            const img = item.question.match(linkCheck)
            const filter = response => {
                return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
            };
            let embed = new RichEmbed()
            .setColor('RANDOM')
            .setTitle("Какое название у данного т/c?")
            .addField("*", `[Если изображение не появилось, нажмите на данный текст!](${img})`, true)
            .setThumbnail('http://i.yapx.ru/B4JW4.gif')
            .setImage(`${img} `)  // Нижнее изображение
            .setFooter("У вас есть 30 секунд на ответ!", this.client.user.displayAvatarURL)
            msg.embed(embed).then(() => {
                msg.channel.awaitMessages(filter, { maxMatches: 1, time: 30000, errors: ['время'] })
                .then(collected => {
                    let embed = new RichEmbed()
                    embed.setColor('RANDOM')
                    embed.setDescription(`🎉 ${collected.first().author} ответил верно! 🎉`)
                    if (this.client.info.has(collected.first().author.id)) {
                        let ava = this.client.info.get(collected.first().author.id).gifava;
                        embed.setThumbnail(ava)
                    } else {
                        embed.setThumbnail(collected.first().author.displayAvatarURL)
                    }
                    embed.addField("Правильные ответы", item.answers, true)
                    if (!res || !res.body || !res.body.data) {
                        embed.setImage(`https://media1.tenor.com/images/4f586b8d5cdc536ada9889b58e6d91e8/tenor.gif`)
                    } else { 
                        embed.setImage(res.body.data.image_url)
                    }
                    embed.setFooter("Вы сново сможете использовать команду /car спустя 30 секунд после предыдущей!", this.client.user.displayAvatarURL)
                    msg.embed(embed);
                })
                .catch(collected => {
                    let embed = new RichEmbed()
                    .setColor('RANDOM')
                    .setTitle(`🤷 Никто не ответил! 🤷`)
                    .addField("Правильные ответы:", item.answers, true)
                    .setThumbnail(`${img} `)
                    .setFooter("Вы сново можете использовать команду /car ", this.client.user.displayAvatarURL)
                    msg.embed(embed);
                });
            });
        }
    }
};