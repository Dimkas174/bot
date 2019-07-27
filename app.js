const http = require('http'),
      express = require('express'),
      app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

/*==========DISCORD.JS===========*/
const Discord = require('discord.js'),
      { CommandoClient } = require('discord.js-commando');
/*==============================*/

const path = require('path'),
      client = new CommandoClient({
    commandPrefix: '/',
    owner: '387800953731940354',
    disableEveryone: true,
    unknownCommandResponse: false
});
const fs = require('fs'),
      FeedParser = require('feedparser'),
      beagle = require('beagle'),
      request = require('request'),
      superfetch = require('node-superfetch'),
      cheerio = require('cheerio'),
      Enmap = require('enmap'),
      EnmapSQLite = require('enmap-sqlite'),
      cron = require('node-cron');

const prefix = '/'
client.info = new Enmap({ provider: new EnmapSQLite({ name: 'info' }) });

var currentNews = [];
var postedNews = [];
var postNewsInterval; 
var loadNewsInterval;
var cleanOldNewsInterval;
const postedNewsFilePath = "./assets/json/postedNews.json";

const postNewsPeriod =  60000 * 15; // 15 минут
const loadNewsPeriod =  60000 * 14; // 14 минут
const cleanOldNewsPeriod =  60000 * 60 * 1; // 24 hour
const maxNumberOfNewsToRemember = 10000;

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['admin', 'Только для администрации'],
        ['analyze', 'Анализаторы'],
        ['animals', 'Рандомные животные'],
        ['anime', 'Аниме'],
        ['avataredit', 'Операции с аватаркой'],
        ['content', 'Контент'],
        ['events', 'Мероприятия'],
        ['fun', 'Развлечения'],
		    ['games', 'Игры'],
        ['imageedit', 'Операции с изображениями'],
        ['info', 'Информация'],
        ['nsfw', '18+'],
		    ['numberedit', 'Операции с числами'],
        ['other', 'Другое'],
        ['owner', 'Только для владельца бота'],
        ['quiz', 'Викторины'],
        ['random', 'Случайные'],
        ['roleplay', 'Рольплей'],
        ['search', 'Поиск'],
        ['single', 'Простой ответ'],
        ['textedit', 'Операции с текстом'],
        ['utility', 'Утилиты'],
        ['vmp', 'V-MP'],
        ['voice', 'Голосовой канал']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        help: true,
        ping: false
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));

//=======================================//
//      BOT EVENT HANDLER
//=======================================//

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

function randomStatus() {
    let status = [`/help | Серверов: ${client.guilds.size}`,`${client.guilds.reduce((mem, g) => mem += g.memberCount, 0)} пользователей`]
    let rstatus = Math.floor(Math.random() * status.length);
    client.user.setPresence({ game: { name: status[rstatus], type: "LISTENING"}});
}; setInterval(randomStatus, 60000)


async function statusVmpAlpha() {
    try {
        const { body } = await superfetch.get("http://185.71.66.105:4490/health");
   
        if (client.channels.find(c => c.name === `AD SRV#01│ONLINE ${body.Players}/${body.MaxPlayers}`)) return;
        return client.channels.find(c => c.id === "548500462165557278").setName(`AD SRV#01│📶 ONLINE ${body.Players}/${body.MaxPlayers}`);
    } catch(err) {
        client.channels.find(c => c.id === "548500462165557278").setName(`AD SRV#01│Сервер недоступен!`);
        return console.log(err.stack);
    }
}; setInterval(statusVmpAlpha, 300000)

async function statusVmpBeta() {
    try {
       const { body } = await superfetch.get("http://185.71.66.105:4491/health");
   
       if (client.channels.find(c => c.name === `AD SRV#02│ONLINE ${body.Players}/${body.MaxPlayers}`)) return;
       return client.channels.find(c => c.id === "548392624726212609").setName(`AD SRV#02│📶 ONLINE ${body.Players}/${body.MaxPlayers}`);
    } catch(err) {
       client.channels.find(c => c.id === "548392624726212609").setName(`AD SRV#02│Сервер недоступен!`);
       return console.log(err.stack);
    }
}; setInterval(statusVmpBeta, 300000)


