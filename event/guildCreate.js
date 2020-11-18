
module.exports = async(bot, guild) => {

    bot.db.collection(guild.id).doc('prefix').set({
        'value': '.'
    }).then(() => {
        console.log(`[New guild]: ${guild.name}`);
    }).catch((err) => {
        console.log(err);
    })


}