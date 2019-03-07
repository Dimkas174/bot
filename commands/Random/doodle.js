const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js'),
      request = require('node-superfetch'),
      moment = require('moment');

module.exports = class PhotoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'doodle',
            aliases: ['рисунок'],
            group: 'random',
            memberName: 'doodle',
            description: 'Google Doodle.',
            examples: ['doodle'],
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
                duration: 20
            },
            args: [
				{
					key: 'month',
					prompt: 'What month would you like to get doodles for?',
					type: 'integer',
					default: 'latest'
				},
				{
					key: 'year',
					prompt: 'What year would you like to get doodles for?',
					type: 'integer',
					default: ''
				}
			]
        });
    }

    async run(msg, { month, year }) {
		const latest = month === 'latest';
		const now = new Date();
		if (latest) month = now.getMonth() + 1;
		if (!year) year = now.getFullYear();
		try {
			const { body } = await request.get(`https://www.google.com/doodles/json/${year}/${month}`);
			if (!body.length) return msg.say('Could not find any results.');
			const data = body[latest ? 0 : Math.floor(Math.random() * body.length)];
			const runDate = moment.utc(data.run_date_array.join('-')).format('MMMM Do, YYYY');
			return msg.say(`${runDate}: ${data.share_text}`, { files: [`https:${data.url}`] });
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};