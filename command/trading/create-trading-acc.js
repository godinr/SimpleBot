const TradingAccount = require('../../class/Trading/TradingAccount');
const TradingCollection = require('../../configs/collections.json').trading;

module.exports.run = async (bot, message, args) => {

    let collection = `${TradingCollection}${message.guild.id}`;

    // check for existing account
    let tradingAccRef = bot.db.collection(collection).doc(message.member.id);
    let document = await tradingAccRef.get();

    if (document.exists){
        return message.channel.send('You already have a trading account.');
    }

    let tradingAccount = new TradingAccount(message.member);

    console.log(tradingAccount.exportNewAccount())

    tradingAccRef.set(tradingAccount.exportNewAccount()).then(() => {
        message.channel.send(`Trading Account created.\nTo view portfolio use the following command: ${bot.prefix}portfolio`);
    }).catch((err) => {
        console.log(err);
    })
}

module.exports.help = {
    name: "create-trading-acc",
    type: "open"
}