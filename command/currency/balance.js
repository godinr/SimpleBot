const {MessageEmbed} = require('discord.js');

module.exports.run = async  (bot, message, args) => {

    const user = message.author;

    let userRef = bot.db.collection(message.guild.id).doc(user.id);
    let profile = await userRef.get();
    
    if(!profile.exists){
        return message.channel.send(`You dont hava an account, you can sign up with ${bot.prefix}signup`);
    }

    let checkings = profile.data().checkings;
    let savings = profile.data().savings;

    const balanceEmbed = new MessageEmbed()
        .setColor('#FF5733')
        .setAuthor('SimpleClam', bot.user.displayAvatarURL())
        .setTitle('Bank Account')
        .setDescription(`**__Checkings:__** ${checkings.toFixed(2)} $
                         **__Savings:__** ${savings.toFixed(2)} $`)
        .setTimestamp();

        message.channel.send(balanceEmbed);

}

module.exports.help = {
    name: 'balance',
    type: "open"
}