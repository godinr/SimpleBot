const Stock = require('../../class/Trading/Stock');
const AsyncStock = require('../../class/Trading/AsyncStock');
const Asset = require('../../class/Trading/Asset');
const updateStock = require('../../functions/updateStock');
const getStockData = require('../../functions/stockRequests').getStockData;
const TradingCollection = require('../../configs/collections.json').trading;
let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports.run = async (bot, message, args) => {

    if (args.length != 2){
        return message.channel.send('Missing arguments');
    }

    // Get trading account from the db
    const collection = `${TradingCollection}${message.guild.id}`;
    const tradeAccRef = bot.db.collection(collection).doc(message.member.id);
    const document = await tradeAccRef.get();

    // Member doesnt have a trading account
    if (!document.exists){
        return message.channel.send(`You need to create a trading account first.`);
    }

    // Get the stock
    const sym = args[0];
    const qte = args[1];

    let asyncStock = new AsyncStock(sym);

    asyncStock.fetchAndUpdateData().then((stock) => {
        let asset = new Asset(stock, qte, stock.getPrice());
        let cost = qte*stock.getPrice();
        let currentCash = document.data().cash;
        let updaptedCash = currentCash - cost;

        if (updaptedCash >= 0){
            tradeAccRef.update({
                cash: updaptedCash,
                portfolio: FieldValue.arrayUnion(asset.exportObject())
            }).then(() => {
                message.channel.send({embed: asset.exportEmbed()});
            })
        }else {
            message.channel.send(`insufficient funds:\nTotal cost: ${cost}\nBalance: ${currentCash}`);
        }
    }).catch((err) => {
        console.log(err);
    })
    

}


module.exports.help = {
    name: 'order',
    type: 'open'
}