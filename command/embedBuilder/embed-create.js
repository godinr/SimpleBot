const EBuilder = require('../../class/EmbedBuilder/Builder');
const EField = require('../../class/EmbedBuilder/EmbedField');
const EStruct = require('../../class/EmbedBuilder/EmbedStuct');

module.exports.run = async (bot, message, args) => {

    let color = new EStruct('#eeeeee',true);
    let title = new EStruct('myTitle', true);
    let url = new EStruct('',false);
    let author= new EStruct('ryan',true);
    let description = new EStruct('My Description');
    let thumbnail = new EStruct('',false);
    let image = new EStruct('',false);
    let timestamp = new EStruct('',true);
    let footer = new EStruct('foootaaa', true);

    let f1 = new EField('first',1,false);
    let f2 = new EField('second',2,false);
    let f3 = new EField('third',3,true);
    let f4 = new EField('forth',4,true);

    let myEmbed = new EBuilder(color,title,url,author,description,thumbnail,image,timestamp,footer);

    //console.log(myEmbed.toString());

    myEmbed.addField(f1);
    myEmbed.addField(f2);
    myEmbed.addField(f3);
    myEmbed.addField(f4);
    console.log('-----------------------------------------------')
    console.log(myEmbed.getFields());
    console.log('-----------------------------------------------')
    myEmbed.removeField((myEmbed.getFieldIndex(f4)));

    console.log(myEmbed.getFields());
    console.log('-----------------------------------------------')

    

}


module.exports.help = {
    name: 'em',
    type: 'management'
}