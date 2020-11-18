
module.exports.run = async (bot, message, args) => {


    if (!args){
        return message.channel.send("Missing new prefix!");
    }

    if (args.length != 1){
        return message.channel.send("Too many arguments!");
    }

    const prefix = args[0];

    let guildRef = bot.db.collection(message.guild.id).doc('prefix');

    guildRef.get().then((res) => {
        
        if (!res.exists){
            return message.channel.send("An error has occured...");
        }
        guildRef.update({
            value: prefix
        })
        console.log(`Prefix was changed to: ${prefix}`);
    })
}

module.exports.help = {
    name: "prefix"
}