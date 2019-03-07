const { Command } = require('discord.js-commando'),
      { RichEmbed, version } = require('discord.js'),
      os = require('os')

const activityTypes = [
    'играет',
    'стримит',
    'слушает',
    'смотрит',
];

module.exports = class StatsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'stats',
            aliases: ['статистика'],
            group: 'info',
            memberName: 'stats',
            description: 'Статистика бота.',
            examples: ['stats'],
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
        });
    }

    async run(msg) {
        msg.react('🤖');

        const game = this.client.user.presence.game || {};

        var embed = new RichEmbed()
            .setColor('RANDOM')
            .setAuthor("Информация о боте: ", this.client.user.displayAvatarURL)
            .setThumbnail(this.client.user.displayAvatarURL)
            .addField(":busts_in_silhouette: Пользователей: ", `${this.client.guilds.reduce((mem, g) => mem += g.memberCount, 0)}`, true)
            .addField(":desktop: Серверов: ", `${this.client.guilds.size}`, true)
            .addField(":keyboard: Каналов: ", `${this.client.channels.size}`, true)
            .addField("Discord.js: ", `${version}`, true)
            .addField("Node: ", `${process.version}`, true)
            .addField(`Использование памяти: `, `${(process.memoryUsage().rss / 1048576).toFixed(2)}MB / ${(os.totalmem() / 1073741824).toFixed(2)}GB`, false)
            .addField(`ЦП: `, `${os.cpus().length}x ${os.cpus()[0].model}`, false)
            .addField(`Load Average: `, `${os.loadavg()[1].toFixed(3)}`, false)
            .addField(`Система: `, `${os.type()} - ${os.arch()} ${os.release()}`, false)
            .addField(":video_game: Игра: ", `${(game.name) ? `*${activityTypes[game.type]}* ${game.name} ${game.streaming ? `[(Стримит)](${game.url})` : ''}` : '-'}`, true)
            .setFooter("Запрос от " + msg.author.tag, msg.author.displayAvatarURL)
            .setTimestamp()
        msg.embed(embed);
    }
};