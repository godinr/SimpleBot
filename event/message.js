
module.exports = async (bot, message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    // getting prefix from the db
    const guildRef = bot.db.collection(message.guild.id).doc('settings');
    const document = await guildRef.get();
    bot.prefix = await document.data().prefix;
    
    // parsing command from the message
    let msg_array = message.content.split(" ");
    let command = msg_array[0];
    let args = msg_array.slice(1);
    let prefixLength = bot.prefix.length;
    
    if (!command.startsWith(bot.prefix)) return;
    
    // Getting data related to management user id's
    const userPermRef = bot.db.collection(message.guild.id).doc('management');
    const userPermData = await userPermRef.get();
    const user_ids = userPermData.data().user_id;

    if (!userPermData.exists) return message.channel.send('Unexpected error has occured...');

    // chekcing if message author has management rights
    let manager = (user_ids.find((id) => {
        return id === message.author.id;
    }))

    if (bot.commands.get(command.slice(prefixLength))){
        let cmd = bot.commands.get(command.slice(prefixLength));
        /* check the command type, if the author is trying to use a
            management type command while not being a manager the command will 
            not execute and return instead, all other command are always executed
        */
        if (cmd){
            if (cmd.help.type === 'management' && !manager)
                return message.channel.send('Command locked for management only.');
             cmd.run(bot, message, args)
                .then(() => {
                    console.log(`[CMD] -> ${message.content}`);
                }).catch((err) => {
                    console.log(err);
                });
        }
    }
}