var hookadmin = new Discord.WebhookClient('367692282385661953', 'vVOCSOYyBuOH6wH_w4Xyz92OKxxiCPn1DR3YRjNOZ0rIWR9bby2VyQnxf0PIUJV6VpEU'); // admin_chat
var hookgame = new Discord.WebhookClient('368115878169935875', 'k-3flnL951UWcwrDr-dzvuTQwJKgFIVLxGwPIJYzoLrTVK3g5EbJxkW4x97q7XFwB3p1'); // game_videos
var hookgta = new Discord.WebhookClient('388638844695871488', 'K0KxS7NZmFCe7cGmtFL9MigoexpAnDtXNQGUn2VNp6eJEMKmmXeVHeCXUvQsHfntaw64'); // vmp
var hookgeneral = new Discord.WebhookClient('366923314293374977', 'OR0wd2fhB1p4AXmL5fRVzaWzgIv1JCzTU6Napo2VN5lS5QDje59T8yk92nlJ_O42-jB3'); // general
var hookrss = new Discord.WebhookClient('372316352863797249', 'A33nhva9PBCq2-NPf6k6k4GIm9cUIs4xxzcHhC4zLA6DUKHRuY6Zm_FVxwI-YG23Qmpq'); // rss
var hookvideo = new Discord.WebhookClient('368117445669552140', '2HV7MfU_cr-mL02nbzwN5eeVBDQTYwwcRB506RlTVQrD_c-pN2-0vqVkUyryZybmuj1V'); // videos

function log(message) {
    console.log(message);
}

function loadPostedNewsFromFileSystem(){
    getAll((restoredNews) => {
        postedNews = restoredNews;
        log("Количество восстановленных новостей: " + postedNews.length);
        loadAllFeeds();
    });
}
loadPostedNewsFromFileSystem();


