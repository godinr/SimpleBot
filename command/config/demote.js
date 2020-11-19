
let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports.run = async (bot,message,args) => {

    if (args.length != 1) return message.channel.send('Make sure to @ the user you want to demote');

    const userid = args[0].substring(3,args[0].length-1);

    const guildRef = bot.db.collection(message.guild.id).doc('management');
    const guildDataRef = await guildRef.get();

    if (!guildDataRef.exists) return message.channel.send('An unexpected error has occured...');

    guildRef.update({
        user_id: FieldValue.arrayRemove(userid)
    }).then(() => {
        message.channel.send(`User_id: ${userid} has been demoted`);
    }).catch((err) => {
        console.log(err);
    })

}

module.exports.help = {
    name: "demote",
    type: "management"
}