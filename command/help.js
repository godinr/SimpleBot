const {MessageEmbed} = require('discord.js');

module.exports.run = async (bot,message) => {
    let commands = bot.commands.array();
    let result = '';
    
    for (let i = 0; i < commands.length; i++){
        result += `${bot.prefix}${commands[i].help.name}\n`;
    }
    
    let helpEmbed = new MessageEmbed()
        .setColor('#FF5733')
        .setAuthor('SimpleClam', bot.user.displayAvatarURL())
        .setTitle('Command list')
        .setDescription(result)
        .setTimestamp();

    message.channel.send(helpEmbed);


}

module.exports.help = {
    name: "help",
    type: "open"
}