client.on('ready', () => {
    var generalChannel = client.channels.get("25466045464298784169786");
    if (!postNewsInterval) {
        postNewsInterval = setInterval(() => {
            if (currentNews.length === 0) {
                return;
            }
            var articleToPost = currentNews.shift();
            switch(articleToPost.author) {
                case 'PLAYMP':
                // ярмарка общий
                client.channels.find(c => c.id === '548768443751464961').send(articleToPost.link);
                // ярмарка news
                client.channels.find(c => c.id === '548402222208122880').send(articleToPost.link);
                break;
                
                case 'MisterKey':
                case 'Richi':
                case 'Vladislav Pavlov':
                case 'TaGs Play Theme':
                case 'JiK':
                case 'Filipin is bro':
                case 'Joe Speen':
                case 'SodaEffect':
                let text = `${articleToPost.title}`
                if (text.match(/(?:gta|гта) (?:5|v) (?:rp|рп)|v-?mp/gi)) {
                    // ярмарка общий
                   client.channels.find(c => c.id === '548768443751464961').send(articleToPost.link);
                }
                break;
                
                default:
                if (articleToPost.link.match(/http:\/\/vk.com\/wall-23881761_[0-9]{2,6}/gi)) {
                  // test2
                   var des = articleToPost.description.replace(/<br>|%27(\/)?%3E|<a href='|<img src='|<\/a>|'\/>|'>/gi, "\n");
                   var dess = des.replace(/club23881761\|/, "");
                  
                   if (dess.match(/https?:\/\/(?:pp|sun[0-9-]{2,4}).userapi.com\/[a-zA-Z0-9/-]{2,}.jpg/gi)) {
                      if (dess.match(/https?:\/\/vk.com\/video-[0-9_]{2,}/gi)) {
                         if (dess.match(/https?:\/\/(?:m.vk.com|v-mp.ru)\/(?:@-23881761[0-9a-zA-Z-]{2,}|[a-zA-Z0-9]{2,}.html)/gi)) {
                            let imgvk = dess.match(/https?:\/\/(?:pp|sun[0-9-]{2,4}).userapi.com\/[a-zA-Z0-9/-]{2,}.jpg/gi)[0];
                            let videovk = dess.match(/https?:\/\/vk.com\/video-[0-9_]{2,}/gi)[0];
                            let linkvk = dess.match(/https?:\/\/(?:m.vk.com|v-mp.ru)\/(?:@-23881761[0-9a-zA-Z-]{2,}|[a-zA-Z0-9]{2,}.html)/gi)[0];
                            let desbv = dess.replace(videovk, "");
                            let desbiv = desbv.replace(imgvk, "");
                            let desbivl = desbiv.replace(linkvk, "");
                            // ярмарка
                            client.channels.find(c => c.id === '548402222208122880').send(`${desbivl} \n${linkvk} \n${videovk} \n${imgvk} \n**Подробнее по ссылке:** ${articleToPost.link}`);
                         } else {
                            let imgvk = dess.match(/https?:\/\/(?:pp|sun[0-9-]{2,4}).userapi.com\/[a-zA-Z0-9/-]{2,}.jpg/gi)[0];
                            let videovk = dess.match(/https?:\/\/vk.com\/video-[0-9_]{2,}/gi)[0];
                            let desbv = dess.replace(videovk, "");
                            let desbiv = desbv.replace(imgvk, "");
                            // ярмарка
                            client.channels.find(c => c.id === '548402222208122880').send(`${desbiv} \n${videovk} \n${imgvk} \n**Подробнее по ссылке:** ${articleToPost.link}`);
                         }
                      } else if (dess.match(/https?:\/\/(?:m.vk.com|v-mp.ru)\/(?:@-23881761[0-9a-zA-Z-]{2,}|[a-zA-Z0-9]{2,}.html)/gi)) {
                         let imgvk = dess.match(/https:\/\/pp.userapi.com\/[a-zA-Z0-9/]{2,}.jpg/gi)[0];
                         let linkvk = dess.match(/https?:\/\/(?:m.vk.com|v-mp.ru)\/(?:@-23881761[0-9a-zA-Z-]{2,}|[a-zA-Z0-9]{2,}.html)/gi)[0];
                         let desbi = dess.replace(imgvk, "");
                         let desbil = desbi.replace(linkvk, "");
                        // ярмарка
                        client.channels.find(c => c.id === '548402222208122880').send(`${desbil} \n${linkvk} \n${imgvk} \n**Подробнее по ссылке:** ${articleToPost.link}`);
                      } else {
                         let imgvk = dess.match(/https?:\/\/(?:pp|sun[0-9-]{2,4}).userapi.com\/[a-zA-Z0-9/-]{2,}.jpg/gi)[0];
                         let desbi = dess.replace(imgvk, "");
                         // ярмарка
                         client.channels.find(c => c.id === '548402222208122880').send(`${desbi} \n${imgvk} \n**Подробнее по ссылке:** ${articleToPost.link}`);
                      }
                     
                   } else if (dess.match(/https?:\/\/vk.com\/video-[0-9_]{2,}/gi)) {
                       if (dess.match(/https?:\/\/(?:m.vk.com|v-mp.ru)\/(?:@-23881761[0-9a-zA-Z-]{2,}|[a-zA-Z0-9]{2,}.html)/gi)) {
                           let videovk = dess.match(/https?:\/\/vk.com\/video-[0-9_]{2,}/gi)[0];
                           let linkvk = dess.match(/https?:\/\/(?:m.vk.com|v-mp.ru)\/(?:@-23881761[0-9a-zA-Z-]{2,}|[a-zA-Z0-9]{2,}.html)/gi)[0];
                           let desbv = dess.replace(videovk, "");
                           let desbvl = desbv.replace(linkvk, "");
                           // ярмарка
                           client.channels.find(c => c.id === '548402222208122880').send(`${desbvl} \n${linkvk} \n${videovk} \n**Подробнее по ссылке:** ${articleToPost.link}`);
                       } else {
                           let videovk = dess.match(/https?:\/\/vk.com\/video-[0-9_]{2,}/gi)[0];
                           let desbv = dess.replace(videovk, "");
                           // ярмарка
                          client.channels.find(c => c.id === '548402222208122880').send(`${desbv} \n${videovk} \n**Подробнее по ссылке:** ${articleToPost.link}`);
                       }
                     
                   } else if (dess.match(/https?:\/\/(?:m.vk.com|v-mp.ru)\/(?:@-23881761[0-9a-zA-Z-]{2,}|[a-zA-Z0-9]{2,}.html)/gi)) {
                       let linkvk = dess.match(/https?:\/\/(?:m.vk.com|v-mp.ru)\/(?:@-23881761[0-9a-zA-Z-]{2,}|[a-zA-Z0-9]{2,}.html)/gi)[0];
                       let desbl = dess.replace(linkvk, "");
                       // ярмарка
                      client.channels.find(c => c.id === '548402222208122880').send(`${desbl} \n${linkvk} \n**Подробнее по ссылке:** ${articleToPost.link}`);
                     
                   } else {
                      // ярмарка
                      client.channels.find(c => c.id === '548402222208122880').send(`${dess} \n**Подробнее по ссылке:** ${articleToPost.link}`);
                   }
                  
                } else if (articleToPost.link.match(/https?:\/\/9gag.com\/gag\/[a-zA-Z0-9]{2,}/gi)) {
                   if (articleToPost.description.match(/https:\/\/img-9gag-fun.9cache.com\/photo\/[a-zA-Z0-9]{2,}_460sv.mp4/gi)) {     
                     let videogag = articleToPost.description.match(/https:\/\/img-9gag-fun.9cache.com\/photo\/[a-zA-Z0-9]{2,}_460sv.mp4/gi)
                     // ВАШ БОТ
                     client.channels.find(c => c.id === '507894200055103498').send(videogag);
                   }
                       
                } else {
                  // test
                   client.channels.find(c => c.id === '498026742724952065').send(`${articleToPost.description} \n${articleToPost.link}`);
                }
                break;
            }
            postedNews.push(articleToPost);
            saveAll(postedNews);
            log("Следующая новость - " + currentNews.length);
        }, postNewsPeriod);
    }
});


