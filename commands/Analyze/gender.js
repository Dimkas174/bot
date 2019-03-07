const { Command } = require('discord.js-commando'),
      request = require('node-superfetch');

module.exports = class GenderSignCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'gender',
			aliases: ['пол'],
			group: 'analyze',
			memberName: 'gender',
      description: 'Определяет пол по вашему нику.',
      examples: ['gender'],
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

	async run(msg) {
    
    var member = msg.member;
    var user = member.user;
    let name = user.username
    
		try {
			 const { body } = await request
				.get(`https://api.genderize.io/`)
				.query({ name });
			 if (!body.gender) return msg.say(`Я не могу определить какого пола ник **${body.name}**.`);
       if (body.gender === 'male') {
          return msg.say(`Я уверен на ${body.probability * 100}% ник **${body.name}** мужского пола.`);
       } else if (body.gender === 'female') {
          return msg.say(`Я уверен на ${body.probability * 100}% ник **${body.name}** женского пола.`);
       } else {
			    return msg.say(`Я уверен на ${body.probability * 100}% ник **${body.name}** ${body.gender} пола.`);
       }
		} catch(err) {
        return msg.say(err.stack);
    } 
	}
};