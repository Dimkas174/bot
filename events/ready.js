module.exports = (client) => {
    const guildNames = client.guilds.map(g => g.name).join("\n")
    console.log(`Успешный старт. Серверов: ${client.guilds.size} \n${guildNames}`);
};