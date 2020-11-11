module.exports.run = async (bot, message, db, args) => {
    
    let user = message.author, 
        guild = message.guild;

    let userRef = db.collection(guild.id).doc(user.id);

    userRef.get().then((result) => {
        if (!result.exists){
            userRef.set({
                username: user.username,
                balance: 0
            }).then(() => {
                message.channel.send('[Success]: You\'re profile has been created in the database');
            })
        }else {
            message.channel.send('[ERROR]: You\'re profile is already created in the database');
        }
    })


}


module.exports.help = {
    name: "join"
}