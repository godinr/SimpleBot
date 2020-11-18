const admin = require('firebase-admin');
const serviceAccount = require('../database/firebaseAuth.json');
require('dotenv/config');

module.exports = (bot) => {
    
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.DB_URL
      });
    
    bot.db = admin.firestore();

    console.log("Simple Bot is online!");

    bot.user.setActivity(".",{type: "PLAYING"});

}