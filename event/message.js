
module.exports = async (bot, message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    // getting prefix from the db
    const guildRef = bot.db.collection(message.guild.id).doc('prefix');
    const document = await guildRef.get();
    bot.prefix = await document.data().value;
    
    // parsing command from the message
    let msg_array = message.content.split(" ");
    let command = msg_array[0];
    let args = msg_array.slice(1);
    let prefixLength = bot.prefix.length;
    
    //Would write permissions here
    if (!command.startsWith(bot.prefix)) return;
    
    if (bot.commands.get(command.slice(prefixLength))){
        let cmd = bot.commands.get(command.slice(prefixLength));
        if (cmd){
             cmd.run(bot, message, args)
                .then(() => {
                    console.log(`[CMD] -> ${message.content}`);
                }).catch((err) => {
                    console.log(err);
                });
            }
    }
}