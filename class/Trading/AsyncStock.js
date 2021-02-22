const getStockData = require('../../functions/stockRequests').getStockData;
const {MessageEmbed} = require ('discord.js');
const Color = require('../../configs/colors.json').stock_embed;

class AsyncStock {

    constructor(symbol){
        this.exchangeSym = null;
        this.region = 'US';
        this.name = null;
        this.symbol = symbol;
        this.price = null;
        this.currency = null;
        this.dayLow = null;
        this.dayHigh = null;
        this.marketOpen = null;
        this.preMarket = null;
    }

    async fetchAndUpdateData(){
        let stock = await getStockData(this.symbol,this.region);
        let data = await stock.data.price;
        
        if (stock.data.price.exchange === 'YHD'){
            return new Error('Not found!');
        }

        this.exchangeSym = data.exchange;
        this.name = data.shortName;
        this.symbol = data.symbol;
        this.price = data.regularMarketPrice.raw;
        this.currency = data.currency;
        this.dayLow = data.regularMarketDayLow.raw;
        this.dayHigh = data.regularMarketDayHigh.raw;
        this.marketOpen = data.regularMarketOpen.raw;
        this.preMarket = data.preMarketPrice.raw;
        
        return this;
    }

    getExchangeSym(){
        return this.exchangeSym;
    }

    getSymbol(){
        return this.symbol;
    }

    getName(){
        return this.name;
    }

    getSymbol(){
        return this.symbol;
    }

    getPrice(){
        return this.price;
    }

    getCurrency(){
        return this.currency;
    }

    getDayLow(){
        return this.dayLow;
    }

    getDayHigh(){
        return this.dayHigh;
    }

    getMarketOpen(){
        return this.marketOpen;
    }

    getPreMarket(){
        return this.preMarket;
    }

    async exportEmbed(){

        await this.fetchAndUpdateData();
        
        let stockEmbed = new MessageEmbed()
            .setColor(Color)
            .setAuthor('Stock information')
            .setDescription(`> **Exchange Symbol:** ${this.exchangeSym}
                         > **Stock Name:** ${this.name}
                         > **Stock Symbol:** ${this.symbol}
                         > **Stock Price:** ${this.price} ${this.currency}
                         > __**Daily Statistics**__
                         > - **Stock Market Open:** ${this.marketOpen} ${this.currency}
                         > - **Stock Day Low:** ${this.dayLow} ${this.currency}
                         > - **Stock Day High:** ${this.dayHigh} ${this.currency}
                         > - **Stock Pre Market Price:** ${this.preMarket} ${this.currency}`)
            .setTimestamp(new Date())
            .setFooter('Yahoo Finance API');

        return stockEmbed;
    }
}

module.exports = AsyncStock;