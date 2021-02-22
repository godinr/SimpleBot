const axios = require('axios').default;

module.exports = async function(symbol, region) {

    const options = {
        method: 'GET',
        url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-statistics',
        params: {symbol: symbol, region: region},
        headers: {
            'x-rapidapi-key': process.env.X_RAPID_API,
            'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
        }
    };

    const res = await axios.request(options);
    
    return {
        'exchange': res.data.price.exchange,
        'market': res.data.quoteType.market,
        'name': res.data.price.shortName,
        'sym': res.data.price.symbol,
        'price': res.data.price.regularMarketPrice.fmt,
        'currency': res.data.price.currency,
        'low': res.data.price.regularMarketDayLow.fmt,
        'high': res.data.price.regularMarketDayHigh.fmt,
        'open': res.data.price.regularMarketOpen.fmt,
        'pre': res.data.price.preMarketPrice.fmt
    }

}