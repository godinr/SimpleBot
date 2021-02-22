const axios = require('axios').default;

module.exports = {
    getStockData: async function(symbol, region) {
        const options = {
            method: 'GET',
            url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-statistics',
            params: {symbol: symbol, region: region},
            headers: {
                'x-rapidapi-key': process.env.X_RAPID_API,
                'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
            }
        }

        const response = await axios.request(options);
        
        return response;
    }
}