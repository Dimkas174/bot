const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js'),
      request = require('node-superfetch');

module.exports = class ObnimCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'obnim',
            aliases: ['обними', 'обнимаешь'],
            group: 'anime',
            memberName: 'obnim',
            description: 'Обними кого-нибудь.',
            examples: ['obnim <@упоминание> (без <>)'],
            guildOnly: true,
            clientPermissions: [
                'ADD_REACTIONS',
                'MANAGE_MESSAGES',
                'SEND_MESSAGES',
                'ATTACH_FILES',
                'READ_MESSAGE_HISTORY'
            ],
            userPermissions: [
                'ADD_REACTIONS',
                'SEND_MESSAGES',
                'READ_MESSAGE_HISTORY'
            ],
            throttling: {
                usages: 2,
                duration: 20
            },
            args: [
                {
                    key: 'text',
                    prompt: '@Упомяните кого-нибудь! \nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
                    type: 'string',
                    validate: text => {
                        if (text.length < 2000) return true;
                        return 'Размер упоминания не должен превышать 2000 символов!'
                    }
                }
            ]
        });
    }

    async run(msg, { text }) {

        try {
            var member = msg.member;
            var mentionmembers = msg.mentions.members.first()
            const { body } = await request.get("https://rra.ram.moe/i/r?type=hug");
            const image = 'https://rra.ram.moe' + body.path;

            const embed = new RichEmbed();
            embed.setColor('RANDOM');
            embed.setTitle(`${member.displayName} обнимает ${mentionmembers.displayName}`)
            embed.setURL(image)
            embed.setImage(image);
            await msg.embed(embed);

        } catch(err) {
            return msg.say(err.stack);
        }                
    }
};