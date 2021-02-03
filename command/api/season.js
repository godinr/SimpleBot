const FieldPath = require('firebase-admin').firestore.FieldPath;

module.exports.run = async (bot, message, args) => {
    let seasonName = args[0];
    let fieldName = new FieldPath(args[1]);
    let hexColor = args[2];

    let seasonRef = bot.db.collection('seasons').doc(seasonName);
    let season = await seasonRef.get();

    if (!season.exists) console.log('Cant find it...');
    
    seasonRef.update(fieldName, hexColor);
    
}

module.exports.help = {
    name: "season",
    type: "open"
}