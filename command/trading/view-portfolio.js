const TradingCollection = require('../../configs/collections.json').trading;
const getStockData = require('../../functions/stockRequests').getStockData;
const Portfolio = require('../../class/Trading/Portfolio');
const Table = require('../../class/Format/Table');

module.exports.run = async (bot, message, args) => {

    const collection = `${TradingCollection}${message.guild.id}`;
    let user = message.member;
    
    if (args != 0){
        console.log(args.length);
        user = message.mentions.members.first();
    }

    const TradingAccountRef = bot.db.collection(collection).doc(user.id);
    const document = await TradingAccountRef.get();

    if (!document.exists){
        return message.channel.send(`User: ${user.user.tag} does not have an Trading account`);
    }

    const portfolio = new Portfolio();
    portfolio.setAssets(document.data().portfolio);
    let allAssets = portfolio.getAssets();
    let originalValue = 0;
    let stockList = Array();

    for (let i = 0; i < portfolio.getAssets().length; i++){
        originalValue += allAssets[i].buyingPrice * allAssets[i].shares;
        stockList.push(allAssets[i].stock);
    }

    portfolio.setOriginalValue = originalValue;

    const tableHeaders = ["STOCK", "SHARES", "BUY-PRICE", "CURRENT-PRICE", "VALUE"]
    let tableData = Array();
    let total = 0;

    for (let i = 0; i < stockList.length; i++){
        let row = Array();
        let stock = await getStockData(stockList[i],'US');
        let value = allAssets[i].shares*stock.data.price.regularMarketPrice.raw;
        total += value;
        let currentPrice = stock.data.price.regularMarketPrice.raw
        row.push(stockList[i]); row.push(allAssets[i].shares); row.push(String(allAssets[i].buyingPrice)); 
        row.push(String(currentPrice.toFixed(2)));
        row.push(String(value.toFixed(2)));
        
        tableData.push(row);
    }

    let totalValueRow = ["","","","TOTAL",String(total.toFixed(2))];
    tableData.push(totalValueRow);
    
    let table = new Table(tableHeaders,tableData,4);
    table.calculateMaxCellLength();
    table.generateTable();
    let stockTable = table.exportTableWithLine();

    message.channel.send('`'+stockTable+'`');
}


module.exports.help = {
    name: 'view-portfolio',
    type: 'open'
}