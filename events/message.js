const Discord = require('discord.js'),
      fs = require('fs'),
      cleverbot = require("cleverbot.io"),
      prefix = '/',
      bot = new cleverbot(process.env.CBIO_API_USER, process.env.CBIO_API_KEY),
      { wordTrans } = require('custom-translate'),
      dictionary = require('../assets/json/dictionary.json'),
      lossantos = require('../assets/json/lossantos'),
      vehgta = require('../assets/json/vehgta'),
      swearwords = require('../assets/json/swearwords'),
      biz = require('../assets/json/biz'),
      moment = require('moment'),
      got = require('got'),
      cheerio = require('cheerio'),
      superfetch = require('node-superfetch'),
      request = require('request'),
      db = require('quick.db');

function getText(children) {
    if (children.children) return getText(children.children);
    return children.map(c => {
        return c.children ? getText(c.children) : c.data;
    }).join('');
}

const responseObject = {
  "Jan": "01",
  "Feb": "02",
  "Mar": "03",
  "Apr": "04",
  "May": "05",
  "Jun": "06",
  "Jul": "07",
  "Aug": "08",
  "Sep": "09",
  "Oct": "10",
  "Nov": "11",
  "Dec": "12"
};

function greyscale(ctx, x, y, width, height) {
		const data = ctx.getImageData(x, y, width, height);
		for (let i = 0; i < data.data.length; i += 4) {
			const brightness = (0.34 * data.data[i]) + (0.5 * data.data[i + 1]) + (0.16 * data.data[i + 2]);
			data.data[i] = brightness;
			data.data[i + 1] = brightness;
			data.data[i + 2] = brightness;
		}
		ctx.putImageData(data, x, y);
		return ctx;
}

const frames = [
	'(-°□°)-  ┬─┬',
	'(╯°□°)╯    ]',
	'(╯°□°)╯  ︵  ┻━┻',
	'(╯°□°)╯       [',
	'(╯°□°)╯           ┬─┬'
];

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var hookhome02 = new Discord.WebhookClient('551050187213242369', 'iESMheRBf_bqbpjZPMdEaEfAWEPk5FUuLHuGiwjw2w8Gz5U-glKVfQEWmW3Nnfaqru59'); // .дома 02
var hookhome01 = new Discord.WebhookClient('551046190318223366', 'DclRhq-ut_PlyiJKpnEC8wnyhwEX8jZ3L0icxrWpNSsPdybdF4Tc5GHjmxs7ZNIWaFGx'); // .дома 01
var hookcar02 = new Discord.WebhookClient('551050700352651302', 'RJXG-SRwL4cFko33juupMPJs0PLkBcb7aNi6p8j1l4-B0ID97I8z3Wg5OK7ewIewAMdG'); // .транспорт 02
var hookcar01 = new Discord.WebhookClient('551045222956531752', 'h3QT2aoAagQv73q3726-OO5tNzdbivNJBFK2CPXsv9G4Tt0QHHVu6-5cP6yxy6_Ko1c8'); // .транспорт 01
var hookmar02 = new Discord.WebhookClient('551057723983134726', '9z8KobL7yA3ox2BtrB1zGGchR4uumArmFrN24gBcmyWZ_Zhj5iY-7ooC4Rc_1rhgYcHA'); // .чёрный рынок травка 02
var hookmar01 = new Discord.WebhookClient('551051221956558851', 'AhsQpFINc6pokM_QlNerkpXZI21nHdgO0UScsv75Zt046nKrUB1tGnTGLNs5QBu1EwH7'); // .чёрный рынок травка 01
var hookgun02 = new Discord.WebhookClient('551057556521615361', 'ZERvkcvFhf-B9IuZOVJEeMbtv0eOLkDdXSiiJyuEev5yX6E8bXVNC_0sbr1VEP0pvrkU'); // .чёрный рынок оружие 02
var hookgun01 = new Discord.WebhookClient('551050966351478806', 'Xws_i1C8qMfCG5rfXpuLpDxYT85vHM3a81BZQvZR1GhcY5AxO5o4jLWh9TvpWCTl_EpV'); // .чёрный рынок оружие 01
var hookbiz02 = new Discord.WebhookClient('542356273551769606', 'GyCLb7ozn1RRNd37AA6PGTomLYG9t_Gfv9gSp4PPxGWNFvr1no3cGRFdAzPSrc7agQ-j'); // бизнес 02
var hookbiz01 = new Discord.WebhookClient('542355676119433216', 'Ji1hLkFHRSoEGxozON3UYPs8f-YQbe_lYvhyv6TDR6A6TGg0elB5VEywjkhVgLnN3bw-'); // бизнес 01
var hooksim02 = new Discord.WebhookClient('551057986215215116', 'cdW7tHnshPdyDUN4Z_C2wkpHjFz0wN9HGGAWrGsEtax6rKG_ndzWzsIVQfuv1laAmXDN'); // .сим 02
var hooksim01 = new Discord.WebhookClient('551058359865049109', 'egfjpUDJu9_6g0bl7P6b1rQeI3hp7_f8rGMI53kRsM4EoTnQEbE-t1uaOQswOQ-W5J3J'); // .сим 01


