const Color = require('../../configs/colors.json').asset_embed;
const {MessageEmbed} = require('discord.js');

class Asset {

    constructor(Stock, shares, buyingPrice){
        this.stock = Stock;
        this.shares = shares;
        this.buyingPrice = buyingPrice;
    }

    getStock(){
        return this.stock;
    }

    getShares(){
        return this.shares;
    }

    sellShares(qte){
        this.shares -= qte;
    }

    getBuyingPrice(){
        return this.buyingPrice;
    }

    getOrderValue(){
        return this.shares * this.buyingPrice;
    }


    exportEmbed(){
        let assetEmbed = new MessageEmbed()
        .setColor(Color)
        .setAuthor('New Asset')
        .setDescription(`> **Stock Symbol:** ${this.stock.getSymbol()}
                         > **Shares:** ${this.shares}
                         > **Buying Price:** ${this.buyingPrice}
                         > ---------------------------
                         > **Order total: ${this.getOrderValue()} ${this.stock.getCurrency()}**`)
        .setTimestamp(new Date())
        .setFooter('need something here');

        return assetEmbed;
    }

    exportObject(){
        return {
            'stock': this.stock.getSymbol(),
            'shares': this.shares,
            'buyingPrice': this.buyingPrice
        }
    }
    exportObjectWithoutStock(){
        return {
            'stock': this.stock,
            'shares': this.shares,
            'buyingPrice': this.buyingPrice
        }
    }

}


module.exports = Asset;