module.exports = async(bot, guild) => {

    // create database collection for guild information
    bot.db.collection(guild.id).doc('settings').set({
        'prefix': '.',
        'log_channel_id': 'null'
    }).then(() => {
        console.log(`[New guild]: ${guild.name}`);
    }).catch((err) => {
        console.log(err);
    })

    // create collection for management role
    bot.db.collection(guild.id).doc('management').set({
        'user_id': [guild.ownerID]
    }).then(() => {
        console.log(`[new guild]: management role given to guild owner.`)
    }).catch((err) => {
        console.log(err);
    })

}