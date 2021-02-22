const TradingCollection = require('../../configs/collections.json').trading;
const Table = require('../../class/Format/Table');
const REQUEST_STATUS = ['awaiting','accepted', 'refused'];
const validateStatus = require('../../functions/validate').validateStatus;
module.exports.run = async (bot, message, args) => {

    if (args.length > 1){
        return message.channel.send("Only one argument for the status or 0 for all the request");
    }
    let status = 'awaiting';
    
    if (args.length == 1){
        status = args[0];
    }

    if (!validateStatus(status,REQUEST_STATUS)){
        return message.channel.send(`Status ${status} is incorrect. Here are the correct options: awaiting, accepted and refused`);
    }

    const collection = `${TradingCollection}${message.guild.id}`;
    const loanRequestRef = bot.db.collection(collection).doc('loan_requests');
    const document = await loanRequestRef.get();

    if (!document.exists){
        return message.channel.send(`Couldnt find any loan request`);
    }

    let requests = document.data().request;
    let filtedRequest = requests.filter(req => req.status === status);
    let dataForTable = Array();

    for (let i = 0; i < filtedRequest.length; i++){
        let innnerData = [filtedRequest[i].trader_id,filtedRequest[i].id,String(filtedRequest[i].amount), filtedRequest[i].status];
        dataForTable.push(innnerData);
    }
    
    let tableHeader = ['TRADER_ID', 'RESQUEST_ID', 'AMOUNT', 'STATUS'];
    let requestTable = new Table(tableHeader,dataForTable,4);
    requestTable.calculateMaxCellLength();
    requestTable.generateTable();

    let table = requestTable.exportTableWithLine();

    message.channel.send('`'+table+'`');

}


module.exports.help = {
    name: "view-request",
    type: "management"
}