loadNewsInterval = setInterval(() => {
    log("Поиск норвых постов");
    loadAllFeeds();
}, loadNewsPeriod);


cleanOldNewsInterval = setInterval(() => {
    while (postedNews.length > maxNumberOfNewsToRemember) {
        var oldNewsToDelete = postedNews.shift();
        log("Удаление поста " + oldNewsToDelete.title + " - " + oldNewsToDelete.link)
    }
    saveAll(postedNews);
}, cleanOldNewsPeriod);


var rssFeeds = require("./assets/json/rss.json");


function loadAllFeeds() {
    for (var feedName in rssFeeds) {
        loadFeed(rssFeeds[feedName].url);
    }
}

function loadFeed(url) {
    var feedparser = new FeedParser();
    request(url).pipe(feedparser);
    feedparser.on('error', (error) => log(error));
    feedparser.on('readable', function () {
        var stream = this;
        var item;
        while (item = stream.read()) {
            if (postedNews && postedNews.some(x => x.title == item.title)) continue;
            if (currentNews.some(x => x.title == item.title)) continue;
            log('В массив добавлен пост от: ' + item.author + '. ' + item.title);
            currentNews.push({
                title: item.title,
                link: item.link,
                date: item.date,
                author: item.author,
                description: item.description,
            });
            if (currentNews.length > 100) currentNews.shift();
        }
    });
}

function getAll(callback) {
    fs.exists(postedNewsFilePath, (exists) => {
        if (!exists) {
            callback([]);
            return;
        }
        fs.readFile(postedNewsFilePath, {encoding: 'utf-8'}, (err,data) => {
            if (!err) {
                callback(JSON.parse(data));
            } else {
                log(err);
            }
        });
    });
}

function saveAll(data) {
    fs.writeFile(postedNewsFilePath, JSON.stringify(data, null, 4), (err) => {
        if(err) {
            log(err);
            return;
        }
    });
}

cron.schedule('1 0 31 10 *', () => {
      const embed = new Discord.RichEmbed()
         embed.setColor('#FF4500') //Оранжево-красный
         embed.setThumbnail('https://i.imgur.com/sVPtzsA.gif')
         embed.setTitle(`31 октября \nHappy Halloween!`)
         embed.setImage(`https://i.imgur.com/qn37uDA.gif`)
         client.channels.find(c => c.id === '498026742724952065').send(embed)
}, {
   scheduled: true,
   timezone: "Europe/Moscow"
});

