class EmbedField {
    
    constructor(name,value,inline){
        this.name = name; 
        this.value = value; 
        this.inline = inline;
    }

    getName(){
        return this.name
    };
    setName(name){
        this.name = name;
    };
    getValue(){
        return this.value
    };
    setValue(value){
        this.value = value;
    };
    isInline(){
        return this.inline;
    };
    setInline(inline) {
        this.inline = inline;
    };

    toString(){
        return `name: ${this.name}, value: ${this.value}, inline: ${this.inline}`;
    }
}

module.exports = EmbedField