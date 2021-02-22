const TradingCollection = require('../../configs/collections.json').trading;
const TraddingAccount = require('../../class/Trading/TradingAccount');

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

    const tradingAccount = new TraddingAccount(user);
    tradingAccount.setCash(document.data().cash);
    tradingAccount.setLoan(document.data().loan);
    tradingAccount.setPortfolio(document.data().portfolio);

    message.channel.send({embed: tradingAccount.exportEmbed()});

}


module.exports.help = {
    name: 'view-account',
    type: 'open'
}