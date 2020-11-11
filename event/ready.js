const admin = require('firebase-admin');
const serviceAccount = require('../database/firebaseAuth.json');
require('dotenv/config');

module.exports = (bot) => {
    
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.DB_URL
      });

    let guildCount = bot.guilds.cache.size;

    console.log(`[Connection] Bot is now active for ${guildCount} guilds.`);

    bot.user.setActivity(".help",{type: "PLAYING"});

}