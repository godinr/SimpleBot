
module.exports.run = async (bot,message,args) => {

    let serverQueue = bot.queue(message.guild.id);

    if (!serverQueue){
        return message.channel.send("No active dispatcher...");
    }

    if (!args){
        return message.channel.send(`Current volume: ${serverQueue.getVolume()}`);
    }

    let volume = args[0];
    volume = parseInt(volume);

    if (isNaN(volume)){
        return message.channel.send(`Volume option need to be a number.`);
    }

    if (volume < 0 && volume >= 1){
        return message.channel.send("Volume should not be 1 or higher. 0.9 is very loud");   
    }

    serverQueue.connection.dispatcher.setVolume = volume;
    serverQueue.setVolume(volume);
    return message.channel.send(`Volume has been changed to ${volume}`);



}


module.exports.help = {
    name: "volume"
}