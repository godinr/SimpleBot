const Asset = require ('../class/Trading/Asset');
module.exports = {
    checkStock : function(portfolio,symbol) {
        for (let i = 0; i < portfolio.length; i++){
            if (portfolio[i].stock === symbol){
                let asset = new Asset(portfolio[i].stock,portfolio[i].shares,portfolio[i].buyingPrice)
                return asset;
            }
        }
        return null;
    }
    
}