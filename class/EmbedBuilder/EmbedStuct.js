class EmbedStruc {

    constructor(value, isIncluded){
        this.value = value;
        this.isIncluded = isIncluded;
    }

    getValue(){
        return this.value;
    }
    setValue(value){
        this.value = value;
    }

}

module.exports = EmbedStruc;