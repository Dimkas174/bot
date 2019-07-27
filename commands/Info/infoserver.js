const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js');

function checkBots(guild) {
    let botCount = 0; 
    guild.members.forEach(member => { 
      if(member.user.bot) botCount++; 
    });
    return botCount; 
}

function checkMembers(guild) {
    let memberCount = 0;
    guild.members.forEach(member => {
      if(!member.user.bot) memberCount++; 
    });
    return memberCount;
}


module.exports = class InfoserverCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'infoserver',
            aliases: ['инфосервер', 'serverinfo'],
            group: 'info',
            memberName: 'infoserver',
            description: 'Информация о сервере.',
            examples: ['infoserver'],
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
      msg.react('🔖');

        let embed = new RichEmbed()
        .setColor('RANDOM')   
        .setAuthor(`Информация о сервере ` + msg.guild.name, msg.guild.iconURL)
        .setThumbnail(msg.guild.iconURL)
        .addField("Название: ", msg.guild.name, true)
        .addField('Владелец: ', `:crown: ` + msg.guild.owner, true)
        .addField("ID", '🆔 ' + msg.guild.id, true)
        .addField("Кол-во участников: ", '👥 ' + msg.guild.memberCount, true)
        .addField('Чеовек: ', `:bust_in_silhouette: ` + checkMembers(msg.guild), true)
        .addField('Ботов: ', `:robot: ` + checkBots(msg.guild), true)
        .addField('Регион: ', msg.guild.region, true)
        .addField("Создан: ", ':calendar: ' + msg.guild.createdAt.toUTCString())
        .addField("Дата вашего присоединения к серверу:", ':date: ' + msg.member.joinedAt.toUTCString())
        .addField("Каналов", ':hash: ' + msg.guild.channels.size, true)
        .addField("Ролей", ':bookmark: ' + msg.guild.roles.size, true)
        .addField('Уровень проверки: ', `🔐 ` + msg.guild.verificationLevel, true)
        .setFooter("Запрос от " + msg.author.tag, msg.author.displayAvatarURL)
        .setTimestamp()
        msg.embed(embed)
    }
};