cron.schedule('1 10 4 11 *', () => {
      const embed = new Discord.RichEmbed()
         embed.setColor('#4169E1') //RoyalBlue
         embed.setThumbnail('https://i.imgur.com/KPm9aGk.gif')
         embed.setTitle(`4 ноября \nС Денём народного единства в России!`)
         embed.setImage(`https://i.imgur.com/DLOnahV.gif`)
         client.channels.find(c => c.id === '498026742724952065').send(embed)
}, {
   scheduled: true,
   timezone: "Europe/Moscow"
});

cron.schedule('1 10 10 12 *', () => {
      const embed = new Discord.RichEmbed()
         embed.setColor('#A52A2A')
         embed.setThumbnail('https://i.imgur.com/DHFrEUg.gif')
         embed.setTitle(`12 декабря \nС Денём Конституции РФ!`)
         embed.setImage(`https://i.imgur.com/17vQ0LE.jpg`)
         client.channels.find(c => c.id === '498026742724952065').send(embed)
}, {
   scheduled: true,
   timezone: "Europe/Moscow"
});


cron.schedule('0 15 31 12 *', () => {
      const camchatembed = new Discord.RichEmbed()
         .setColor('#1E90FF')
         .setThumbnail('https://i.imgur.com/KhAjX1V.gif')
         .setTitle(`Камчатское время MSK+9: \nС Новым годом Камчатский край!!!`)
         .setImage(`https://i.imgur.com/eeB1iDq.jpg`)
         client.channels.find(c => c.id === '498026742724952065').send(camchatembed)
      
      const chucotembed = new Discord.RichEmbed()
         .setColor('#1E90FF')
         .setThumbnail('https://i.imgur.com/KhAjX1V.gif')
         .setTitle(`Камчатское время MSK+9: \nС Новым годом Чукотский автономный округ!!!`)
         .setImage(`https://i.imgur.com/dK443Gv.jpg`)
         client.channels.find(c => c.id === '498026742724952065').send(chucotembed)
}, {
   scheduled: true,
   timezone: "Europe/Moscow"
});


cron.schedule('0 16 31 12 *', () => {
      const embed = new Discord.RichEmbed()
         embed.setColor('#1E90FF')
         embed.setThumbnail('https://i.imgur.com/KhAjX1V.gif')
         embed.setTitle(`МСК+8, МСК+7, МСК+6: \nС Новым годом Республика Саха (Якутия)!!!`)
         embed.setImage(`https://i.imgur.com/3g17GVH.jpg`)
         client.channels.find(c => c.id === '498026742724952065').send(embed)
}, {
   scheduled: true,
   timezone: "Europe/Moscow"
});


cron.schedule('0 17 31 12 *', () => {
      const primorembed = new Discord.RichEmbed()
         .setColor('#1E90FF')
         .setThumbnail('https://i.imgur.com/KhAjX1V.gif')
         .setTitle(`Владивостокское время МСК+7: \nС Новым годом Приморский край!!!`)
         .setImage(`https://i.imgur.com/IgcUWsD.jpg`)
         client.channels.find(c => c.id === '498026742724952065').send(primorembed)
  
      const habarembed = new Discord.RichEmbed()
         .setColor('#008000')
         .setThumbnail('https://i.imgur.com/KhAjX1V.gif')
         .setTitle(`Владивостокское время МСК+7: \nС Новым годом Хабаровский край!!!`)
         .setImage(`https://i.imgur.com/afPkVd2.jpg`)
         client.channels.find(c => c.id === '498026742724952065').send(habarembed) 
  
      const magadanembed = new Discord.RichEmbed()
         .setColor('#FF0000')
         .setThumbnail('https://i.imgur.com/KhAjX1V.gif')
         .setTitle(`Владивостокское время МСК+7: \nС Новым годом Магаданская область!!!`)
         .setImage(`https://i.imgur.com/3FxvWJJ.jpg`)
         client.channels.find(c => c.id === '498026742724952065').send(magadanembed)
  
      const sahalinembed = new Discord.RichEmbed()
         .setColor('#20B2AA')
         .setThumbnail('https://i.imgur.com/KhAjX1V.gif')
         .setTitle(`Владивостокское время МСК+7: \nС Новым годом Сахалинская область!!!`)
         .setImage(`https://i.imgur.com/JSRVKlt.jpg`)
         client.channels.find(c => c.id === '498026742724952065').send(sahalinembed)
  
       const evreiembed = new Discord.RichEmbed()
         .setColor('#228B22')
         .setThumbnail('https://i.imgur.com/KhAjX1V.gif')
         .setTitle(`Владивостокское время МСК+7: \nС Новым годом Еврейская автономная область!!!`)
         .setImage(`https://i.imgur.com/9QZ0Wg0.jpg`)
         client.channels.find(c => c.id === '498026742724952065').send(evreiembed)
}, {
   scheduled: true,
   timezone: "Europe/Moscow"
});


