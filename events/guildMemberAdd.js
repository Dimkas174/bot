const Discord = require('discord.js'),
      textgmars = require('../assets/json/textgmars'),
      inviteLink = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-zA-Z0-9]{5,8}/gi,
      link = /bit.ly|(?:twitter|evernote|bitly).com|twitch.tv|kryptex.org|hashflare.io|(?:qps|clck).ru|qoo.by|fas.st|surfe.be/gi,
      got = require('got'),
      welcomeimg = require('../assets/json/welcomeimg');

module.exports = async (client, member) => {
    const guild = member.guild;
    if (member.guild.id === '548383798425813012') {
        
        var randtext = textgmars[Math.floor(Math.random() * textgmars.length)];
        let randgif = welcomeimg[Math.floor(Math.random() * welcomeimg.length)];
        var embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle("Добро пожаловать на сервер Ярмарка | V-MP.RU!")
        .setDescription(member + randtext)  // Это основной текст, он может содержать 2048 символов
        .setThumbnail(member.user.displayAvatarURL)
        .setImage(randgif)
        var _message = await client.channels.find(c => c.id === '548383798425813014').send(`${member}!`, {embed});
        _message.react('👋');
    }
};