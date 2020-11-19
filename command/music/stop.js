
module.exports.run = async (bot, message) => {

    let serverQueue = bot.queue.get(message.guild.id);

    if (!message.member.voice.channel){
        console.log("User is not in a voice channel");
        return;
    }

    if (!serverQueue){
        console.log("No active song queue");
        return;
    }

    serverQueue.removeAll();
    serverQueue.connection.dispatcher.end();

}


module.exports.help = {
    name: "stop",
    type: "open"
}