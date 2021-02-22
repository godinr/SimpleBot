const Portfolio = require('./Portfolio');
const Color = require('../../configs/colors.json').ta_embed;
const {MessageEmbed} = require('discord.js');

class TradingAccount {

    constructor(member){
        this.member = member;
        this.currency = 'USD';
        this.cash = 0;
        this.loan = 0;
        this.Portfolio = new Portfolio();
    }

    getUserID(){
        return this.member.id;
    }

    getMember(){
        return this.member;
    }

    setMember(member){
        this.member = member;
    }

    getCurrency(){
        return this.currency;
    }

    setCurrency(currency){
        this.currency = currency;
    }

    getCash(){
        return this.cash;
    }

    setCash(cash){
        this.cash = cash;
    }

    getLoan(){
        return this.loan;
    }

    setLoan(loan){
        this.loan = loan;
    }

    giveLoan(loan){
        this.loan += loan
    }

    getPortfolio(){
        return this.Portfolio;
    }

    setPortfolio(portfolio){
        this.portfolio = portfolio;
    }

    getPortfolioSize(){
        return this.portfolio.length;
    }

    exportEmbed(){
        let accountEmbed = new MessageEmbed()
        .setColor(Color)
        .setAuthor('Trading Account')
        .setDescription(`> **Member: ** ${this.member.user.tag}
                         > **Cash:** ${this.cash} ${this.currency}
                         > **Loan:** ${this.loan} ${this.currency}
                         > **Portfolio size:** ${this.getPortfolioSize()}`)
        .setTimestamp(new Date())
        .setFooter('need something here');

        return accountEmbed;
    }

    exportNewAccount(){
        return {
            'trader_id' : this.member.id,
            'cash': this.cash,
            'loan': this.loan,
            'portfolio': []
        }
    }

}


module.exports = TradingAccount;