const TradingCollection = require('../../configs/collections.json').trading;
const checkStock = require('../../functions/checkPortfolio').checkStock;
const getStockData = require('../../functions/stockRequests').getStockData;
let FieldValue = require('firebase-admin').firestore.FieldValue;
const Table = require('../../class/Format/Table');

module.exports.run = async (bot, message, args) => {

    if (args.length != 2){
        return message.channel.send('In order to sell stocks you need to specify the stock and the quantity.');
    }
    const collection = `${TradingCollection}${message.guild.id}`;
    const traderAccountRef = bot.db.collection(collection).doc(message.member.id);
    const traderDoc = await traderAccountRef.get();

    if(!traderDoc.exists){
        return message.channel.send('You dont have a trading account.');
    }

    const stockSym = args[0];
    const qte = args[1];

    if (qte <= 1){
        return message.channel.send('You cant sell less then 1 stock');
    }

    const portfolio = traderDoc.data().portfolio;
    let userAsset = checkStock(portfolio, stockSym);
    
    if (userAsset == null){
        return message.channel.send(`You dont have any ${stockSym}, make sure you wrote the correct stock symbole`);
    }

    let shares = parseInt(userAsset.shares);
    let sellAll = false;

    if (qte > shares){
        return message.channel.send(`You dont have ${qte} shares, you have ${shares}`);
    }else if (qte == shares){
        sellAll = true;
    }

    const stockData =  await getStockData(stockSym,'US');
    const currentPrice = stockData.data.price.regularMarketPrice.raw;
    const sellValue = qte * currentPrice;

    traderAccountRef.update({
        'cash': FieldValue.increment(sellValue),
        'portfolio' : FieldValue.arrayRemove(userAsset.exportObjectWithoutStock())
    }).then(() => {
        if (!sellAll){
            userAsset.sellShares(qte);
            traderAccountRef.update({
                'portfolio' : FieldValue.arrayUnion(userAsset.exportObjectWithoutStock())
            })
        }
        // generate receipt in a Table
        let tableHeaders = ["STOCK", "QUANTITY", "PRICE", "TOTAL"];
        let tableData = [[stockSym, qte, currentPrice.toFixed(2)+"", sellValue.toFixed(2)+""]];
        let table = new Table(tableHeaders,tableData, 4);
        table.calculateMaxCellLength();
        table.generateTable();
        let saleTable = table.exportTableWithLine();
        message.channel.send('`'+saleTable+'`');

    }).catch((err) => {
        console.log(err);
    });


}


module.exports.help = {
    name: "sell",
    type: "open"
}