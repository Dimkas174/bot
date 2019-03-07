const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js'),
      owjs = require("overwatch-js");

module.exports = class OverwatchCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'overwatch',
            aliases: ['овервотч'],
            group: 'games',
            memberName: 'overwatch',
            description: 'Показывает профиль упомянутого пользователя.',
            examples: ['overwatch <pc|xbl|psn> <us|eu|kr|cn|global> <ник#тег> (без <>)'],
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
                    key: 'platform',
                    prompt: 'Какая платформа pc, xbl или psn? \nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
                    type: 'string',
                    oneOf: ["pc", "xbl", "psn", "xbox"]
                },
                {
					key: 'location',
					prompt: 'Введите регион? us, eu, kr, cn или global?\nПример команды: \`overwatch <pc|xbl|psn> <us|eu|kr|cn|global> <ник#тег> (без <>)\` \nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
                    type: 'string',
                    oneOf: ["us", "eu", "kr", "cn", "global"]
                },
                {
					key: 'player',
					prompt: 'Предоставте ник#тег!\nПример команды: \`overwatch <pc|xbl|psn> <us|eu|kr|cn|global> <ник#тег> (без <>)\`. \nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
					type: 'string'
                },
            ]
        });
    }

    async run(msg, {platform, location, player }) { // eslint-disable-line no-unused-vars
        if (platform === "xbox") platform = "xbl";
        player = player.replace(/#/g , "-");
        const data = await owjs.getAll(platform, location, player).catch(e => {
             console.log(e.stack);
        return null;
    });
        if (!data) msg.reply("Извините, но что-то пошло не так :<");
        const embed = new RichEmbed()
            .setTitle(`${data.profile.nick}. Платформа: ${platform}. Регион: ${location}`)
            .setURL(data.profile.url)
            .setThumbnail(data.profile.avatar)
            .addField("Профиль", `🎖**LVL:** ${data.profile.level} | **Ранг:** ${data.profile.rank ? data.profile.rank : "-"} | **Tier:** ${data.profile.rank ? data.profile.tier : "-"} | **Титул:** ${data.profile.ranking ? data.profile.ranking : "-"}
                                  ✴  ✴  ✴`)
            .addField("Competitive", `**MasteringHeroe:** ${data.competitive.global.masteringHeroe ? data.competitive.global.masteringHeroe : ""}
                                      **Побед/Сметей:** 🏆${data.competitive.global.games_won ? data.competitive.global.games_won : "-"} / 💀${data.competitive.global.deaths ? data.competitive.global.deaths : "-"}
                                      ✴  ✴  ✴`, true)
            .addField("Quickplay", `**MasteringHeroe:** ${data.quickplay.global.masteringHeroe ? data.quickplay.global.masteringHeroe : ""}
                                    **Побед/Сметей:** 🏆${data.quickplay.global.games_won ? data.quickplay.global.games_won : "-"} / 💀${data.quickplay.global.deaths ? data.quickplay.global.deaths : "-"}
                                    ✴  ✴  ✴`, true)
            .addField("Медалей ", `🏅${data.competitive.global.medals ? data.competitive.global.medals : "-"} | 🥇${data.competitive.global.medals_gold ? data.competitive.global.medals_gold : "-"} | 🥈${data.competitive.global.medals_silver ? data.competitive.global.medals_silver : "-"} | 🥉${data.competitive.global.medals_bronze ? data.competitive.global.medals_bronze : "-"}`, true)
            .setColor("#FFA500");
        return msg.say(embed);
    }
};