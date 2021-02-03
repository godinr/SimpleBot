const { indexOf } = require("ffmpeg-static");

class Builder {
    
    constructor(color, title, url, author, description,thumbnail,image,timestamp,footer){
        this.color = color;
        this.title = title;
        this.url = url;
        this.author = author;
        this.description = description;
        this.thumbnail = thumbnail;
        this.fields = Array();
        this.image = image;
        this.timestamp = timestamp;
        this.footer = footer;
    }

    getColor(){
        return this.color;
    }
    setColor(color){
        this.color = color;
    }

    getTitle(){
        return this.title;
    }
    setTitle(title){
        this.title = title;
    }

    getURL(){
        return this.url;
    }
    setURL(url){
        this.url = url;
    }

    getAuthor(){
        return this.author;
    }
    setAuthor(author){
        this.author = author;
    }

    getDescription(){
        return this.description;
    }
    setDescription(desc){
        this.description = desc;
    }

    getThumbnail(){
        return this.thumbnail;
    }
    setThumbnail(thumbnail){
        this.thumbnail = thumbnail;
    }

    getFields(){
        return this.fields;
    }

    addField(field){
        this.fields.push(field);
    }
    getFieldIndex(field){
        return this.fields.indexOf(field)
    }

    removeField(index){
        if (index >= this.fields.length || index < 0) return false;
        
        if (index == this.fields.length - 1) {
            this.fields.pop();
            return true;
        }
        // make sure to reposition all the fields in the correct order
        for (let i = index; i+1 < this.fields.length; i++){
            let temp = this.fields[i+1];
            this.fields[i+1] = this.fields[i];
            this.fields[i] = temp;
        }
        this.fields.pop();
        return true;
    }

    getImage(){
        return this.image;
    }
    setImage(img){
        this.image = img;
    }

    hasTimestamped(){
        return this.timestamp;
    }
    setTimestamp(ts){
        this.timestamp = ts;
    }

    getFooter(){
        return this.footer;
    }
    setFooter(footer){
        this.footer = footer;
    }


    toString(){
        return `**__EMBED BUILDER__**
                color: ${this.color.value}
                title: ${this.title.value}
                url:   ${this.url.value}
                author: ${this.author.value}
                description: ${this.description.value}
                image: ${this.image.value}
                timestamp: ${this.timestamp.value}
                footer: ${this.footer.value};
                `
    }



}


module.exports = Builder;