module.exports = async (client, message) => {
  
    if(message.channel instanceof Discord.DMChannel) return;
    if(message.author === client.user) return;  // не реагировать на свои сообщения

    var Attachment = (message.attachments).array();
    const uriRegexp = /(https?:\/\/)?((w{3}\.)?(twitch|gaming\.youtube|youtube|youtu)\.[a-z]{2,6})(\/.*)?/imu;
    const linkImg = /https?:\/\/.+\.(?:png|jpg|jpeg|gif)/gi;
    const imyp = /https?:\/\/+(?:yapx.ru\/[a-z]\/|imgur.com\/[a-z]\/)[a-zA-Z0-9]{5,8}/gi;
    const inviteLink = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-zA-Z0-9]{5,8}/gi;
    const wH = /\?width=[0-9]{3,}&height=[0-9]{3,}/gi;
    const forumLink = /Подробнее по ссылке: http:\/\/www.forum.v-mp.ru\/index.php\?\/topic\/[a-zA-Z0-9-%]{1,}\//gi;
    const fl = /http:\/\/www.forum.v-mp.ru\/index.php\?\/topic\/[a-zA-Z0-9-%]{1,}\//gi;
    const gunGosPistol = /(?:combat|боев(?:ой|ые|ых)|pistol|пистолет(?:ов|ы)?) ?(?:pistol|пистолет(?:ов|ы)?|.50)/gi;
    const gunGosRifle = /carbine|карабин(?:ов|ы)?|rifle|винтовк(?:а|и|у)|ак(?:-| )?47|укороченны(?:е|й|х) (?:автомат(?:ов|ы)?|ак)|снайпер(?:ок|к(?:а|у|и))/gi;
    const gunGosShotgun = /(?:(?:sweeper|heavy|тяжелы(?:е|й|х)|assault|штурмов(?:ой|ы(?:е|х))|двухствольны(?:й|е|х)|bullpup|double ?barrel) ?(?:shotgun|дроб(?:аш(?:а|ей|и)?|овик(?:а|и|ов)?)|автомат(?:ов|ы)?)|двухстволк(?:а|и|у))/gi;
    const author = message.author;

    const phone1 = await db.fetch(`phone1_${message.guild.id}_${message.author.id}`);
    const phone2 = await db.fetch(`phone2_${message.guild.id}_${message.author.id}`);

    // 👍 под ссылками YT, YTG и Twitch
    if (message.content.match(uriRegexp)) {  
        await message.react('👍');   
    }

    if (message.content.match(inviteLink) || message.content.match(gunGosPistol) || message.content.match(gunGosShotgun) || message.content.match(gunGosRifle)) {
        if (message.author.bot) return;
        let role = message.guild.roles.find(r => r.name === "WARN");
        let member = message.member
        if (message.member.roles.some(r=>["Гл. Админ Барахолки", "Админ Барахолки", "Модератор Барахолки", "Partners", "Support"].includes(r.name)) ) return;
        if (message.content.match(gunGosPistol) || message.content.match(gunGosShotgun) || message.content.match(gunGosRifle)) {
            if (message.channel.id === '535023977794371584' || message.channel.id === '535024081163124736' || message.channel.id === '535024340425506828' || message.channel.id === '535023851344494595' || message.channel.id === '535011115101323277') {
                if (message.member.roles.find(r => r.id === "535026740477689867")) {
                    message.member.kick();
                    message.delete();
                    var _message = await message.channel.send(`<@` + message.author.id + `> был кикнут с сервера, так как уже имея предупреждения снова нарушил правила.`);
                    setTimeout(() => _message.delete(), 180000);
                    return client.channels.find(c => c.id === '535041626041483284').send(`<@` + message.author.id + `> был кикнут с сервера, так как уже имел предупреждение. \r\n**Его объявление:** \`${message.content}\``);
                } else {
                    member.addRole(role).catch(console.error);
                    message.delete();
                    var _message = await message.channel.send(`<@` + message.author.id + `> !!! Вы нарушили правило сервера! Запрещено публиковать объявления о покупке/продаже оружия которого не может быть на складах банд или байкеров! Вам выдано предупреждение. В следующий раз последует кик и бан!`);
                    setTimeout(() => _message.delete(), 180000);
                    return client.channels.find(c => c.id === '535041626041483284').send(`<@` + message.author.id + `> получил предупреждение. **Причина:** размещение объявления на оружие которого не может быть на складах банд или байкеров.  \r\n**Его объявление:** \`${message.content}\``);
                }
            }
        } else if (message.content.match(inviteLink)) {
            if (message.member.roles.find(r => r.id === "455697034851385347")) {
                message.member.kick();
                message.delete();
                var _message = await message.channel.send(`<@` + message.author.id + `> был кикнут с сервера, так как уже имея предупреждения снова нарушил правила.`);
                setTimeout(() => _message.delete(), 180000);
                return client.channels.find(c => c.id === '535041626041483284').send(`<@` + message.author.id + `> был кикнут с сервера, так как уже имел предупреждение. \r\n**Его объявление:** \`${message.content}\``);
            } else {
                member.addRole(role).catch(console.error);
                var _message = await message.channel.send(`<@` + message.author.id + `> !!! Вы нарушили правило сервера! Запрещено публиковать ссылки на сторонние сервера Discord! Вам выдано предупреждение. В следующий раз последует кик и бан!`);
                setTimeout(() => _message.delete(), 180000);
                return client.channels.find(c => c.id === '535041626041483284').send(`<@` + message.author.id + `> получил предупреждение. **Причина:** размещение ссылки на другой сервер Discord.  \r\n**Его объявление:** \`${message.content}\``);
            }
        }

    // 👍 под ссылками jpg, png
    } else if (message.content.match(linkImg)) {  
        if (message.channel.id === '548500621049987122' || message.channel.id === '548500690826166296' || message.channel.id === '548500737534197760' || 
            message.channel.id === '548500799706234901' || message.channel.id === '548500868186767391' || message.channel.id === '548500926915149854' || 
            message.channel.id === '548393945516998677' || message.channel.id === '548394064379248660' || message.channel.id === '548394113373044749' || 
            message.channel.id === '548394178124709900' || message.channel.id === '548394244839309313' || message.channel.id === '548394288267132929') {
          
            setTimeout(() => message.delete(), 2000);
          
            let ginterval1 = await db.fetch(`ginterval1_${message.guild.id}_${message.channel.id}`);
            if (ginterval1 == null) ginterval1 = 0;

            let minterval1 = await db.fetch(`minterval1_${message.channel.id}_${message.author.id}`);
            if (minterval1 == null) minterval1 = ginterval1;
      
            if (minterval1 > ginterval1) {
              let pinterval = minterval1 - ginterval1
              return message.reply(`Вы отправляете объявление слишком часто! Подождите **${pinterval}** объявлений от других участников!`).then(m => m.delete(30000));
          
        } else {
              
            let img = message.content.match(linkImg)[0];
                let text = message.content.replace(linkImg, "");

                let embed = new Discord.RichEmbed()

                if (message.content.match(/красн(?:о|ый)|red/i)) { 
                    embed.setColor('0xFF0000')
                } else if (message.content.match(/ч(?:е|ё)рн(?:о|ый)|black/i)) {
                    embed.setColor('0x000000')
                } else if (message.content.match(/сер(?:о|ый)|gray/i)) {
                   embed.setColor('0x808080')
                } else if (message.content.match(/серебрянн?(?:о|ый)|silver/i)) { 
                   embed.setColor('0xC0C0C0')
                } else if (message.content.match(/бел(?:о|ый)|white/i)) {
                   embed.setColor('0xFFFFFF')
                } else if (message.content.match(/розов(?:о|ый)|fuchsia/i)) {
                   embed.setColor('0xFF00FF')
                } else if (message.content.match(/ж(?:о|ё|е)лт(?:о|ый)|yellow/i)) {
                   embed.setColor('0xFFFF00')
                } else if (message.content.match(/зелён(?:о|ый)|green/i)) {
                   embed.setColor('0x008000')
                } else if (message.content.match(/голубой?|aqua/i)) {
                   embed.setColor('0x00FFFF')
                } else if (message.content.match(/син(?:е|ий)|blue/i)) {
                   embed.setColor('0x0000FF')
                } else if (message.content.match(/коричнев(?:о|ый)|brown/i)) {
                   embed.setColor('0x8B4513')
          
                } else {
                    let color = message.member.displayHexColor;
                    if (color == '#000000') {
                        color = 0x36393e;
                    } else if (message.member.roles.find(r => r.name === "Администрация")) {
                        embed.setColor('#FF6347')
                    } else if (message.member.roles.find(r => r.name === "Модератор")) {
                        embed.setColor('#008000')
                    } else if (message.member.roles.find(r => r.name === "VIP")) {
                        embed.setColor('#4caef1')
                    } else if (color) {
                        embed.setColor('RANDOM')
                    } else if (message.member.roles.some(r=>["Барахольщик новичок", "Барахольщик", "Опытный барахольщик", "Продвинутый барахольщик"].includes(r.name)) ) {
                        if (message.member.roles.find(r => r.name === "Модератор")) {
                            embed.setColor('0x00FF00')
                        } else {
                            embed.setColor(0x36393e)
                        }
                    } else {
                        embed.setColor(color)
                    }
                }

                if (text.match(fl)) {
                    let fL = text.match(fl)[0];
                    embed.addField('Тема на форуме: ', '[Ссылка на форум (кликабельно)](' + fL + ')', true)
                }

                if (text.match(/```(?:md|Markdown)/gi)) {
                    if (text.match(wH)) {
                        let textb = text.replace(wH, "");
                        if (textb.match(forumLink)) {
                            let textbc = textb.replace(forumLink, "");
                            embed.setDescription(wordTrans(textbc, dictionary))
                        } else {
                            embed.setDescription(wordTrans(text, dictionary))
                        }
                    } else {
                        embed.setDescription(wordTrans(text, dictionary))
                    }
                } else if (text.match(/```/gi)) {
                    let texta = text.replace(/```/gi, "");
                    if (texta.match(wH)) {
                        let textab = texta.replace(wH, "");
                        if (textab.match(forumLink)) {
                            let textabc = textab.replace(forumLink, "");
                            embed.setDescription(wordTrans('```md\r\n' + textabc + '\r\n```', dictionary))
                        } else {
                            embed.setDescription(wordTrans('```md\r\n' + textab + '\r\n```', dictionary))
                        }
                    } else if (texta.match(forumLink)) {
                        let textac = texta.replace(forumLink, "");
                        embed.setDescription(wordTrans('```md\r\n' + textac + '\r\n```', dictionary))
                    } else {
                        embed.setDescription(wordTrans('```md\r\n' + texta + '\r\n```', dictionary))
                    }
                } else if (text.match(/\[|]/gi)) {
                    if (text.match(wH)) {
                        let textb = text.replace(wH, "");
                        if (textb.match(forumLink)) {
                            let textbc = textb.replace(forumLink, "");
                            embed.setDescription(wordTrans('```md\r\n' + textbc + '\r\n```', dictionary))
                        } else {
                            embed.setDescription(wordTrans(text, dictionary))
                        }
                    } else if (text.match(forumLink)) {
                        let textc = text.replace(forumLink, "");
                        embed.setDescription(wordTrans('```md\r\n' + textc + '\r\n```', dictionary))
                    } else {
                        embed.setDescription(wordTrans('```md\r\n' + text + '\r\n```', dictionary))
                    }
                } else if (text.match(wH)) {
                    let textb = text.replace(wH, "");
                    embed.setDescription(wordTrans(textb, dictionary))
                } else if (text.match(forumLink)) {
                    let textc = text.replace(forumLink, "");
                    embed.setDescription(wordTrans(textc, dictionary))
                } else {
                    embed.setDescription(wordTrans(text, dictionary))
                }
      
                embed.addField("Контакты: ", `<@${message.author.id}> \n\`@${message.author.tag}\``, false)
      
                if (message.member.roles.has("💎VIP")) {
                    embed.addField("✴  ✴  ✴", `💎VIP"`, true)
                }
              
                embed.setThumbnail(message.author.displayAvatarURL)
                embed.setTimestamp()
              
                if (message.content.match(/https?:\/\/.+\.gifv/gi)) {
                  let msg_1 = await message.channel.send(`✴  ✴  ✴`, {embed});
                  let msg_2 = await message.channel.send(`${img} `);
                  
                  await msg_2.react('⚙');
              
                    var _message = await message.reply("||Если вы желаете удалить своё объявление, то нажмите на ⚙ под ним в течении минуты.||");
                    setTimeout(() => _message.delete(), 30000);
                  
                   const hcollector = msg_2.createReactionCollector((reaction, user) => reaction.emoji.name === '⚙' && user.id == message.author.id, {time: 60000})
 
                   hcollector.on('collect', async r => {
                     let ruser = r.users.array()[1]

                     if (r.emoji.name === '⚙') {
                       await setTimeout(() => msg_1.delete(), 2000);
                       await setTimeout(() => msg_2.delete(), 2000);
                       await r.remove(ruser)
                       db.set(`minterval1_${message.channel.id}_${message.author.id}`, ginterval1)
                       return;
                     }
                   })
              
                   hcollector.on('end', async r => {
                     if (r.size === 0) {
                       await msg_2.clearReactions();
                     }
                   });

                } else {
                   embed.setImage(`${img} `)
                   let msg_ = await message.channel.send(`<a:dae67631234507:583585937812881409> <a:dae67631234507:583585937812881409> <a:dae67631234507:583585937812881409>`, {embed});
                   
                   await msg_.react('⚙');
              
                    var _message = await message.reply("||Если вы желаете удалить своё объявление, то нажмите на ⚙ под ним в течении минуты.||");
                    setTimeout(() => _message.delete(), 30000);
              
                   const hcollector = msg_.createReactionCollector((reaction, user) => reaction.emoji.name === '⚙' && user.id == message.author.id, {time: 60000})
 
                   hcollector.on('collect', async r => {
                     let ruser = r.users.array()[1]

                     if (r.emoji.name === '⚙') {
                       await setTimeout(() => msg_.delete(), 2000);
                       db.set(`minterval1_${message.channel.id}_${message.author.id}`, ginterval1)
                       return;
                     }
                   })
              
                    hcollector.on('end', async r => {
                        if (r.size === 0) {
                            await msg_.clearReactions();
                        }
                    });
                } 
               
         
                //===========Прибавление количества сообщений в канале============// 
                db.add(`ginterval1_${message.guild.id}_${message.channel.id}`, 1)
          
                //===========обновление интервала для участника============// 
                if (message.member.roles.has("💎VIP")) {
                    db.set(`minterval1_${message.channel.id}_${message.author.id}`, ginterval1 + 4)
                } else {
                    db.set(`minterval1_${message.channel.id}_${message.author.id}`, ginterval1 + 6)
                }
            }
        }

    // 👍 под косвенными ссылками на imgur и yapix
    } else if (message.content.match(imyp)) {  
        if (message.member.guild.id === "222674909858496512") return;
          
        if (message.channel.id === '548500621049987122' || message.channel.id === '548500690826166296' || message.channel.id === '548500737534197760' || 
            message.channel.id === '548500799706234901' || message.channel.id === '548500868186767391' || message.channel.id === '548500926915149854' || 
            message.channel.id === '548393945516998677' || message.channel.id === '548394064379248660' || message.channel.id === '548394113373044749' || 
            message.channel.id === '548394178124709900' || message.channel.id === '548394244839309313' || message.channel.id === '548394288267132929') {

            setTimeout(() => message.delete(), 2000);
  
            let ginterval1 = await db.fetch(`ginterval1_${message.guild.id}_${message.channel.id}`);
            if (ginterval1 == null) ginterval1 = 0;

            let minterval1 = await db.fetch(`minterval1_${message.channel.id}_${message.author.id}`);
            if (minterval1 == null) minterval1 = ginterval1;
  
            if (minterval1 > ginterval1) {
                let pinterval = minterval1 - ginterval1
                return message.reply(`Вы отправляете объявление слишком часто! Подождите **${pinterval}** объявлений от других участников!`).then(m => m.delete(30000)); 
      
            } else {
                
                let img = message.content.match(imyp)[0];
                let text = message.content.replace(imyp, "");
                
                let embed = new Discord.RichEmbed()

                if (message.content.match(/красн(?:о|ый)|red/i)) { 
                    embed.setColor('0xFF0000')
                } else if (message.content.match(/ч(?:е|ё)рн(?:о|ый)|black/i)) {
                    embed.setColor('0x000000')
                } else if (message.content.match(/сер(?:о|ый)|gray/i)) {
                   embed.setColor('0x808080')
                } else if (message.content.match(/серебрянн?(?:о|ый)|silver/i)) { 
                   embed.setColor('0xC0C0C0')
                } else if (message.content.match(/бел(?:о|ый)|white/i)) {
                   embed.setColor('0xFFFFFF')
                } else if (message.content.match(/розов(?:о|ый)|fuchsia/i)) {
                   embed.setColor('0xFF00FF')
                } else if (message.content.match(/ж(?:о|ё|е)лт(?:о|ый)|yellow/i)) {
                   embed.setColor('0xFFFF00')
                } else if (message.content.match(/зелён(?:о|ый)|green/i)) {
                   embed.setColor('0x008000')
                } else if (message.content.match(/голубой?|aqua/i)) {
                   embed.setColor('0x00FFFF')
                } else if (message.content.match(/син(?:е|ий)|blue/i)) {
                   embed.setColor('0x0000FF')
                } else if (message.content.match(/коричнев(?:о|ый)|brown/i)) {
                   embed.setColor('0x8B4513')
          
                } else {
                    let color = message.member.displayHexColor;
                    if (color == '#000000') {
                        color = 0x36393e;
                    } else if (message.member.roles.find(r => r.name === "Администрация")) {
                        embed.setColor('#FF6347')
                    } else if (message.member.roles.find(r => r.name === "Модератор")) {
                        embed.setColor('#008000')
                    } else if (message.member.roles.find(r => r.name === "VIP")) {
                        embed.setColor('#4caef1')
                    } else if (message.member.roles.some(r=>["Барахольщик новичок", "Барахольщик", "Опытный барахольщик", "Продвинутый барахольщик"].includes(r.name)) ) {
                        if (message.member.roles.find(r => r.name === "Модератор")) {
                            embed.setColor('0x00FF00')
                        } else {
                            embed.setColor(0x36393e)
                        }
                    } else {
                        embed.setColor(color)
                    }
                }
              
                embed.setThumbnail(message.author.displayAvatarURL)

                if (text.match(fl)) {
                    let fL = text.match(fl)[0];
                    embed.addField('Тема на форуме: ', '[Ссылка на форум (кликабельно)](' + fL + ')', true)
                }

                if (text.match(/```(?:md|Markdown)/gi)) {
                    if (text.match(wH)) {
                        let textb = text.replace(wH, "");
                        if (textb.match(forumLink)) {
                            let textbc = textb.replace(forumLink, "");
                            embed.setDescription(wordTrans(textbc, dictionary))
                        } else {
                            embed.setDescription(wordTrans(text, dictionary))
                        }
                    } else {
                        embed.setDescription(wordTrans(text, dictionary))
                    }
                } else if (text.match(/```/gi)) {
                    let texta = text.replace(/```/gi, "");
                    if (texta.match(wH)) {
                        let textab = texta.replace(wH, "");
                        if (textab.match(forumLink)) {
                            let textabc = textab.replace(forumLink, "");
                            embed.setDescription(wordTrans('```md\r\n' + textabc + '\r\n```', dictionary))
                        } else {
                            embed.setDescription(wordTrans('```md\r\n' + textab + '\r\n```', dictionary))
                        }
                    } else if (texta.match(forumLink)) {
                        let textac = texta.replace(forumLink, "");
                        embed.setDescription(wordTrans('```md\r\n' + textac + '\r\n```', dictionary))
                    } else {
                        embed.setDescription(wordTrans('```md\r\n' + texta + '\r\n```', dictionary))
                    }
                } else if (text.match(/\[|]/gi)) {
                    if (text.match(wH)) {
                        let textb = text.replace(wH, "");
                        if (textb.match(forumLink)) {
                            let textbc = textb.replace(forumLink, "");
                            embed.setDescription(wordTrans('```md\r\n' + textbc + '\r\n```', dictionary))
                        } else {
                            embed.setDescription(wordTrans(text, dictionary))
                        }
                    } else if (text.match(forumLink)) {
                        let textc = text.replace(forumLink, "");
                        embed.setDescription(wordTrans('```md\r\n' + textc + '\r\n```', dictionary))
                    } else {
                        embed.setDescription(wordTrans('```md\r\n' + text + '\r\n```', dictionary))
                    }
                } else if (text.match(wH)) {
                    let textb = text.replace(wH, "");
                    embed.setDescription(wordTrans(textb, dictionary))
                } else if (text.match(forumLink)) {
                    let textc = text.replace(forumLink, "");
                    embed.setDescription(wordTrans(textc, dictionary))
                } else {
                    embed.setDescription(wordTrans(text, dictionary))
                }
      
                embed.addField("Контакты: ", `<@${message.author.id}> \n\`@${message.author.tag}\``, false)
      
                if (message.member.roles.has("💎VIP")) {
                    embed.addField("✴  ✴  ✴", `💎VIP"`, true)
                }

                embed.setTimestamp()
    
                let msg_1 = await message.channel.send(`✴  ✴  ✴`, {embed});
                let msg_2 = await message.channel.send(`${img} `);
  
                //===========Прибавление количества сообщений в канале============// 
                db.add(`ginterval1_${message.guild.id}_${message.channel.id}`, 1)
          
                //===========обновление интервала для участника============// 
                if (message.member.roles.has("💎VIP")) {
                    db.set(`minterval1_${message.channel.id}_${message.author.id}`, ginterval1 + 4)
                } else {
                    db.set(`minterval1_${message.channel.id}_${message.author.id}`, ginterval1 + 6)
                }
              
                await msg_2.react('⚙');
              
                var _message = await message.reply("||Если вы желаете удалить своё объявление, то нажмите на ⚙ под ним в течении минуты.||");
                setTimeout(() => _message.delete(), 30000);
              
                const hcollector = msg_2.createReactionCollector((reaction, user) => reaction.emoji.name === '⚙' && user.id == message.author.id, {time: 60000})
 
                hcollector.on('collect', async r => {
                   let ruser = r.users.array()[1]

                   if (r.emoji.name === '⚙') {
                      await setTimeout(() => msg_1.delete(), 2000);
                      await setTimeout(() => msg_2.delete(), 2000);
                      db.set(`minterval1_${message.channel.id}_${message.author.id}`, ginterval1)
                      return;
                   }
                })
              
                hcollector.on('end', async r => {
                    if (r.size === 0) {
                        await msg_2.clearReactions();
                    }
                });
            }
        }

    } else if (message.channel.id === '548500621049987122' || message.channel.id === '548500690826166296' || message.channel.id === '548500737534197760' || 
            message.channel.id === '548500799706234901' || message.channel.id === '548500868186767391' || message.channel.id === '548500926915149854' || 
            message.channel.id === '548393945516998677' || message.channel.id === '548394064379248660' || message.channel.id === '548394113373044749' || 
            message.channel.id === '548394178124709900' || message.channel.id === '548394244839309313' || message.channel.id === '548394288267132929') {

        if (message.content.startsWith("sell") || message.content.startsWith("Продаётся") || message.content.startsWith("Sell") || 
            message.content.startsWith("Продается") || message.content.startsWith("Продажа") || message.content.startsWith("Продам") || 
            message.content.startsWith("продам") || message.content.startsWith("[Продам") || message.content.startsWith("[Куплю") || 
            message.content.startsWith("[ Продам") || message.content.startsWith("[ Куплю") || message.content.startsWith("Куплю") || 
            message.content.startsWith("куплю") || message.content.startsWith("Prodam") || message.content.startsWith("Продаю") || 
            message.content.startsWith("Рассмотрю варианты") || message.content.startsWith("Обменяю") || message.content.startsWith("Обмен") || 
            message.content.startsWith("**Продам**") || message.content.startsWith("**Куплю**") || message.content.startsWith("КУплю") || 
            message.content.startsWith("ПРодам") || message.content.startsWith("Ищу") || message.content.startsWith("Услуги") || 
            message.channel.id === '557967623619477524' || message.channel.id === '557967698756370452') {
      
            setTimeout(() => message.delete(), 2000);
          
            let ginterval1 = await db.fetch(`ginterval1_${message.guild.id}_${message.channel.id}`);
            if (ginterval1 == null) ginterval1 = 0;

            let minterval1 = await db.fetch(`minterval1_${message.channel.id}_${message.author.id}`);
            if (minterval1 == null) minterval1 = ginterval1;
          
            if (minterval1 > ginterval1) {
                let pinterval = minterval1 - ginterval1
                return message.reply(`Вы отправляете объявление слишком часто! Подождите **${pinterval}** объявлений от других участников!`).then(m => m.delete(30000)); 
          
            } else {
      
                let author = message.author;

        let embed = new Discord.RichEmbed()
            
        if (message.content.match(/красн(?:о|ый)|red/i)) { 
            embed.setColor('0xFF0000')
        } else if (message.content.match(/ч(?:е|ё)рн(?:о|ый)|black/i)) {
            embed.setColor('0x000000')
        } else if (message.content.match(/сер(?:о|ый)|gray/i)) {
            embed.setColor('0x808080')
        } else if (message.content.match(/серебрянн?(?:о|ый)|silver/i)) { 
            embed.setColor('0xC0C0C0')
        } else if (message.content.match(/бел(?:о|ый)|white/i)) {
            embed.setColor('0xFFFFFF')
        } else if (message.content.match(/розов(?:о|ый)|fuchsia/i)) {
            embed.setColor('0xFF00FF')
        } else if (message.content.match(/ж(?:о|ё|е)лт(?:о|ый)|yellow/i)) {
            embed.setColor('0xFFFF00')
        } else if (message.content.match(/зелён(?:о|ый)|green/i)) {
            embed.setColor('0x008000')
        } else if (message.content.match(/голубой?|aqua/i)) {
            embed.setColor('0x00FFFF')
        } else if (message.content.match(/син(?:е|ий)|blue/i)) {
            embed.setColor('0x0000FF')
        } else if (message.content.match(/коричнев(?:о|ый)|brown/i)) {
            embed.setColor('0x8B4513')
        } else {
            embed.setColor('RANDOM')
        }

        if (message.content.match(/chumash|чумаши?/i)) { 
            embed.setImage('https://cdn.discordapp.com/attachments/428556163974561802/461211747450093570/Chumash2.jpg')
        } else if (message.content.match(/(?:d(?:a|e)vis|д(?:е|э)вис)/i)) { 
            embed.setImage('https://i.imgur.com/mXeNUb6.png')
        } else if (message.content.match(/morningwood|морнингвуд/i)) { 
            embed.setImage('https://i.imgur.com/QLeePHg.jpg')
        } else if (message.content.match(/дель-?перро|del-?perro/i)) { 
            embed.setImage('https://vignette.wikia.nocookie.net/gtawiki/images/8/87/BayCityAvenue-DelPerro-GTAV.png')
        } else if (message.content.match(/(?:vine|вайн)-?(?:wood|вуде?)/i)) { 
            embed.setImage('https://i.imgur.com/X9gcjCw.jpg')
        } else if (message.content.match(/(?:эль|el)(?: |-)(?:бурро|burro)(?: |-)(?:heights|хайтс)|возле дальнобо(?:йщиков|я)/i)) { 
            embed.setImage('https://i.imgur.com/Iw3jf4V.png')
        } else if (message.content.match(/(?:миррор|mirror)(?: |-)(?:парке?|park)/i)) { 
            embed.setImage('https://i.imgur.com/1aZGSd6.png')
            var mirir = [
                "https://i.imgur.com/1aZGSd6.png", 
                "https://i.imgur.com/qScnFOA.jpg",
                "https://i.imgur.com/ACkPVFI.jpg",
                "https://i.imgur.com/DqAUcsM.jpg"
            ];
            var randMirir = mirir[Math.floor(Math.random() * mirir.length)];
            embed.setImage(randMirir)
        } else if (message.content.match(/vespucci|в(?:е|и)спучч?и/gi)) { 
            embed.setImage('https://i.imgur.com/FWfW7aQ.jpg')
        } else if (message.content.match(/rancho|ранчо/gi)) { 
            embed.setImage('https://vignette.wikia.nocookie.net/es.gta/images/f/fc/RanchoProjects1GTAV.jpg')
        } else if (message.content.match(/straw?ber?ry|стр(?:а|о)бер?ри/gi)) { 
            embed.setImage('https://i.imgur.com/zcsubfP.png')
        } else if (message.content.match(/(?:ch(?:a|e)mberla(?:e|i)n|ч(?:а|е)мберла?(?:е|и)н)(?:-| )?(hills|хилл?з)?/gi)) { 
            embed.setImage('http://i.yapx.ru/B0BOz.jpg')

        } else if (message.content.match(/(?:los|лос)(?: |-)(?:santos|сантос)|\[(?:ls|лс)]/gi)) { 
            var randLs = lossantos[Math.floor(Math.random() * lossantos.length)];
            embed.setImage(randLs)
        } else if (message.content.match(/(?:s(?:a|e)ndy|с(?:е|э)нди)(?: |-)?(?:shore?s|шор(?:е|э)?с)?|\[(?:сш|ss)]/gi)) { 
            embed.setImage('https://i.redd.it/35yxksg5ezgz.jpg')
        } else if (message.content.match(/(?:paleto|палето)(?: |-)?(?:(b(?:a|e)y)|б(?:е|э)й)?|\[(?:пб|pb])/gi)) { 
            embed.setImage('https://i.imgur.com/DgpA7DO.jpg')

        } else if (message.content.match(/9 ?(?:f|ф) (?:cabrio|кабрио)/i)) { 
            embed.setImage('https://i.imgur.com/hX2jAPE.png') // 2
        } else if (message.content.match(/9 ?(?:f|ф)/i)) { 
            var randcarfimg = vehgta.carf.img[Math.floor(Math.random() * vehgta.carf.img.length)];
            embed.setImage(randcarfimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.carf.des)
            }
        } else if (message.content.match(/adder|адд(?:е|э)р/i)) { 
            embed.setImage('http://i.yapx.ru/BzozR.gif') // gif
        } else if (message.content.match(/akuma|акума/i)) { 
            var randakumaimg = vehgta.akuma.img[Math.floor(Math.random() * vehgta.akuma.img.length)];
            embed.setImage(randakumaimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.akuma.des)
            }
        } else if (message.content.match(/alpha|аль(?:ф|пх)а/i)) { 
            embed.setImage('https://www.igta5.com/images/700x260/alphaf.jpg')
        } else if (message.content.match(/asea|азия|асея/i)) { 
            embed.setImage('https://www.igta5.com/images/700x250/aseaf.jpg')
        } else if (message.content.match(/asterope|астероп/i)) { 
            embed.setImage('https://i.imgur.com/QkEe01n.jpg') // 2
        } else if (message.content.match(/avarus|аварус/i)) { 
            var randavarusimg = vehgta.avarus.img[Math.floor(Math.random() * vehgta.avarus.img.length)];
            embed.setImage(randavarusimg)
        } else if (message.content.match(/bagger|баггер/i)) { 
            embed.setImage('https://i.imgur.com/APnpjbE.jpg') // 2
        } else if (message.content.match(/(?:baller|баллер) ?(?:2|le)/i)) { 
            embed.setImage('http://i.yapx.ru/Bz5NY.gif') // gif
        } else if (message.content.match(/baller|баллер/i)) { 
            embed.setImage('https://www.igta5.com/images/700x240/baller1f.jpg') 
        } else if (message.content.match(/banshee|баншии?/i)) { 2
            var randbansheeimg = vehgta.banshee.img[Math.floor(Math.random() * vehgta.banshee.img.length)];
            embed.setImage(randbansheeimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.banshee.des)
            }
        } else if (message.content.match(/(?:bati|бати)? ?801/i)) { 
            var randbatiimg = vehgta.bati.img[Math.floor(Math.random() * vehgta.bati.img.length)];
            embed.setImage(randbatiimg)
        } else if (message.content.match(/(?:beejay|бии?джей) ?xl?/i)) { 
            embed.setImage('https://i.imgur.com/2bfyWlE.jpg') // 2
        } else if (message.content.match(/bestia|бестия/i)) { 
            var randbestiaimg = vehgta.bestia.img[Math.floor(Math.random() * vehgta.bestia.img.length)];
            embed.setImage(randbestiaimg)
        } else if (message.content.match(/(?:bf|бф) ?400/i)) { 
            var randmotobfimg = vehgta.motobf.img[Math.floor(Math.random() * vehgta.motobf.img.length)];
            embed.setImage(randmotobfimg)
        } else if (message.content.match(/bison|би(?:с|з)он/i)) { 
            embed.setImage('https://i.imgur.com/ICX7VNP.jpg')
        } else if (message.content.match(/nightblade|найтблейд/i)) {
            var randnightbladeimg = vehgta.nightblade.img[Math.floor(Math.random() * vehgta.nightblade.img.length)];
            embed.setImage(randnightbladeimg)
        } else if (message.content.match(/blade|бл(?:е|э)йд/i)) { 
            embed.setImage('https://i.imgur.com/DCZmFwX.jpg') // 2
        } else if (message.content.match(/blista|блиста/i)) {
            if (message.content.match(/(?:blista|блиста) (?:compact|компакт)/i)) { 
                embed.setImage('https://i.imgur.com/XOAC6ls.jpg') // 2
            } else if (message.content.match(/(blista)? go ?go ?monkey ?(blista)?|гоу? гоу? м(?:а|о)нкей блист(?:а|у)/i)) { 
                embed.setImage('https://i.imgur.com/s8KuZ3S.jpg') // 2
            } else if (message.content.match(/blista|блиста/i)) { 
                embed.setImage('https://i.imgur.com/MneMnxO.jpg') // 2
            }
        } else if (message.content.match(/(?:bobcat|бобк(?:э|е|а)т) ?xl?/i)) {
            embed.setImage('https://i.imgur.com/VkFivC6.jpg') // 2
        } else if (message.content.match(/brioso|бриосо/i)) {
            embed.setImage('https://i.imgur.com/uXMX6uA.jpg') // 2
        } else if (message.content.match(/brawler|бравлер/i)) { 
            var randbrawlerimg = vehgta.brawler.img[Math.floor(Math.random() * vehgta.brawler.img.length)];
            embed.setImage(randbrawlerimg)
        } else if (message.content.match(/buccaneer|букк?анее?р/i)) {
            embed.setImage('https://i.imgur.com/KPOm31y.png') // 2
        } else if (message.content.match(/(?:buffalo|буфф?ало) ?(?:s|с|2)/i)) {
            var randbuffaloimg = vehgta.buffalo.img[Math.floor(Math.random() * vehgta.buffalo.img.length)];
            embed.setImage(randbuffaloimg)
        } else if (message.content.match(/buffalo|буфф?ало/i)) {
            embed.setImage('https://i.imgur.com/qK6Flbn.jpg') // 2
        } else if (message.content.match(/bullet|булл?ет/i)) {
            var randbulletimg = vehgta.bullet.img[Math.floor(Math.random() * vehgta.bullet.img.length)];
            embed.setImage(randbulletimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.bullet.des)
            }
        } else if (message.content.match(/kalahari|калахари/i)) {
            embed.setImage('https://i.imgur.com/h2esbtR.jpg') // 2
        } else if (message.content.match(/(?:carbon|карбон) (?:rs|рс)/i)) {
            embed.setImage('https://i.imgur.com/DGfHnBT.jpg') // 2
        } else if (message.content.match(/carbonizzare|карбон(?:ай|и)зз?ер(?:е|э)?/i)) {
            var randcarbonizzareimg = vehgta.carbonizzare.img[Math.floor(Math.random() * vehgta.carbonizzare.img.length)];
            embed.setImage(randcarbonizzareimg)
        } else if (message.content.match(/casco|каско/i)) {
            embed.setImage('https://i.imgur.com/FqZbQTN.jpg') // 2
        } else if (message.content.match(/(?:cavalcade|кавалькад(?:е|э)) ?2/i)) {
            embed.setImage('http://i.imgur.com/cdPzvGw.jpg') // 2
        } else if (message.content.match(/cavalcade|кавалькад(?:е|э)/i)) {
            embed.setImage('https://i.imgur.com/n7zXQ6n.jpg')
        } else if (message.content.match(/cyclone|циклон/gi)) {
            var randcycloneimg = vehgta.cyclone.img[Math.floor(Math.random() * vehgta.cyclone.img.length)];
            embed.setImage(randcycloneimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.cyclone.des)
            }
        } else if (message.content.match(/(?:cheetah|чии?тах) (?:classic|класс?ик)/i)) {
            var randcheetahcimg = vehgta.cheetahc.img[Math.floor(Math.random() * vehgta.cheetahc.img.length)];
            embed.setImage(randcheetahcimg)
        } else if (message.content.match(/cheetah|чии?тах/i)) {
            embed.setImage('https://i.imgur.com/xFlPwaC.jpg') // 2
        } else if (message.content.match(/cheburek|чебурек/i)) {
            embed.setImage('https://i.imgur.com/xX47wEh.jpg') // 2
        } else if (message.content.match(/chimera|химер(?:а|у)/i)) {
            var randchimeraimg = vehgta.chimera.img[Math.floor(Math.random() * vehgta.chimera.img.length)];
            embed.setImage(randchimeraimg)
        } else if (message.content.match(/cognoscenti|когносц?енти/i)) {
            if (message.content.match(/(?:cognoscenti|когносц?енти) (?:cabrio|кабрио)/i)) {
                var randcognoscenticimg = vehgta.cognoscentic.img[Math.floor(Math.random() * vehgta.cognoscentic.img.length)];
                embed.setImage(randcognoscenticimg)
                if (message.content.match(/прода(?:м|ю)/gi)) {
                    embed.addField("Описание транспорта:", vehgta.cognoscentic.des)
                }
            } else if (message.content.match(/(?:cognoscenti|когносц?енти) ?55/i)) {
                embed.setImage('https://i.imgur.com/CNbWBWY.jpg')
            } else if (message.content.match(/cognoscenti|когносц?енти/i)) {
                var randcognoscentiimg = vehgta.cognoscenti.img[Math.floor(Math.random() * vehgta.cognoscenti.img.length)];
                embed.setImage(randcognoscentiimg)
                if (message.content.match(/прода(?:м|ю)/gi)) {
                    embed.addField("Описание транспорта:", vehgta.cognoscenti.des)
                }
            }
        } else if (message.content.match(/contender|контендер/i)) {
            var randcontenderimg = vehgta.contender.img[Math.floor(Math.random() * vehgta.contender.img.length)];
            embed.setImage(randcontenderimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.contender.des)
            }
        } else if (message.content.match(/(?:coquette|когу?етт?(?:е|э))(?:-| )(?:classic|класс?ик)/i)) {
            var randcoquettecimg = vehgta.coquettec.img[Math.floor(Math.random() * vehgta.coquettec.img.length)];
            embed.setImage(randcoquettecimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.coquettec.des)
            }
        } else if (message.content.match(/coquette|когу?етт?(?:е|э)/i)) {
            var randcoquetteimg = vehgta.coquette.img[Math.floor(Math.random() * vehgta.coquette.img.length)];
            embed.setImage(randcoquetteimg)
        } else if (message.content.match(/(?:comet|комету?) (?:retro|ретро)/i)) {
            var randcometrimg = vehgta.cometr.img[Math.floor(Math.random() * vehgta.cometr.img.length)];
            embed.setImage(randcometrimg)
        } else if (message.content.match(/comet|комету?/i)) {
            var randcometimg = vehgta.comet.img[Math.floor(Math.random() * vehgta.comet.img.length)];
            embed.setImage(randcometimg)
        } else if (message.content.match(/daemon|да?емон/i)) {
            var randdaemonimg = vehgta.daemon.img[Math.floor(Math.random() * vehgta.daemon.img.length)];
            embed.setImage(randdaemonimg)
        } else if (message.content.match(/defiler|дефилер/i)) {
            var randdefilerimg = vehgta.defiler.img[Math.floor(Math.random() * vehgta.defiler.img.length)];
            embed.setImage(randdefilerimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.defiler.des)
            }
        } else if (message.content.match(/dinghy|динг?хи/i)) {
            embed.setImage('https://www.igta5.com/images/700x250/dinghyf.jpg')
        } else if (message.content.match(/d(?:l|i)abolus|д(?:иа|я)бо?лус/i)) {
            var randdiabolusimg = vehgta.diabolus.img[Math.floor(Math.random() * vehgta.diabolus.img.length)];
            embed.setImage(randdiabolusimg)
        } else if (message.content.match(/dominator|доминатор/i)) {
            var randdominatorimg = vehgta.dominator.img[Math.floor(Math.random() * vehgta.dominator.img.length)];
            embed.setImage(randdominatorimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.dominator.des)
            }
        } else if (message.content.match(/donk|донк/i)) {
            embed.setImage('https://i.imgur.com/IlpG3X7.jpg')
        } else if (message.content.match(/(?:double|дубль|доубле)(?: |-)(?:t|т)/i)) {
            var randdoubletimg = vehgta.doublet.img[Math.floor(Math.random() * vehgta.doublet.img.length)];
            embed.setImage(randdoubletimg)
        } else if (message.content.match(/dubsta|д(?:а|у)т(?:а|у)/i)) {
            if (message.content.match(/(?:dubsta|д(?:а|у)т(?:а|у)) ?2/i)) {
                embed.setImage('https://i.imgur.com/VzjbnwF.jpg')
            } else if (message.content.match(/(?:dubsta|д(?:а|у)т(?:а|у)) ?6x6/i)) {
                embed.setImage('https://i.imgur.com/yTvMbZZ.jpg') // 2
            } else if (message.content.match(/dubsta|д(?:а|у)бст(?:а|у)/i)) {
                embed.setImage('http://i.imgur.com/R0XXXMN.png')
            }
        } else if (message.content.match(/dukes|дюкес/i)) {
            var randdukesimg = vehgta.dukes.img[Math.floor(Math.random() * vehgta.dukes.img.length)];
            embed.setImage(randdukesimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.dukes.des)
            }
        } else if (message.content.match(/(?:elegy|элеги(?:ю|я)?) (?:rh|рш) ?8/i)) {
            var randelegyrhimg = vehgta.elegyrh.img[Math.floor(Math.random() * vehgta.elegyrh.img.length)];
            embed.setImage(randelegyrhimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.elegyrh.des)
            }
        } else if (message.content.match(/(?:elegy|элеги(?:ю|я)?) ?(?:retro|ретро) ?(?:custom|кастом|заказной)?/i)) {
            var randelegyrimg = vehgta.elegyr.img[Math.floor(Math.random() * vehgta.elegyr.img.length)];
            embed.setImage(randelegyrimg)
        } else if (message.content.match(/enduro|эндуро/i)) {
            var randenduroimg = vehgta.enduro.img[Math.floor(Math.random() * vehgta.enduro.img.length)];
            embed.setImage(randenduroimg)
        } else if (message.content.match(/entity|энтит(?:и|у) ?(fx)?/i)) {
            var randentityimg = vehgta.entity.img[Math.floor(Math.random() * vehgta.entity.img.length)];
            embed.setImage(randentityimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.entity.des)
            }
        } else if (message.content.match(/emperor|эмперор/i)) {
            embed.setImage('https://i.imgur.com/LAsv5SY.png')
        } else if (message.content.match(/exemplar|экземпляр/i)) {
            embed.setImage('https://www.igta5.com/images/700x170/exemplarf.jpg')
        } else if (message.content.match(/(?:f|ф) ?620/i)) {
            embed.setImage('https://www.igta5.com/images/700x220/f620f.jpg')
        } else if (message.content.match(/(?:fcr|фср) ?1000/i)) {
            embed.setImage('https://www.igta5.com/images/1000x350/fcr-1000.jpg')
        } else if (message.content.match(/(?:felon|фелон) (?:gt|гт)/i)) {
            var randfelongtimg = vehgta.felongt.img[Math.floor(Math.random() * vehgta.felongt.img.length)];
            embed.setImage(randfelongtimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.felongt.des)
            }
        } else if (message.content.match(/felon|фелон/i)) {
            var randfelonimg = vehgta.felon.img[Math.floor(Math.random() * vehgta.felon.img.length)];
            embed.setImage(randfelonimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.felon.des)
            }
        } else if (message.content.match(/feltzer|фелтзер/i)) {
            var randfeltzerimg = vehgta.feltzer.img[Math.floor(Math.random() * vehgta.feltzer.img.length)];
            embed.setImage(randfeltzerimg)
        } else if (message.content.match(/fq ?2/i)) {
            embed.setImage('https://www.igta5.com/images/700x230/fq2f.jpg')
        } else if (message.content.match(/(?:franken|франкен)(?:-| )?(?:stange|стренд?ж)/i)) {
            embed.setImage('https://i.imgur.com/LWgr3bO.jpg')
        } else if (message.content.match(/fugitive|фугитив(?:е|э)?/i)) {
            embed.setImage('https://www.igta5.com/images/700x200/fugitivef.jpg')
        } else if (message.content.match(/(?:furore|фуроре?) (?:gt|гт)/i)) {
            embed.setImage('https://www.igta5.com/images/700x250/furoregtf.jpg')
        } else if (message.content.match(/fusilade|фусил(?:е|э)нд/i)) {
            embed.setImage('https://www.gtagaming.com/images/24350/1381281029_driftgta51378484087.jpg')
        } else if (message.content.match(/futo|футо/i)) {
            var randfutoimg = vehgta.futo.img[Math.floor(Math.random() * vehgta.futo.img.length)];
            embed.setImage(randfutoimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.futo.des)
            }
        } else if (message.content.match(/(?:gauntlet|гаунтлет?) (?:redwood|р(?:е|э)двуд)/i)) {
            embed.setImage('https://i.imgur.com/PG09AKn.jpg') // 2
        } else if (message.content.match(/gauntlet|гаунтлет?/i)) {
            var randgauntletimg = vehgta.gauntlet.img[Math.floor(Math.random() * vehgta.gauntlet.img.length)];
            embed.setImage(randgauntletimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.gauntlet.des)
            }
        } else if (message.content.match(/glendale|гленд(?:е|э)йл/i)) {
            embed.setImage('https://www.igta5.com/images/700x240/glendalef.jpg')
        } else if (message.content.match(/gp?1/i)) {
            var randgpimg = vehgta.gp.img[Math.floor(Math.random() * vehgta.gp.img.length)];
            embed.setImage(randgpimg)
        } else if (message.content.match(/granger|гр(?:е|э)нд?жер/i)) {
            embed.setImage('https://www.igta5.com/images/700x210/grangerf.jpg')
        } else if (message.content.match(/gresley|ресл(?:е|и)е?/i)) {
            embed.setImage('https://www.igta5.com/images/700x250/gresleyf.jpg')
        } else if (message.content.match(/guardian|гу?ардиан/i)) {
            var randguardianimg = vehgta.guardian.img[Math.floor(Math.random() * vehgta.guardian.img.length)];
            embed.setImage(randguardianimg)
        } else if (message.content.match(/habanero|хабанеро/i)) {
            embed.setImage('https://www.igta5.com/images/700x250/habanerof.jpg')
        } else if (message.content.match(/hakuchou|хакочу/i)) {
            var randhakuchouimg = vehgta.hakuchou.img[Math.floor(Math.random() * vehgta.hakuchou.img.length)];
            embed.setImage(randhakuchouimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.hakuchou.des)
            }
        } else if (message.content.match(/hexer|хексер/i)) {
            embed.setImage('https://www.igta5.com/images/700x260/hexerf.jpg')
        } else if (message.content.match(/Hot Rod Blazer|хот род блейзер/i)) {
            embed.setImage('https://i.imgur.com/aM5ri1F.jpg')
        } else if (message.content.match(/street blazer|стрит блейзер/i)) {
            var randsblazerimg = vehgta.sblazer.img[Math.floor(Math.random() * vehgta.sblazer.img.length)];
            embed.setImage(randsblazerimg)
        } else if (message.content.match(/hotknife|хоткниф(?:е|э)?/i)) {
            embed.setImage('https://www.igta5.com/images/700x250/hotknifef.jpg')
        } else if (message.content.match(/hauler|хаулер/i)) {
            embed.setImage('https://www.igta5.com/images/700x260/haulerf.jpg')
        } else if (message.content.match(/burrito|бурр?ито/i)) {
            embed.setImage('https://www.igta5.com/images/700x240/burritof.jpg')
        } else if (message.content.match(/(?:huntley|х(?:а|у)нтлей?) (?:s|с)/i)) {
            embed.setImage('https://www.igta5.com/images/700x250/huntleysf.jpg')
        } else if (message.content.match(/(?:infernus|инфернус) (?:classic|класс?ик)/i)) {
            embed.setImage('http://i.yapx.ru/BzO2P.gif') // gif
        } else if (message.content.match(/infernus|инфернус/i)) {
            embed.setImage('https://www.igta5.com/images/infernusf.jpg')
        } else if (message.content.match(/ingot|ингот/i)) {
            embed.setImage('https://www.igta5.com/images/700x200/ingotf.jpg')
        } else if (message.content.match(/innovation|инова(?:т|ц)ион/i)) {
            embed.setImage('https://www.igta5.com/images/700x250/innovationf.jpg')
        } else if (message.content.match(/intruder|интрудер/i)) {
            embed.setImage('https://www.igta5.com/images/700x240/intruderf.jpg')
        } else if (message.content.match(/issi|исси/i)) {
            embed.setImage('https://www.igta5.com/images/700x210/issif.jpg')
        } else if (message.content.match(/jackal|джакал/i)) {
            embed.setImage('https://www.igta5.com/images/700x200/jackalf.jpg')
        } else if (message.content.match(/jetmax|дж(?:е|э)тмакс/i)) {
            embed.setImage('https://www.igta5.com/images/700x250/jetmaxf.jpg')
        } else if (message.content.match(/jester|джэстер/i)) {
            embed.setImage('https://i.imgur.com/BYn9AKT.jpg') // enb
        } else if (message.content.match(/kuruma|курума/i)) {
            embed.setImage('http://i.yapx.ru/BzvzY.gif') // gif
        } else if (message.content.match(/landstalker|лэгдсталкер/i)) {
            embed.setImage('https://www.igta5.com/images/700x210/landstalkerf.jpg')
        } else if (message.content.match(/lynx|л(?:и|ю)нкс/i)) {
            var randlynximg = vehgta.lynx.img[Math.floor(Math.random() * vehgta.lynx.img.length)];
            embed.setImage(randlynximg)
        } else if (message.content.match(/manchez|манче(?:с|з)/i)) {
            var randmanchezimg = vehgta.manchez.img[Math.floor(Math.random() * vehgta.manchez.img.length)];
            embed.setImage(randmanchezimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.manchez.des)
            }
        } else if (message.content.match(/marquis|марку?из/i)) {
            var randmarquisimg = vehgta.marquis.img[Math.floor(Math.random() * vehgta.marquis.img.length)];
            embed.setImage(randmarquisimg)
        } else if (message.content.match(/marshall|маршалл?/i)) {
            embed.setImage('https://i.imgur.com/MAxqA1L.jpg')
        } else if (message.content.match(/(?:massacro|масс?акро) (?:race(car)?|р(?:е|э)йс|\(?гоночн(?:ая|ый)\)?)/i)) {
            var randmassacrorimg = vehgta.massacror.img[Math.floor(Math.random() * vehgta.massacror.img.length)];
            embed.setImage(randmassacrorimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.massacror.des)
            }
        } else if (message.content.match(/massacro|масс?акро/i)) {
            var randmassacroimg = vehgta.massacro.img[Math.floor(Math.random() * vehgta.massacro.img.length)];
            embed.setImage(randmassacroimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.massacro.des)
            }
        } else if (message.content.match(/mesa|меса/i)) {
            var randmesaimg = vehgta.mesa.img[Math.floor(Math.random() * vehgta.mesa.img.length)];
            embed.setImage(randmesaimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.mesa.des)
            }
        } else if (message.content.match(/minivan|минив(?:а|э)н/i)) {
            embed.setImage('https://www.igta5.com/images/700x220/minivanf.jpg')
        } else if (message.content.match(/monroe|монрое?/i)) {
            var randmonroeimg = vehgta.monroe.img[Math.floor(Math.random() * vehgta.monroe.img.length)];
            embed.setImage(randmonroeimg)
        } else if (message.content.match(/(?:nero|неро) (?:custom|кастом)/i)) {
            var randnerocimg = vehgta.neroc.img[Math.floor(Math.random() * vehgta.neroc.img.length)];
            embed.setImage(randnerocimg)
        } else if (message.content.match(/nero|неро/i)) {
            var randneroimg = vehgta.nero.img[Math.floor(Math.random() * vehgta.nero.img.length)];
            embed.setImage(randneroimg)
        } else if (message.content.match(/omnis|омнис/i)) {
            var randomnisimg = vehgta.omnis.img[Math.floor(Math.random() * vehgta.omnis.img.length)];
            embed.setImage(randomnisimg)
        } else if (message.content.match(/(?:oracle|оракл) ?2/i)) {
            embed.setImage('http://i.yapx.ru/BzwJv.gif') // gif
        } else if (message.content.match(/(?:oracle|оракл) ?xs?/i)) {
            embed.setImage('https://i.imgur.com/ZlTvdTp.jpg') // 2
        } else if (message.content.match(/osiris|осирис/i)) {
            var randosirisimg = vehgta.osiris.img[Math.floor(Math.random() * vehgta.osiris.img.length)];
            embed.setImage(randosirisimg)
        } else if (message.content.match(/packer|пакер/i)) {
            embed.setImage('http://i.kinja-img.com/gawker-media/image/upload/s--JeSsvJwY--/1439537499857788739.gif') // gif
        } else if (message.content.match(/panto|панто/i)) {
            embed.setImage('https://www.igta5.com/images/700x250/pantof.jpg')
        } else if (message.content.match(/patriot|патриот/i)) {
            embed.setImage('https://www.igta5.com/images/700x210/patriotf.jpg')
        } else if (message.content.match(/phantom|(?:пх|ф)антом/i)) {
            embed.setImage('https://www.igta5.com/images/700x260/phantomf.jpg')
        } else if (message.content.match(/phoenix|(?:фен|пхоен)икс/i)) {
            embed.setImage('https://www.igta5.com/images/700x220/phoenixf.jpg')
        } else if (message.content.match(/pigalle|пигалл?е/i)) {
            embed.setImage('https://www.igta5.com/images/650x250/pigallef.jpg')
        } else if (message.content.match(/(?:pisswasser|писс?васс?ер) (?:dominator|доминатор)/i)) {
            embed.setImage('https://www.igta5.com/images/700x240/dominator2f.jpg')
        } else if (message.content.match(/picador|пикадор/i)) {
            embed.setImage('https://www.igta5.com/images/700x210/picadorf.jpg')
        } else if (message.content.match(/pounder|паунд(?:е|э)р/i)) {
            embed.setImage('https://www.igta5.com/images/700x250/pounderf.jpg')
        } else if (message.content.match(/prairie|прэй?рие/i)) {
            embed.setImage('https://www.igta5.com/images/700x260/prairief.jpg')
        } else if (message.content.match(/premier|прем(?:и|ь)ер/i)) {
            embed.setImage('https://www.igta5.com/images/700x220/premierf.jpg')
        } else if (message.content.match(/(?:primo|примо) (?:custom|кастом)/i)) {
            var randprimocimg = vehgta.primoc.img[Math.floor(Math.random() * vehgta.primoc.img.length)];
            embed.setImage(randprimocimg)
        } else if (message.content.match(/primo|примо/i)) {
            var randprimoimg = vehgta.primo.img[Math.floor(Math.random() * vehgta.primo.img.length)];
            embed.setImage(randprimoimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.primo.des)
            }
        } else if (message.content.match(/(?:psj|псж) ?600/i)) {
            embed.setImage('https://www.igta5.com/images/700x250/pcj600f.jpg')
        } else if (message.content.match(/radius|радиус/i)) {
            embed.setImage('https://www.igta5.com/images/700x250/radiusf.jpg')
        } else if (message.content.match(/(?:rapid|рапид) (?:gt|гт)? ?(?:classic|классик)/i)) {
            var randrapidgtcimg = vehgta.rapidgtc.img[Math.floor(Math.random() * vehgta.rapidgtc.img.length)];
            embed.setImage(randrapidgtcimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.rapidgtc.des)
            }
        } else if (message.content.match(/(?:rapid|рапид) (?:gt|гт)/i)) {
            var randrapidgtimg = vehgta.rapidgt.img[Math.floor(Math.random() * vehgta.rapidgt.img.length)];
            embed.setImage(randrapidgtimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.rapidgt.des)
            }
        } else if (message.content.match(/(?:rat|р(?:e|э)т)(?:-| )(?:loader|лоа?д(?:е|э)р)/i)) {
            embed.setImage('https://www.igta5.com/images/700x250/ratloaderf.jpg')
        } else if (message.content.match(/(?:rat|р(?:e|э)т)(?:-| )(?:truck|тр(?:а|у)к)/i)) {
            embed.setImage('https://www.igta5.com/images/700x250/rattruckf.jpg')
        } else if (message.content.match(/(?:redwood|р(?:е|э)двуд) (?:gauntlet|гаунтлет)/i)) {
            embed.setImage('https://www.igta5.com/images/700x240/gauntlet2f.jpg')
        } else if (message.content.match(/regina|регин(?:а|у)/i)) {
            embed.setImage('https://www.igta5.com/images/700x220/reginaf.jpg')
        } else if (message.content.match(/retinue|ретинуе/i)) {
            embed.setImage('https://vignette.wikia.nocookie.net/gtawiki/images/b/b8/Retinue-GTAO-front.png')
        } else if (message.content.match(/rhapsody|рапсоди/i)) {
            embed.setImage('https://www.igta5.com/images/700x250/rhapsodyf.jpg')
        } else if (message.content.match(/rocoto|рокото/i)) {
            embed.setImage('https://www.igta5.com/images/700x200/rocotof.jpg')
        } else if (message.content.match(/ruffian|руфф?иан/i)) {
            var randruffianimg = vehgta.ruffian.img[Math.floor(Math.random() * vehgta.ruffian.img.length)];
            embed.setImage(randruffianimg)
        } else if (message.content.match(/ruiner|руинер/i)) {
            embed.setImage('https://www.igta5.com/images/700x200/ruinerf.jpg')
        } else if (message.content.match(/(?:rumpo|румпо) (?:custom|кастом)/i)) {
            embed.setImage('https://www.igta5.com/images/1000x370/rumpo-custom.jpg')
        } else if (message.content.match(/ruston|рустон/i)) {
            var randrustonimg = vehgta.ruston.img[Math.floor(Math.random() * vehgta.ruston.img.length)];
            embed.setImage(randrustonimg)
        } else if (message.content.match(/(?:sabre|сабр(?:е|э)) (?:turbo|турбо) (?:custom|заказной)/i)) {
            var randsabretcimg = vehgta.sabretc.img[Math.floor(Math.random() * vehgta.sabretc.img.length)];
            embed.setImage(randsabretcimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.sabretc.des)
            }
        } else if (message.content.match(/(?:sabre|сабр(?:е|э)) (?:turbo|турбо)/i)) {
            var randsabretimg = vehgta.sabret.img[Math.floor(Math.random() * vehgta.sabret.img.length)];
            embed.setImage(randsabretimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.sabret.des)
            }
        } else if (message.content.match(/sanchez|санчез/i)) {
            var randsanchezimg = vehgta.sanchez.img[Math.floor(Math.random() * vehgta.sanchez.img.length)];
            embed.setImage(randsanchezimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.sanchez.des)
            }
        } else if (message.content.match(/sanctus|санктус/i)) {
            embed.setImage('https://i.imgur.com/Ayig8tS.png') // 2
        } else if (message.content.match(/(?:sandking|сандкинг) xl/i)) {
            var randsandkingxlimg = vehgta.sandkingxl.img[Math.floor(Math.random() * vehgta.sandkingxl.img.length)];
            embed.setImage(randsandkingxlimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.sandkingxl.des)
            }
        } else if (message.content.match(/(?:sandking|сандкинг) ?(?:swb|свб)/i)) {
            var randsandkingswbimg = vehgta.sandkingswb.img[Math.floor(Math.random() * vehgta.sandkingswb.img.length)];
            embed.setImage(randsandkingswbimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.sandkingswb.des)
            }
        } else if (message.content.match(/seashark|сиашарк/i)) {
            embed.setImage('https://www.igta5.com/images/700x200/seashark1f.jpg')
        } else if (message.content.match(/seminole|семиноле/i)) {
            embed.setImage('https://www.igta5.com/images/700x220/seminolef.jpg')
        } else if (message.content.match(/(?:sentinel|сентин(?:е|э)л) xs/i)) {
            var randsentinelxsimg = vehgta.sentinelxs.img[Math.floor(Math.random() * vehgta.sentinelxs.img.length)];
            embed.setImage(randsentinelxsimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.sentinelxs.des)
            }
        } else if (message.content.match(/sentinel|сентин(?:е|э)л/i)) {
            embed.setImage('https://www.igta5.com/images/700x230/sentinelf.jpg')
        } else if (message.content.match(/serrano|серр?ано/i)) {
            embed.setImage('https://www.igta5.com/images/700x210/serranof.jpg')
        } else if (message.content.match(/(?:seven|с(?:е|э)вен)(?: |-)?70/i)) {
            var randsevenimg = vehgta.seven.img[Math.floor(Math.random() * vehgta.seven.img.length)];
            embed.setImage(randsevenimg) 
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.seven.des)
            }   
        } else if (message.content.match(/sc?hafter|шафтер/i)) {
            var randschafterimg = vehgta.schafter.img[Math.floor(Math.random() * vehgta.schafter.img.length)];
            embed.setImage(randschafterimg)
        } else if (message.content.match(/schwartzer|шч?варцер/i)) {
            embed.setImage('https://www.igta5.com/images/650x220/schwartzerf.jpg')
        } else if (message.content.match(/slamvan|славман/i)) {
            embed.setImage('https://www.rockstargames.com/gifs/img/7bc72a9.gif') // gif
        } else if (message.content.match(/sovereign/i)) {
            embed.setImage('https://www.igta5.com/images/700x260/sovereignf.jpg')
        } else if (message.content.match(/speeder|спидер/i)) {
            embed.setImage('https://www.igta5.com/images/700x200/speederf.jpg')
        } else if (message.content.match(/speedo|спидо/i)) {
            embed.setImage('https://www.igta5.com/images/700x250/speedof.jpg')
        } else if (message.content.match(/(?:sprunk|спранк) (?:buffalo|б(?:а|у)фф?ало)/i)) {
            embed.setImage('https://www.igta5.com/images/640x250/buffalo3f.jpg')
        } else if (message.content.match(/squalo|скуало/i)) {
            embed.setImage('https://www.igta5.com/images/700x200/squalof.jpg')
        } else if (message.content.match(/stallion|сталион/i)) {
            embed.setImage('https://www.igta5.com/images/700x240/stallion.jpg')
        } else if (message.content.match(/stratum|статум/i)) {
            embed.setImage('https://www.igta5.com/images/700x200/stratumf.jpg')
        } else if (message.content.match(/(?:sultan|султан) (?:rs|рс)/i)) {
            var randsultanrsimg = vehgta.sultanrs.img[Math.floor(Math.random() * vehgta.sultanrs.img.length)];
            embed.setImage(randsultanrsimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.sultanrs.des)
            }
        } else if (message.content.match(/sultan|султан/i)) {
            var randsultanimg = vehgta.sultan.img[Math.floor(Math.random() * vehgta.sultan.img.length)];
            embed.setImage(randsultanimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.sultan.des)
            }
        } else if (message.content.match(/suntrap|сунтрап/i)) {
            embed.setImage('https://www.igta5.com/images/700x220/suntrapf.jpg')
        } else if (message.content.match(/(?:super|супер) (?:diamond|диамонд)/i)) {
            var randsuperdimg = vehgta.superd.img[Math.floor(Math.random() * vehgta.superd.img.length)];
            embed.setImage(randsuperdimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.superd.des)
            }
        } else if (message.content.match(/surge|сурге/i)) {
            embed.setImage('https://www.igta5.com/images/700x220/surgef.jpg')
        } else if (message.content.match(/t-?20|т-?20/i)) {
            if (!message.content.match(/сим-?к(?:арт)?(?:у|а)?|sim(?:-card)?/i)) {
                var randcartimg = vehgta.cart.img[Math.floor(Math.random() * vehgta.cart.img.length)];
                embed.setImage(randcartimg)
            }
        } else if (message.content.match(/(?:tampa|drift|тамп(?:а|у)|дрифт)(?: |-)(?:tampa|drift|дрифт|тамп(?:а|у))/i)) {
            var randtampadimg = vehgta.tampad.img[Math.floor(Math.random() * vehgta.tampad.img.length)];
            embed.setImage(randtampadimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.tampad.des)
            }
        } else if (message.content.match(/tampa|тамп(?:а|у)/i)) {
            var randtampaimg = vehgta.tampa.img[Math.floor(Math.random() * vehgta.tampa.img.length)];
            embed.setImage(randtampaimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.tampa.des)
            }
        } else if (message.content.match(/tailgater|тайлгатер/i)) {
            embed.setImage('https://www.igta5.com/images/700x240/tailgaterf.jpg')
        } else if (message.content.match(/(?:tornado|торнадо) (?:r(?:a|e)t|р(?:е|э)т) (?:rod|род)/i)) {
            var randtornadorrimg = vehgta.tornadorr.img[Math.floor(Math.random() * vehgta.tornadorr.img.length)];
            embed.setImage(randtornadorrimg)
        } else if (message.content.match(/(?:tornado|торнадо) (?:custom|кастом)/i)) {
            embed.setImage('https://www.gtaboom.com/wp-content/uploads/2016/04/tornado_release-768x432.jpg')
        } else if (message.content.match(/tornado|торнадо/i)) {
            embed.setImage('https://i.imgur.com/Vug3t7P.jpg') // enb
        } else if (message.content.match(/thrust|траст/i)) {
            embed.setImage('https://www.igta5.com/images/700x260/thrustf.jpg')
        } else if (message.content.match(/toro|торо/i)) {
            embed.setImage('https://www.igta5.com/images/700x220/torof.jpg')
        } else if (message.content.match(/tropic|тропик/i)) {
            embed.setImage('https://www.igta5.com/images/650x250/tropicf.jpg')
        } else if (message.content.match(/(?:turismo|туризмо) (?:classic|классик)/i)) {
            embed.setImage('http://i.yapx.ru/BzqRv.gif') // gif
        } else if (message.content.match(/(?:turismo|туризмо) ?(?:r|р)?/i)) {
            var randturismorimg = vehgta.turismor.img[Math.floor(Math.random() * vehgta.turismor.img.length)];
            embed.setImage(randturismorimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.turismor.des)
            }
        } else if (message.content.match(/tyrus/i)) {
            var randtyrusimg = vehgta.tyrus.img[Math.floor(Math.random() * vehgta.tyrus.img.length)];
            embed.setImage(randtyrusimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.tyrus.des)
            }
        } else if (message.content.match(/vacca|вакк?а/i)) {
            var randvaccaimg = vehgta.vacca.img[Math.floor(Math.random() * vehgta.vacca.img.length)];
            embed.setImage(randvaccaimg)
        } else if (message.content.match(/vigero|вигеро/i)) {
            embed.setImage('https://www.igta5.com/images/700x220/vigerof.jpg')
        } else if (message.content.match(/(?:virgo|вирго) ?(?:classic|класс?ик)/i)) {
            embed.setImage('http://i.imgur.com/FJ3XpOV.jpg')
        } else if (message.content.match(/virgo|вирго/i)) {
            embed.setImage('https://www.igta5.com/images/700x220/virgof.jpg')
        } else if (message.content.match(/voltic|волтик/i)) {
            embed.setImage('https://media.giphy.com/media/kQSDsoiApXEQg/giphy.gif') // gif
        } else if (message.content.match(/voodoo|вуду/i)) {
            embed.setImage('https://www.igta5.com/images/700x200/voodoof.jpg')
        } else if (message.content.match(/warrener|варен(?:е|э)р/i)) {
            embed.setImage('https://www.igta5.com/images/700x240/warrenerf.jpg')
        } else if (message.content.match(/washington|вашингтон/i)) {
            embed.setImage('https://www.igta5.com/images/700x240/washingtonf.jpg')
        } else if (message.content.match(/(?:windsor|виндсор)(?:-| )(?:drop|дроп)/i)) {
            var randwindsordimg = vehgta.windsord.img[Math.floor(Math.random() * vehgta.windsord.img.length)];
            embed.setImage(randwindsordimg)
        } else if (message.content.match(/windsor|виндсор/i)) {
            var randwindsorimg = vehgta.windsor.img[Math.floor(Math.random() * vehgta.windsor.img.length)];
            embed.setImage(randwindsorimg)
        } else if (message.content.match(/(?:xa|ха)(?:-| )?21/i)) {
            var randxaimg = vehgta.xa.img[Math.floor(Math.random() * vehgta.xa.img.length)];
            embed.setImage(randxaimg)
            if (message.content.match(/прода(?:м|ю)/gi)) {
                embed.addField("Описание транспорта:", vehgta.xa.des)
            }
        } else if (message.content.match(/xls/i)) {
            embed.setImage('https://www.igta5.com/images/1000x390/xls.jpg')
        } else if (message.content.match(/zentorno|зенторно/i)) {
            embed.setImage('https://i.ytimg.com/vi/-O5SFEJU3RY/maxresdefault.jpg')
        } else if (message.content.match(/(?:zion|зион) (?:cabrio|кабрио)/i)) {
            embed.setImage('https://i.imgur.com/HULflg8.jpg') // 2
        } else if (message.content.match(/zion|зион/i)) {
            embed.setImage('https://www.igta5.com/images/700x200/zionf.jpg')

        } else if (message.content.match(/удочк(?:а|у|и)/i)) {
            embed.setImage('http://img.lenagold.ru/r/ribal/ribal01.png')
        } else if (message.content.match(/(?:machine|пистолеты?)(?: |-)?(?:pistol|пулемёты?)/i)) {
            embed.setImage('http://i.yapx.ru/Bz1Bd.png') // байкера
        } else if (message.content.match(/(?:pump|помповы(?:е|й))? ?(?:shotgun|дроб(?:аши?|овики?))/i)) {
            embed.setImage('https://i.imgur.com/rv0bHgg.png') // байкера
        } else if (message.content.match(/(?:sawed-off|обрезанн(?:ые|ый)) ?(?:shotgun|дроб(?:аши?|овики?))|обрезы?/i)) {
            embed.setImage('https://i.imgur.com/0wVIxsy.png') // банды и ПД
        } else if (message.content.match(/revolver|рев(?:ольверы?|ик(?:ов|и))/i)) {
            embed.setImage('http://i.yapx.ru/Bz1TT.png') // байкера
        } else if (message.content.match(/pistol|пистолеты?/i)) {
            embed.setImage('http://i.yapx.ru/Bz09J.png') // банды и ПД 
        } else if (message.content.match(/(?:micro|микро)(?: |-)?(?:smg|смг|пп|узи|uzi)/gi)) {
            embed.setImage('https://i.imgur.com/kUuauqc.png') // банды
        } else if (message.content.match(/6(?:-| )?(ть|ю)? (?:гараж(?:ей|ами)|парковочны(?:х|ми))? ?(мест(ами)?)?/i)) {
            embed.setImage('http://prod.hosted.cloud.rockstargames.com/ugc/gta5photo/zCXk2Yv5W0-yZaFdF4MXqA_0_0.jpg')
        } else if (message.content.match(/10(?:-| )?(ть|ю)? (?:гараж(?:ей|ами)|парковочны(?:х|ми))? ?(мест(ами)?)?/i)) {
            embed.setImage('http://i.playground.ru/i/02/14/01/00/file/content/3ptw07ft.jpg')
        }
      
        if (message.content.match(fl)) {
            const fL = message.content.match(fl)[0];
            embed.addField('Тема на форуме: ', '[Ссылка на форум (кликабельно)](' + fL + ')', true)
        }

        if (message.content.match(/\[|]/gi)) {
            if (message.content.match(forumLink)) {
                const textc = message.content.replace(forumLink, "");
                embed.setDescription(wordTrans('```md\r\n' + textc + '\r\n```', dictionary))
            } else {
                embed.setDescription(wordTrans('```md\r\n' + message.content + '\r\n```', dictionary))
            }
        } else if (message.content.match(forumLink)) {
            const textc = message.content.replace(forumLink, "");
            embed.setDescription(wordTrans(textc, dictionary))
        } else {
            embed.setDescription(wordTrans(message.content, dictionary))
        }

        if(!message.author.bot) {
            if (client.info.has(message.author.id)) {
                let ava = client.info.get(message.author.id).gifava;
                embed.setThumbnail(ava)
            } else {
                embed.setThumbnail(message.author.displayAvatarURL)
            }
            embed.addField("Discord: ", "<:discord:551092952361861157> <@" + message.author.id + "> \r\n`@" + message.author.tag + "`")
        }
      
        if (message.member.roles.has("💎VIP")) {
                    embed.addField("✴  ✴  ✴", `💎VIP`, true)
        }
      
                Attachment.forEach(async function(attachment) {
                    embed.setImage(attachment.url);
                })
      
                embed.setTimestamp()

                let msg_ = await message.channel.send(`✴  ✴  ✴`, {embed});
          
                 //===========Прибавление количества сообщений в канале============// 
                db.add(`ginterval1_${message.guild.id}_${message.channel.id}`, 1)
          
                //===========обновление интервала для участника============// 
                if (message.member.roles.has("💎VIP")) {
                    db.set(`minterval1_${message.channel.id}_${message.author.id}`, ginterval1 + 4)
                } else {
                    db.set(`minterval1_${message.channel.id}_${message.author.id}`, ginterval1 + 6)
                }
              
                await msg_.react('⚙');
              
                var _message = await message.reply("||Если вы желаете удалить своё объявление, то нажмите на ⚙ под ним в течении минуты.||");
                setTimeout(() => _message.delete(), 30000);
              
                const hcollector = msg_.createReactionCollector((reaction, user) => reaction.emoji.name === '⚙' && user.id == message.author.id, {time: 60000})
 
                hcollector.on('collect', async r => {
                   let ruser = r.users.array()[1]

                   if (r.emoji.name === '⚙') {
                      await setTimeout(() => msg_.delete(), 2000);
                      db.set(`minterval1_${message.channel.id}_${message.author.id}`, ginterval1)
                      return;
                   }
                })
              
                hcollector.on('end', async r => {
                    if (r.size === 0) {
                        await msg_.clearReactions();
                    }
                });
            }
          } else {
            await setTimeout(() => message.delete(), 2000);
            return await message.reply(`Ваше объявление не начинается ни с одного из этих слов: Продам, Куплю, Обменяю, Рассмотрю варианты, Ищу, Услуги`).then(m => m.delete(30000)); 
        }
    }

    if (message.isMentioned(client.user)) {
        const sayMessage = message.content.slice("<@!480011634123735064> ")
        if (sayMessage.match(/!rank|угадай|отгадай|погода/gi)) return;
        if (swearwords.words.some(word => message.content.includes(word)) ) {
            const flip = await message.channel.send('\\\\°□°)\\\\  ┬─┬');
  		      for (const frame of frames) {
  			       await delay(200);
  			       await flip.edit(frame);
  		      }
            return message;
        } else if (swearwords.tabu.some(word => message.content.includes(word)) ) {
            const flip = await message.channel.send('\\\\°□°)\\\\  ┬─┬');
  		      for (const frame of frames) {
  			       await delay(200);
  			       await flip.edit(frame);
  		      }
            return message;
        
        } else if (sayMessage.match(/мемы?/gi)) {
           try{
                var numba = Math.floor(Math.random() * (3 - 0)) + 0;
                if (numba === 2) {
                   var numbb = 0
                   var numbc = Math.floor(Math.random() * (9 - 0)) + 0;
                   var numbd = Math.floor(Math.random() * (4 - 0)) + 0;
                   var numbe = Math.floor(Math.random() * (4 - 0)) + 0;
                } else {
                   var numbb = Math.floor(Math.random() * (10 - 0)) + 0;
                   var numbc = Math.floor(Math.random() * (10 - 0)) + 0;
                   var numbd = Math.floor(Math.random() * (10 - 0)) + 0;
                   var numbe = Math.floor(Math.random() * (10 - 0)) + 0;
                }
                var meme = `${numba}${numbb}${numbc}${numbd}${numbe}`
                var embed = new Discord.RichEmbed()
                  embed.setColor('RANDOM')
                  embed.setTitle("◾ ◾ ◾")
                  embed.setURL(`http://admem.ru/content/images/13911${meme}.jpg`)
                  embed.setImage(`http://admem.ru/content/images/13911${meme}.jpg`)
                  embed.setFooter(`№ ${meme} из 20833`)
                  return message.channel.send({embed})
           } catch(err) {
                return console.log(err.stack);
           } 
        } else if (sayMessage.match(/как тебя зовут\??/gi)) {
            message.reply("меня зовут Алиса");
        } else {
            bot.setNick("Алиса")
            bot.create(function (err, session) {
               bot.ask(sayMessage, async function (err, response) {
                  if (swearwords.words.some(word => response.includes(word)) ) {
                      const flip = await message.channel.send('\\\\°□°)\\\\  ┬─┬');
  		                for (const frame of frames) {
  			                 await delay(200);
  			                 await flip.edit(frame);
  		                }
                      console.log(`Использовался мат в предожении: ${response}`);
                      return message;
                  } else if (swearwords.tabu.some(word => response.includes(word)) ) {
                      const flip = await message.channel.send('\\\\°□°)\\\\  ┬─┬');
  		                for (const frame of frames) {
  			                 await delay(200);
  			                 await flip.edit(frame);
  		                }
                      console.log(`Подозрительный ответ: ${response}`);
                      return message;
                  } else {
                      message.reply(response);
                  }
               });
            });
        }
    }

    if(message.content.indexOf(prefix) !== 0) return;   // префикс +

    const args = message.content.slice(prefix.length).trim().split(/ +/g);    // Аргумент
    const commandName = args.shift().toLowerCase();  // Команда

    if(message.member.hasPermission('KICK_MEMBERS') || message.member.roles.find(r => r.id === "451788085571747840")) {
        if (commandName === 'warn') {
            setTimeout(() => message.delete(), 1000);

            if (message.channel.id !== '443748226370371584') {
                var embed = new Discord.RichEmbed()
                    embed.setColor('RANDOM')
                    if (client.info.has(message.author.id)) {
                       let ava = client.info.get(message.author.id).gifava;
                       embed.setThumbnail(ava)
                    } else {
                       embed.setThumbnail(message.author.displayAvatarURL)
                    }
                    embed.setDescription(message.author + '! Используйте <#443748226370371584> для данной команды!')
                var _message = await message.channel.send({embed});
                setTimeout(() => _message.delete(), 60000);

            } else {
                let mentionusers = message.mentions.members.first();
                let reason = args.slice(1).join(" ");

                if (mentionusers.hasPermission('KICK_MEMBERS')) {
                    var embed = new Discord.RichEmbed()
                        embed.setColor('#FF0000')
                        if (client.info.has(message.author.id)) {
                            let ava = client.info.get(message.author.id).gifava;
                            embed.setThumbnail(ava)
                        } else {
                            embed.setThumbnail(message.author.displayAvatarURL)
                        }
                        embed.setDescription(message.author + '! Вы не можете выдать варн руководству сервeра барахолка!')
                    var _message = await message.channel.send({embed});
                    setTimeout(() => _message.delete(), 60000);

                } else if (!mentionusers) {
                    var embed = new Discord.RichEmbed()
                        embed.setColor('RANDOM')
                        if (client.info.has(message.author.id)) {
                            let ava = client.info.get(message.author.id).gifava;
                            embed.setThumbnail(ava)
                        } else {
                            embed.setThumbnail(message.author.displayAvatarURL)
                        }
                        embed.setDescription(message.author + '! Кому выдать предупреждение? Вы никого не @упомянули! Попробуйте ещё раз')
                    var _message = await message.channel.send({embed});
                    setTimeout(() => _message.delete(), 60000);

                } else if (!reason) {
                    var embed = new Discord.RichEmbed()
                        embed.setColor('RANDOM')
                        if (client.info.has(message.author.id)) {
                           let ava = client.info.get(message.author.id).gifava;
                           embed.setThumbnail(ava)
                        } else {
                           embed.setThumbnail(message.author.displayAvatarURL)
                        }
                        embed.setDescription(message.author + '! Какова причина предупреждения? Вы ничего не учказали! Попробуйте ещё раз')
                    var _message = await message.channel.send({embed});
                    setTimeout(() => _message.delete(), 60000);

                } else {
                    let role = message.guild.roles.find(r => r.name === "WARN");

                    if (mentionusers.roles.find(r => r.id === "455697034851385347")) {
                        if (message.member.roles.find(r => r.id === "451788085571747840")) {
                            var embed = new Discord.RichEmbed()
                                embed.setColor('#FF0000')
                                if (client.info.has(message.author.id)) {
                                   let ava = client.info.get(message.author.id).gifava;
                                   embed.setThumbnail(ava)
                                } else {
                                   embed.setAuthor("🔨 ", message.author.displayAvatarURL)
                                }
                                if (client.info.has(mentionusers.user.id)) {
                                   let ava = client.info.get(mentionusers.user.id).gifava;
                                   embed.setThumbnail(ava)
                                } else {
                                   embed.setThumbnail(mentionusers.user.displayAvatarURL)
                                }
                                embed.setDescription(message.author + ` выдал более одного предупреждения` + mentionusers.user + `! \r\nОн не может кикать! Вам необходимо принять решение кикать участника или нет`)
                                embed.addField(`Причина предупреждения: `, reason)
                                embed.setTimestamp()
                            client.channels.find(c => c.id === '442762589122985984').send('<@&419744912720920576> ', {embed});

                        } else {
                            mentionusers.kick();
                            
                            var embed = new Discord.RichEmbed()
                                embed.setColor('#FF0000')
                                embed.setAuthor("🔨 ", message.author.displayAvatarURL)
                                if (client.info.has(mentionusers.user.id)) {
                                   let ava = client.info.get(mentionusers.user.id).gifava;
                                   embed.setThumbnail(ava)
                                } else {
                                   embed.setThumbnail(mentionusers.user.displayAvatarURL)
                                }
                                embed.setDescription(message.author + ` выдал варн ` + mentionusers + `! Данный пользователь был кикнут с сервера, так как уже имел предупреждение!`)
                                embed.addField(`Причина предупреждения: `, reason)
                                embed.addField(`Правила сервера: `, '<#419765381276893195> ')
                                embed.setTimestamp()
                            client.channels.find(c => c.id === '443748226370371584').send(mentionusers, {embed});

                            var embed = new Discord.RichEmbed()
                                embed.setColor('#FF0000')
                                embed.setAuthor("🔨 ", message.author.displayAvatarURL)
                                if (client.info.has(mentionusers.user.id)) {
                                   let ava = client.info.get(mentionusers.user.id).gifava;
                                   embed.setThumbnail(ava)
                                } else {
                                   embed.setThumbnail(mentionusers.user.displayAvatarURL)
                                }
                                embed.setDescription(message.author + ` выдал варн ` + mentionusers + `! У данного пользователя уже имелся warn, поэтому он был кикнут с сервера автоматически!`)
                                embed.addField(`Причина предупреждения: `, reason)
                                embed.setTimestamp()

                            client.channels.find(c => c.id === '442762589122985984').send({embed});
     
                            // var utcNow = moment(Date.now()).format('DD.MM.YYYY')

                          //  var jn = mentionusers.joinedAt.toUTCString()
                          //  var datejn = jn.match(/[0-9]{1,2} [a-zA-Z]{2,4} [0-9]{1,4}/gi)[0];
                           // var datejnt = datejn.replace(/ /g, ".");
                         //   var djn = datejnt.match(/[0-9]{2,2}./gi)[0];
                          //  var mjn = datejnt.match(/[a-zA-Z]{3,4}/gi)[0];
                           // var gjn = datejnt.match(/.[0-9]{4,4}/gi)[0];
      
                            // const { Attachment } = require('discord.js');
                          //  const canvas = Canvas.createCanvas(507, 338);
                         //   const ctx = canvas.getContext('2d');
                           // const background = await Canvas.loadImage('./assets/images/rip.png');
                          //  const { body: buffer } = await superfetch.get(mentionusers.user.displayAvatarURL)
                        }
                    } else {
                        mentionusers.addRole(role).catch(console.error);

                        var embed = new Discord.RichEmbed()
                            embed.setColor('#FFFF00')
                            embed.setAuthor("🔨 ", message.author.displayAvatarURL)
                            if (client.info.has(mentionusers.user.id)) {
                                let ava = client.info.get(mentionusers.user.id).gifava;
                                embed.setThumbnail(ava)
                            } else {
                                embed.setThumbnail(mentionusers.user.displayAvatarURL)
                            }
                            embed.setDescription(message.author + ` выдал варн ` + mentionusers + `!`)
                            embed.addField(`Причина предупреждения: `, reason)
                            embed.addField(`Правила сервера: `, '<#419765381276893195> ')
                            embed.addField(`Важно: `, 'Если вы будете замечаны в неоднократном нарушении правил, то вы рискуете получить бан. Тема снятия бана не расматривается в дальнейшем!')
                            embed.setTimestamp()
                        client.channels.find(c => c.id === '443748226370371584').send(mentionusers, {embed});

                        var embed = new Discord.RichEmbed()
                            embed.setColor('#FFFF00')
                            embed.setAuthor("🔨 ", message.author.displayAvatarURL)
                            if (client.info.has(mentionusers.user.id)) {
                                let ava = client.info.get(mentionusers.user.id).gifava;
                                embed.setThumbnail(ava)
                            } else {
                                embed.setThumbnail(mentionusers.user.displayAvatarURL)
                            }
                            embed.setDescription(message.author + ` выдал варн ` + mentionusers + `!`)
                            embed.addField(`Причина предупреждения: `, reason)
                            embed.setTimestamp()
                        client.channels.find(c => c.id === '442762589122985984').send({embed});
                    }
                }
            }
        }
    }

    if (commandName === 'radio') {
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) {
            const embed = new Discord.RichEmbed()
            embed.setColor("#ff0000")
            embed.addField('Ошибка!', "Вы должны находиться в голосовом канале, что бы использовать данную команду!")
            message.channel.send({embed});
            return
        }
        if (!args[0]) {
            var radio1 = fs.readFileSync('./assets/json/radio1.json', 'utf8');
            var radio2 = fs.readFileSync('./assets/json/radio2.json', 'utf8');
            message.channel.send('Вы не указали радиостанцию!\r\n' + radio1);
            message.channel.send(radio2);
            return
        }
        if (args[0] === "record") {
            const member1 = message.guild.member(client.user);
            if (member1 && !member1.deaf) member1.setDeaf(true);
            message.member.voiceChannel.join().then(connection => {
                const dispatcher = connection.playArbitraryInput('http://air.radiorecord.ru:8101/rr_320');
                dispatcher.on('end', () => {
                    connection.disconnect();
                });
            })
            return
        }
        if (args[0].match(/http/i)) {
            const embed = new Discord.RichEmbed()
            embed.setColor("#68ca55")
            embed.addField('Отлично!', "Радио включено в " + message.member.voiceChannel)
            message.channel.send({embed});
            const member1 = message.guild.member(client.user);
            if (member1 && !member1.deaf) member1.setDeaf(true);
            message.member.voiceChannel.join().then(connection => {
                require('http').get(args[0], (res) => {
                    connection.playStream(res);
                })
            })
            return
        }
        const embed = new Discord.RichEmbed()
        embed.setColor("#ff0000")
        embed.addField('Ошибка!', "Радио не определено!")
        message.channel.send({embed});
    }

    if (commandName === 'stol') {
        const flip = await message.channel.send('\\\\°□°)\\\\  ┬─┬');
            for (const frame of frames) {
                await delay(200);
                await flip.edit(frame);
            }
        return message;
    }

    if (commandName === 'atrucker2') {
        let role = message.guild.roles.find(c => c.name === "Дальнобойщик 02");
            message.member.addRole(role).catch(console.error);
            const embed = new Discord.RichEmbed()
            embed.setColor("#FFA500")
            if (client.info.has(message.member.id)) {
                let ava = client.info.get(message.member.id).gifava;
                embed.setThumbnail(ava)
            } else {
                embed.setThumbnail(message.author.displayAvatarURL)
            }
            embed.setDescription(message.member + ` получает роль \`Дальнобойщик 02\`.`)
            embed.setTimestamp()
        message.channel.send({embed});
    }

    if (commandName === 'atrucker1') {
        let role = message.guild.roles.find(c => c.name === "Дальнобойщик 01");
            message.member.addRole(role).catch(console.error);
            const embed = new Discord.RichEmbed()
            embed.setColor("#FF0000")
            if (client.info.has(message.member.id)) {
                let ava = client.info.get(message.member.id).gifava;
                embed.setThumbnail(ava)
            } else {
                embed.setThumbnail(message.author.displayAvatarURL)
            }
            embed.setDescription(message.member + ` получает роль \`Дальнобойщик 01\`.`)
            embed.setTimestamp()
        message.channel.send({embed});
    }


    if (commandName === 'rtrucker2') {
        let role = message.guild.roles.find(c => c.name === "Дальнобойщик 02");
        message.member.removeRole(role).catch(console.error);
            const embed = new Discord.RichEmbed()
            embed.setColor("#808080")
            if (client.info.has(message.member.id)) {
                let ava = client.info.get(message.member.id).gifava;
                embed.setThumbnail(ava)
            } else {
                embed.setThumbnail(message.author.displayAvatarURL)
            }
            embed.setDescription(message.member + ` больше не имеет роли \`Дальнобойщик 02\`.`)
            embed.setTimestamp()
        message.channel.send({embed});
    }

    if (commandName === 'rtrucker1') {
        let role = message.guild.roles.find(c => c.name === "Дальнобойщик 01");
        message.member.removeRole(role).catch(console.error);
            const embed = new Discord.RichEmbed()
            embed.setColor("#808080")
            if (client.info.has(message.member.id)) {
                let ava = client.info.get(message.member.id).gifava;
                embed.setThumbnail(ava)
            } else {
                embed.setThumbnail(message.author.displayAvatarURL)
            }
            embed.setDescription(message.member + ` больше не имеет роли \`Дальнобойщик 01\`.`)
            embed.setTimestamp()
        message.channel.send({embed});
    }
};