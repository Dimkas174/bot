const { Command } = require('discord.js-commando'),
      { RichEmbed } = require('discord.js');

module.exports = class QuoteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'quote',
            aliases: ['цитата', 'qt', 'цт'],
            group: 'utility',
            memberName: 'quote',
            description: 'Цитирует сообщение через id.',
            examples: ['quote <id сообщения> (без <>)'],
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
                    key: 'text',
                    prompt: 'Введите id сообщения. \nУ вас есть 30 секунд. Либо введите \`cancel\` для отмены!',
                    type: 'string',
                    validate: text => {
                        if (text.length < 2000) return true;
                        return 'Сообщение не должно превышать 2000 символов!'
                    }
                }
            ]
        });
    }

    async run(msg, { text }) {
      msg.react('👌');
      setTimeout(() => msg.delete(), 1000);

      if (text.match(/[0-9]{2,18}/gi)) {
          msg.channel.fetchMessages({around: text, limit: 1})
          .then(messages => {
            const fetchedMsg = messages.first()
            var embeds = fetchedMsg.embeds[0]
            var Attachment = (fetchedMsg.attachments).array();
            var quote = new RichEmbed()
            quote.setColor(0x36393e);
            quote.setAuthor(msg.author.username + " процитировал " + fetchedMsg.author.username, msg.author.displayAvatarURL)
            quote.setTitle(fetchedMsg.author.username + " писал:")
            if (this.client.info.has(fetchedMsg.author.id)) {
              let ava = this.client.info.get(fetchedMsg.author.id).gifava;
              quote.setThumbnail(ava)
              } else {
                quote.setThumbnail(fetchedMsg.author.displayAvatarURL)
              }
              quote.setDescription(fetchedMsg)
              Attachment.forEach(async function(attachment) {
                quote.setImage(attachment.url);
              })
              msg.embed(quote);
              if (embeds) {
                let messageEmbed = new RichEmbed()
                if (embeds.hexColor) messageEmbed = messageEmbed.setColor(embeds.hexColor);
                if (embeds.title) messageEmbed = messageEmbed.setTitle(embeds.title);
                if (embeds.description) messageEmbed = messageEmbed.setDescription(embeds.description);
                if (embeds.thumbnail) messageEmbed = messageEmbed.setThumbnail(embeds.thumbnail.iconURL);
                if (embeds.footer) messageEmbed = messageEmbed.setFooter(embeds.footer.text, embeds.footer.iconURL);
                if (embeds.image) messageEmbed = messageEmbed.setImage(embeds.image.url);
                if (embeds.timestamp) messageEmbed = messageEmbed.setTimestamp();
                if (embeds.url) messageEmbed = messageEmbed.setURL(embeds.url);
                if (embeds.fields) {
                    for (let i = 0; i < embeds.fields.length; i++) {
                        messageEmbed = messageEmbed.addField(embeds.fields[i].name, embeds.fields[i].value, embeds.fields[i].inline);                    
                    }
                }
                msg.embed(messageEmbed)
              }
          });
        } else {
            var _message = await msg.say(`Это не id сообщения!`);
            setTimeout(() => _message.delete(), 60000);
        }
    }
};