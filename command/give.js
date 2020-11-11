let cleanID = require('../functions/cleanID');
let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports.run = async (bot, message, db, args) => {
    if (args.length != 2){
        message.channel.send('[Error using the command]\nExemple: .give @user 100');
        return;
    }

    let userId = args[0];
    let amount = parseInt(args[1]);

    if (!Number.isInteger(amount)){
        message.channel.send('[Error using the command]\nExemple: .give @user 100')
        return;
    }

    userId = cleanID(userId);
    
    let userRef = db.collection(message.guild.id).doc(userId);
    let oldBalance = userRef.get()
                        .then((result) => {
                            if (result.exists){
                                return result.data().balance;
                            }
                        });
    userRef.update({
        balance: FieldValue.increment(amount)
    }).then((res) => {
        console.log(res);
        console.log(balance +" | " + oldBalance)
        message.channel.send(`[success]\nNew balance: ${res.balance}\nOld balance: ${oldBalance}`)
    }).catch((err) => {
        message.channel.send('[Error] Make sure user is saved to the datebase')
    })
}


module.exports.help = {
    name: 'give'
}
