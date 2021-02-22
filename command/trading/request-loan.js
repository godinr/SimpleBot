const TradingCollection = require('../../configs/collections.json').trading;
let FieldValue = require('firebase-admin').firestore.FieldValue;
const uniqid = require('uniqid');

module.exports.run = async (bot, message, args) => {

    if (args.length != 1){
        return message.channel.send('Write the amount requested for the loan');
    }

    let amount = parseInt(args[0]);

    if (isNaN(amount) || amount < 0){
        return message.channel.send('Amount requested must be a positive number');
    }

    const collection = `${TradingCollection}${message.guild.id}`;

    const tradeAccountRef = bot.db.collection(collection).doc(message.member.id);
    const document = await tradeAccountRef.get();

    if (!document.exists){
        return message.channel.send('You dont have a Trader Account.');
    }

    const loanRef = bot.db.collection(collection).doc('loan_requests');
    const doc = await loanRef.get();
    const loanField = {
        'trader_id': message.member.id,
        'id': uniqid(),
        'amount': amount,
        'status': 'awaiting'
    }
    if (!doc.exists){
        loanRef.set({
            'request': [loanField]
        }).then(() => {
            message.channel.send(`Loan request for ${amount}$ submitted, you should get an answer shortly.`);
        }).catch((err) => {
            console.log(err);
        })
    }else {
        loanRef.update({
            'request': FieldValue.arrayUnion(loanField)
        }).then(() => {
            message.channel.send(`Loan request for ${amount}$ submitted, you should get an answer shortly.`);
        }).catch((err) => {
            console.log(err);
        })
    }

}

module.exports.help = {
    name: "request-loan",
    type: "open"
}