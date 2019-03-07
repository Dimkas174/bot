const { Command } = require('discord.js-commando'),
      Fortnite = require("fortnite"),
      { RichEmbed } = require('discord.js');

const fortnite = new Fortnite(process.env.TRACKER)

var gif = [
    "https://i.imgur.com/dSNe4Uh.gif", 
    "https://i.imgur.com/bJMfZqS.png",
    "https://i.imgur.com/cnOQp6s.jpg",
    "https://i.imgur.com/vADc1aC.jpg"
];

module.exports = class FortniteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'fortnite',
            aliases: ['фортнайт'],
            group: 'games',
            memberName: 'fortnite',
            description: 'Показывает профиль упомянутого пользователя.',
            examples: ['fortnite <имя> (без <>)'],
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
                duration: 60
            },
            args: [
                {
					key: 'username',
					prompt: 'Информацию о каком игроке в Fortnite вы желаете посмотреть? Придоставте ник! \nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
					type: 'string',
					validate: text => {
						if (text.length < 2000) return true;
                        return 'Сообщение не должно превышать 2000 символов!'
                    }
                }
            ]
        });
    }

    run(msg, { username }) {

        var randgif = gif[Math.floor(Math.random() * gif.length)];

        let data = fortnite.user(username, 'pc').then(data => {
            let stats = data.stats;

            let solostats = stats.solo;

            let soscore = solostats.score;
            let sokd = solostats.kd;
            let somatches = solostats.matches;
            let sokills = solostats.kills;
            let sowins = solostats.wins;
            let sotop3 = solostats.top_3;

            let duostats = stats.duo;

            let dscore = duostats.score;
            let dkd = duostats.kd;
            let dmatches = duostats.matches;
            let dkills = duostats.kills;
            let dwins = duostats.wins;
            let dtop3 = duostats.top_3;

            let squadstats = stats.squad;
                
            let sqscore = squadstats.score;
            let sqkd = squadstats.kd;
            let sqmatches = squadstats.matches;
            let sqkills = squadstats.kills;
            let sqwins = squadstats.wins;
            let sqtop3 = squadstats.top_3;

            let lifetime = stats.lifetime;
                
            let lscore = lifetime[6]['Score'];
            let lmplayed = lifetime[7]['Matches Played'];
            let lwins = lifetime[8]['Wins'];
            let lwinper = lifetime[9]['Win%'];
            let lkills = lifetime[10]['Kills'];
            let lkd = lifetime[11]['K/d'];

            const embed = new RichEmbed()
            .setAuthor(`${data.username}. Платформа: PC`)
            .setTitle("Fortnite Tracker Статистика")
            .setURL(data.url)
            .setThumbnail(randgif)
            .addField("Solo", `🥇**Побед:** ${sowins}\n🏅**Top 3 :** ${sotop3}\n**К-т убийств/смертей:** ${sokd}\n**Сыграно матчей:** ${somatches}\n**Убийств:** ${sokills}\n**Количество очков:** ${soscore}`, true)
            .addField("Duo", `🥇**Побед:** ${dwins}\n🏅**Top 3 :** ${dtop3}\n**К-т убийств/смертей:** ${dkd}\n**Сыграно матчей:** ${dmatches}\n**Убийств:** ${dkills}\n**Количество очков:** ${dscore}`, true)
            .addField("Squads", `🥇**Побед:** ${sqwins}\n🏅**Top 3 :** ${sqtop3}\n**К-т убийств/смертей:** ${sqkd}\n**Сыграно матчей:** ${sqmatches}\n**Убийств:** ${sqkills}\n**Количество очков:** ${sqscore}`, true)
            .addField("За всё время", `🏆**Побед:** ${lwins}\n**Процент побед:** ${lwinper}\n**Коэф-т убийств/смертей:** ${lkd}\n**Количество матчей:** ${lmplayed}\n**Убийств:** ${lkills}\n**Количество очков:** ${lscore}`, true)
            .setColor("#9400D3")
            .setImage("https://i.imgur.com/9xPI69M.jpg")
            return msg.embed(embed);

        }).catch (e => {
            msg.say(`Игрок не найден!`);
        });  
    }
};