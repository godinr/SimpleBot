const TradingCollection = require('../../configs/collections.json').trading;
const validateStatus = require('../../functions/validate').validateStatus;
let FieldValue = require('firebase-admin').firestore.FieldValue;
const OPTIONS = ['accepted','refused'];

module.exports.run = async (bot, message, args) => {

    if (args.length != 2){
        return message.channel.send('Needs 2 argument, first is the resquest id, second is the resquest response');
    }

    let requestId = args[0];
    let answer = args[1].toLowerCase();

    if (!validateStatus(answer, OPTIONS)){
        return message.channel.send('Invalide status update');
    }

    const collection = `${TradingCollection}${message.guild.id}`;

    const loanRequestRef = bot.db.collection(collection).doc('loan_requests');
    const loanDoc = await loanRequestRef.get();

    if (!loanDoc.exists){
        return message.channel.send('No loan request found!');
    }

    let resquest = loanDoc.data().request;
    let memberRequest = resquest.filter(req => req.id === requestId)[0];
    console.log(memberRequest);


    loanRequestRef.update({
        'request': FieldValue.arrayRemove(memberRequest)
    }).then(() => {
        let updatedRequest = memberRequest;
        updatedRequest.status = answer;
        
        loanRequestRef.update({
            'request': FieldValue.arrayUnion(updatedRequest)
        })
    }).catch((err) => {
        console.log(err);
    })

    const traderAccountRef = bot.db.collection(collection).doc(memberRequest.trader_id);
    const document = await traderAccountRef.get();

    if (!document.exists){
        return message.channel.send('unexpected error');
    }
    traderAccountRef.update({
        'cash': FieldValue.increment(memberRequest.amount),
        'loan': FieldValue.increment(memberRequest.amount)
    }).then(() => {
        // TODO: some log
        message.channel.send(`<@${memberRequest.trader_id}>\nloan: ${requestId}\nupdate: ${answer}`)
    }).catch((err) => {
        console.log(err);
    })

}


module.exports.help = {
    name: 'answer-request',
    type: 'management'
}