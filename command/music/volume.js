
module.exports.run = async (bot, message, args) => {

    let serverQueue = bot.queue.get(message.guild.id);

    if (!serverQueue){
        return message.channel.send("No active dispatcher...");
    }

    if (args.length === 0){
        return message.channel.send(`Current volume: ${serverQueue.getVolume()}`);
    }

    let volume = args[0];
    console.log(volume);
    volume = parseFloat(volume);
    console.log(volume);

    if (isNaN(volume)){
        return message.channel.send(`Volume option need to be a number.`);
    }

    if (volume < 0 || volume > 0.5){
        return message.channel.send("Volume should not be 0.5 or higher.");   
    }

    serverQueue.connection.dispatcher.setVolumeLogarithmic(volume);
    serverQueue.setVolume(volume);
    return message.channel.send(`Volume has been changed to ${volume}`);



}


module.exports.help = {
    name: "volume"
}