cron.schedule('0 18 31 12 *', () => {
      const amurembed = new Discord.RichEmbed()
      .setColor('#FF0000')
      .setThumbnail('https://i.imgur.com/KhAjX1V.gif')
      .setTitle(`Якутское время МСК+6: \nС Новым годом Амурская область!!!`)
      .setImage(`https://i.imgur.com/N1wiNa5.jpg`)
      client.channels.find(c => c.id === '498026742724952065').send(amurembed)
}, {
   scheduled: true,
   timezone: "Europe/Moscow"
});


cron.schedule('0 19 31 12 *', () => {
      const buriatembed = new Discord.RichEmbed()
      .setColor('#FFFF00')
      .setThumbnail('https://i.imgur.com/KhAjX1V.gif')
      .setTitle(`Иркутское время МСК+5: \nС Новым годом Республика Бурятия!!!`)
      .setImage(`https://i.imgur.com/Kclf92s.jpg`)
      client.channels.find(c => c.id === '498026742724952065').send(buriatembed)
  
      const zabaikembed = new Discord.RichEmbed()
      .setColor('#FF0000')
      .setThumbnail('https://i.imgur.com/KhAjX1V.gif')
      .setTitle(`Иркутское время МСК+5: \nС Новым годом Забайкальский край!!!`)
      .setImage(`https://i.imgur.com/lzMJ0oc.gif`)
      client.channels.find(c => c.id === '498026742724952065').send(zabaikembed)
  
      const irkutskembed = new Discord.RichEmbed()
      .setColor('#1E90FF')
      .setThumbnail('https://i.imgur.com/KhAjX1V.gif')
      .setTitle(`Иркутское время МСК+5: \nС Новым годом Иркутская область!!!`)
      .setImage(`https://i.imgur.com/OnUAwRB.jpg`)
      client.channels.find(c => c.id === '498026742724952065').send(irkutskembed)
}, {
   scheduled: true,
   timezone: "Europe/Moscow"
});


cron.schedule('0 20 31 12 *', () => {
      const amurembed = new Discord.RichEmbed()
      .setColor('#1E90FF')
      .setThumbnail('https://i.imgur.com/KhAjX1V.gif')
      .setTitle(`Красноярское время МСК+4: \nС Новым годом Республика Тыва, Республика Хакасия, Красноярский край, Кемеровская область!!!`)
      .setImage(`https://i.imgur.com/lzMJ0oc.gif`)
      client.channels.find(c => c.id === '498026742724952065').send(amurembed)
}, {
   scheduled: true,
   timezone: "Europe/Moscow"
});


cron.schedule('0 21 31 12 *', () => {
      const amurembed = new Discord.RichEmbed()
      .setColor('#1E90FF')
      .setThumbnail('https://i.imgur.com/KhAjX1V.gif')
      .setTitle(`Омское время MSK+3: \nС Новым годом Республика Алтай, Алтайский край, Новосибирская область, Омская область, Томская область!!!`)
      .setImage(`https://i.imgur.com/lzMJ0oc.gif`)
      client.channels.find(c => c.id === '498026742724952065').send(amurembed)
}, {
   scheduled: true,
   timezone: "Europe/Moscow"
});


