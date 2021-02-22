const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {

    if (!args){
        return message.channel.send('Missing argument, you need to specify the stock');
    }
    let stockQuery = args[0];
    let region = 'US';

    const options = {
        method: 'GET',
        url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-statistics',
        params: {symbol: stockQuery, region: region},
        headers: {
            'x-rapidapi-key': process.env.X_RAPID_API,
            'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
        }
    };

    axios.request(options).then((res) => {
        
        const exchangeSYM = res.data.price.exchange;
        const stockShortName = res.data.price.shortName;
        const stockSYM = res.data.price.symbol;
        const stockPrice = res.data.price.regularMarketPrice.fmt;
        const stockCurrency = res.data.price.currency;
        const stockDayLow = res.data.price.regularMarketDayLow.fmt;
        const stockDayHigh = res.data.price.regularMarketDayHigh.fmt;
        const stockMarketOpen = res.data.price.regularMarketOpen.fmt;
        const stockPreMarketPrice = res.data.price.preMarketPrice.fmt;

        if (exchangeSYM === 'YHD'){
            return message.channel.send(`Can't find a stock with the symbol: ${stockQuery}`)
        }

        let stockEmbed = new MessageEmbed()
            .setColor('#00aeff')
            .setAuthor('Stock information')
            .setDescription(`> **Exchange Symbol:** ${exchangeSYM}
                             > **Stock Name:** ${stockShortName}
                             > **Stock Symbol:** ${stockSYM}
                             > **Stock Price:** ${stockPrice} ${stockCurrency}
                             > __**Daily Statistics**__
                             > - **Stock Market Open:** ${stockMarketOpen} ${stockCurrency}
                             > - **Stock Day Low:** ${stockDayLow} ${stockCurrency}
                             > - **Stock Day High:** ${stockDayHigh} ${stockCurrency}
                             > - **Stock Pre Market Price:** ${stockPreMarketPrice} ${stockCurrency}`)
            .setTimestamp(new Date())
            .setFooter('Yahoo Finance API', bot.user.avatarURL())

            message.channel.send({embed: stockEmbed});

    }).catch((err) => {
        console.log(err);
    })

}


module.exports.help = {
    name: "stock",
    type: "open"
}