const { Command } = require('discord.js-commando');

module.exports = class NumCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'num',
            aliases: ['номер'],
            group: 'quiz',
            memberName: 'num',
            description: 'Угадайте число.',
            examples: ['num'],
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
      
        const numberToGuess = Math.floor(Math.random()*100);
        let passes = 10;
        let isWin = false;
        let ans = 'Угадайте число от 0 до 100!';
        while(passes > 0 && !isWin){
            await msg.reply(`${ans}\nОсталось попыток: \`${passes}\``);
            const filter = msgs => !isNaN(msgs.content) && msgs.author.id === msg.author.id;
            const response = await msg.channel.awaitMessages(filter, {
                max: 1,
                time: 15000
            });
            if(!response.size){
                await msg.channel.send('Извините! Время вышло!');
                break;
            }
            const choice = parseInt(response.first().content, 10);
            if(choice > numberToGuess){
                ans = '🔻 Загаданное число меньше!'
            } else if (choice < numberToGuess){
                ans = '🔺 Загаданное число больше!'
            } else {
                isWin = true;
            }
            passes--;
        }
        if (isWin) return msg.reply(`:tada: Вы победили! Число: \`${numberToGuess}\` :tada:`);
        return msg.reply(`:shrug: Вы проиграли... Число: \`${numberToGuess}\` :shrug:`);
	}
};