cron.schedule('0 22 31 12 *', () => {
      const amurembed = new Discord.RichEmbed()
      .setColor('#1E90FF')
      .setThumbnail('https://i.imgur.com/KhAjX1V.gif')
      .setDescription(`Екатеринбургское время MSK+2: \nС Новым годом Республика Башкортостан, Пермский край, Курганская область, Оренбургская область, Свердловская область, Тюменская область, Челябинская область, Ханты-Мансийский автономный округ — Югра и Россия: Ямало-Ненецкий автономный округ!!!`)
      .setImage(`https://i.imgur.com/lzMJ0oc.gif`)
      client.channels.find(c => c.id === '498026742724952065').send(amurembed)
}, {
   scheduled: true,
   timezone: "Europe/Moscow"
});


cron.schedule('0 23 31 12 *', () => {
      const amurembed = new Discord.RichEmbed()
      .setColor('#1E90FF')
      .setThumbnail('https://i.imgur.com/KhAjX1V.gif')
      .setTitle(`Самарское время MSK+1: \nС Новым годом Самарская область, Республика Удмуртия!!!`)
      .setImage(`https://i.imgur.com/lzMJ0oc.gif`)
      client.channels.find(c => c.id === '498026742724952065').send(amurembed)
}, {
   scheduled: true,
   timezone: "Europe/Moscow"
});


cron.schedule('0 0 1 1 *', () => {
      const amurembed = new Discord.RichEmbed()
      .setColor('#1E90FF')
      .setThumbnail('https://i.imgur.com/KhAjX1V.gif')
      .setDescription(`1 января 2019 года: \nС Новым годом Москва, Санкт-Петербург, Севастополь, Республика Адыгея, Республика Дагестан, Республика Ингушетия, Кабардино-Балкарская Республика, 
Республика Калмыкия, Республика Крым, Карачаево-Черкесская Республика, Республика Карелия, Республика Коми, Республика Марий Эл, Республика Мордовия, Республика Северная Осетия — Алания, 
Республика Татарстан, Чеченская республика, Чувашская республика, Краснодарский край, Ставропольский край, Архангельская область, Астраханская область, Белгородская область, Брянская область, 
Владимирская область, Волгоградская область, Вологодская область, Воронежская область, Ивановская область, Калужская область, Кировская область, Костромская область, Курская область, Ленинградская область, 
Липецкая область, Московская область, Мурманская область, Нижегородская область, Новгородская область, Орловская область, Пензенская область, Псковская область, Ростовская область, Рязанская область, 
Саратовская область, Смоленская область, Тамбовская область, Тверская область, Тульская область, Ульяновская область, Ярославская область, Ненецкий автономный округ!!!`)
      .setImage(`https://i.imgur.com/mjaHhFQ.jpg`)
      client.channels.find(c => c.id === '498026742724952065').send(amurembed)
}, {
   scheduled: true,
   timezone: "Europe/Moscow"
});


cron.schedule('0 1 1 1 *', () => {
      const amurembed = new Discord.RichEmbed()
      .setColor('#1E90FF')
      .setThumbnail('https://i.imgur.com/KhAjX1V.gif')
      .setTitle(`Калининградское время MSK−1: \nС Новым годом Калининградская область!!!`)
      .setImage(`https://i.imgur.com/sBRfzaz.jpg`)
      client.channels.find(c => c.id === '498026742724952065').send(amurembed)
}, {
   scheduled: true,
   timezone: "Europe/Moscow"
});


cron.schedule('1 0 7 1 *', () => {
      var guild = client.guilds.get('447030107752759316');
      if (guild && guild.channels.get('498026742724952065')) {
         const embed = new Discord.RichEmbed()
           embed.setColor('#FFFFE0')
           embed.setThumbnail('https://i.imgur.com/h0Vgq1I.gif')
           embed.setTitle(`07 января \n С Рождеством Христовым!`)
           embed.setImage(`https://i.imgur.com/7HSZJ61.gif`)
           client.channels.find(c => c.id === '498026742724952065').send(embed)
      }
}, {
   scheduled: true,
   timezone: "Europe/Moscow"
});

client.login(process.env.TOKEN);