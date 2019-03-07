const { Command } = require('discord.js-commando');

module.exports = class MatematicCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'matematic',
            aliases: ['математика', 'mt'],
            group: 'quiz',
            memberName: 'matematic',
            description: 'Дайте ответ на математическую задачу.',
            examples: ['matematic'],
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
        msg.react('👌');
      
        const numberOne = Math.floor(Math.random()*100);
		const numberTwo = Math.floor(Math.random()*100);
		const oppr = Math.floor(Math.random()*4);
		let msgs;
        let answer;
        
		if (oppr === 1){
			msgs = `${numberOne} + ${numberTwo} = ?`;
			answer = numberOne + numberTwo;
		} else if (oppr === 2){
			msgs = `${numberOne} - ${numberTwo} = ?`;
			answer = numberOne - numberTwo;
		} else if (oppr === 3){
			msgs = `${numberOne} × ${numberTwo} = ?`;
			answer = numberOne * numberTwo;
		} else {
			msgs = `${numberOne} : ${numberTwo} = ?`;
			answer = numberOne / numberTwo;
        }
        
		await msg.reply(`:nerd: У вас есть 15 секунд что бы дать ответ!\n\`\`\`${msgs}\`\`\``);
		const filter = res => !isNaN(res.content) && res.author.id === msg.author.id;
		const response = await msg.channel.awaitMessages(filter, {
			max: 1,
			time: 15000
        });
        
		if(!response.size){
			return msg.reply(`:shrug: Извините! Время вышло! Ответ: \`${answer}\` :shrug:`);
		}
		const choice = parseInt(response.first().content, 10);
		if(choice === answer) return msg.reply(`:tada: Правильно! Ответ: \`${answer}\` :tada:`);
		return msg.reply(`:shrug: Неверно... Ответ: \`${answer}\` :shrug:`);
	}
};