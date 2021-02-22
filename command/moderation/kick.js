const KickLog = require('../../class/Logs/KickLog');
const Color = require('../../configs/colors.json');
let FieldValue = require('firebase-admin').firestore.FieldValue;


module.exports.run = async (bot, message, args) => {

    if (!args) {
        return message.channel.send(`Command information\n${bot.prefix}kick @user reason`);
    }

    const memberToKick = message.mentions.members.first();
    let argsParsing = args.splice(1);
    let reason = argsParsing.join(' ');
    if (!reason) reason = 'none';

    // create log object
    let kickLog = new KickLog(bot, memberToKick, message.member, reason, Color.log_embed);

    // get log channel id
    const guildRef = bot.db.collection(message.guild.id).doc('settings');
    const document = await guildRef.get();
    
    if (!document){
        return message.channel.send(`[DB_SETTINGS_MISSING] An error has occured`);
    }
    // make sure a channel matches the log channel id
    const logChannelID = document.data().log_channel_id;
    const logChannel = message.guild.channels.cache.find(channel => {
        return channel.id === logChannelID
    });

    if (!logChannel){
        return message.channel.send(`log channel not set up, use the ${bot.prefix}set-logs command.`)
    }

    // get the db data for kicked members
    const modTrackRef = bot.db.collection(message.guild.id).doc('kicked_logs');
    const docObject = await modTrackRef.get();
    
    // first log
    if (!docObject.exists){
        modTrackRef.set({
            'logs': [kickLog.exportObject()]
        }).then(() => {
            console.log('First kick_log created');
        }).catch((err) => {
            console.log(err);
        })
    }else {
        modTrackRef.update({
            'logs': FieldValue.arrayUnion(kickLog.exportObject())
        }).then(() => {
            console.log('Pushed new kick_log')
        }).catch((err) => {
            console.log(err);
        })
    }
    
    //kick the user
    memberToKick.kick();
    
    // send log embed
    logChannel.send({embed: kickLog.exportEmbed()})
    
}


module.exports.help = {
    name: "kick",
    type: "management"
}