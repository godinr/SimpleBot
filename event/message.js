const admin = require('firebase-admin');

module.exports = async (bot, message) => {
    if (message.author.bot) return;
        
    prefix = '.';
    if (message.channel.type === "dm") return;

    let msg_array = message.content.split(" ");
    let command = msg_array[0];
    let args = msg_array.slice(1);
    //Would write permissions here
    if (!command.startsWith(prefix)) return;
    console.log(command);

    if (bot.commands.get(command.slice(prefix.length))){
        let cmd = bot.commands.get(command.slice(prefix.length));
        if (cmd){
            let db = admin.firestore();
             cmd.run(bot, message, db, args)
                .then(() => {
                    console.log(`[CMD] -> ${message.content}`);
                }).catch((err) => {
                    console.log(err);
                });
            }
    }
}