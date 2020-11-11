// packages
const Discord = require('discord.js');
const fs = require('fs');
require('dotenv/config');

// Configs
const token = process.env.TOKEN;

// Initialise bot
const bot = new Discord.Client();
bot.commands = new Discord.Collection();


// Event handler
fs.readdir('./event/', (err,files) => {
    if (err) {
        console.log(err);
    }
    files.forEach(file => {
        const event = require(`./event/${file}`);
        let eventName = file.split(".")[0];
        bot.on(eventName, event.bind(null, bot));
    });
});

// Command handler
fs.readdir('./command', (err,files) => {
    if (err) {
        console.log(err);
    }

    let cmdFiles = files.filter(f => f.split(".").pop() === "js");

    if (cmdFiles.length === 0){
        console.log("No files found");
        return;
    }

    cmdFiles.forEach((f,i) => {
        let props = require(`./command/${f}`);
        console.log(`${i+1}: ${f} loaded`);
        bot.commands.set(props.help.name, props);
    });
});

bot.login(token);