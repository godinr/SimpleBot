
module.exports.run = async (bot, message, args) => {
    
    if (!args || args.length > 1){
        return message.channel.send(`Command information\nHow to use: ${bot.prefix}set-logs [channel-id]`);
    }

    let channel_id = args[0];

    if(!message.guild.channels.cache.find(channel => channel.id === channel_id)){
        return message.channel.send(`Channel id not found`);
    }
    
    const guildRef = bot.db.collection(message.guild.id).doc('settings');
    const document = await guildRef.get();

    if (!document.exists){
       return message.channel.send(`[DB_SETTINGS_MISSING] An error has occured`);
    }

    guildRef.update({
        log_channel_id: channel_id
    }).then(() => {
        message.channel.send(`Succes, log channel saved`);
    }).catch((err) => {
        message.channel.send(`Unexpected error occured`);
    })


}


module.exports.help = {
    name: "set-logs",
    type: "management"
}