
module.exports.run = async (bot, message, args) => {


    if (args.length > 1){
        return message.channel.send("Too many arguments!");
    }

    const prefix = args[0];

    const guildRef = bot.db.collection(message.guild.id).doc('settings');
    const document = await guildRef.get();
    
    if (!document.exists){
        return message.channel.send(`[DB_STTINGS_MISSING] An error has occured`);
    }

    if (prefix){
        guildRef.update({
            prefix: prefix
        }).then(() => {
            message.channel.send(`Prefix was changed to: ${prefix}`);
        })
    } else {
        message.channel.send(`Current Prefix: ${document.data().prefix}`);
    }
}

module.exports.help = {
    name: "prefix",
    type: "management"
}