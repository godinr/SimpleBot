const Asset = require('./Asset');

class Portfolio {

    constructor(){
        this.currency = 'USD';
        this.currentValue = 0;
        this.originalValue = 0;
        this.assets = Array();
    }

    getCurrency(){
        return this.currency;
    }

    setCurrency(currency){
        this.currency = currency;
    }

    getCurrentValue(){
        return this.currentValue;
    }

    setCurrentValue(currentValue){
        this.currentValue = currentValue
    }

    getOriginalValue(){
        return this.originalValue;
    }

    setOriginalValue(originalValue){
        this.originalValue = originalValue; 
    }

    getAssets(){
        return this.assets;
    }

    setAssets(assets){
        this.assets = assets;
    }

    addAsset(Asset){
        this.assets.push(Asset);

    }

}


module.exports = Portfolio;