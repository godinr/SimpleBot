let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports.run = async (bot, message, args) => {

    if (args.length != 1) return message.channel.send("One argument is needed, @ the user to promote.");

    if (args[0].length != 22) return message.channel.send("Make sure to @ the user to promote.");

    const userid = args[0].substring(3,args[0].length-1);

    const guildRef = bot.db.collection(message.guild.id).doc('management');
    const guildData = await guildRef.get();

    if (!guildData.exists) return message.channel.send('Unexpected error has occured...');
    
    guildRef.update({
        'user_id': FieldValue.arrayUnion(userid)
    }).then(() => {
        message.channel.send(`A management position was giving to: ${args[0]}`);
    }).catch((err) => {
        console.log(err);
    })

}


module.exports.help = {
    name: "promote",
    type: "management"
}