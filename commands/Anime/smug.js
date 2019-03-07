const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js');

module.exports = class SmugCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'smug',
            group: 'anime',
            aliases: ['aлицо'],
			memberName: 'smug',
			description: 'Случайное изображеие лица.',
            examples: ['smug'],
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
            }
		});
	}
	run(msg) {
        msg.react('😃');

        var imgNo = Math.floor(Math.random() * 58) + 1;

        let embed = new RichEmbed()
        .setColor('RANDOM')
        .setImage("http://smug.moe/smg/" + imgNo + ".png")
        msg.embed(embed);
    }
};