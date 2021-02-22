const {MessageEmbed} = require('discord.js');
const Color = require('../../configs/colors.json').stock_embed;

class Stock {

    constructor(exchangeSym, market, name, symbol, price, currency, dayLow, dayHigh, marketOpen, preMarket){
            this.exchangeSym = exchangeSym;
            this.market = market;
            this.name = name;
            this.symbol = symbol;
            this.price = price;
            this.currency = currency;
            this.dayLow = dayLow;
            this.dayHigh = dayHigh;
            this.marketOpen = marketOpen;
            this.preMarket = preMarket;
    }

    getExchangeSym(){
        return this.exchangeSym;
    }

    getSymbol(){
        return this.symbol;
    }

    getMarket(){
        return this.market;
    }

    getMarketCurrency(){
        return this.market.split('_')[0];
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

    exportEmbed(){
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

    /*
    exportObject(){

    }
    */


}

module.exports = Stock;