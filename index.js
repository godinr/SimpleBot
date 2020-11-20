// packages
const Discord = require('discord.js');
const fs = require('fs');
require('dotenv/config');

// Configs
const token = process.env.TOKEN;

// Initialise bot and properties
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.aliases = new Collection(); 
bot.lockedCommands = new Discord.Collection();
bot.queue = new Map();

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

// Empty array for the commands
let commandList = Array();

// check if we have a folder
const isFolder = fileName => {
    return fileName.indexOf('.') === -1;
}

// check if we have a js file
const isJsFile = fileName => {
    return fileName.endsWith('.js');
}

// files in the command directory
const parent = fs.readdirSync('./command')
    .map(fileName => {
        return fileName
    }).filter(isJsFile);

// folders in the parent directory
const folders = fs.readdirSync('./command')
    .map(fileName => {
        return fileName
    }).filter(isFolder);

commandList = parent;

// check each folder and extract its js files
folders.forEach(folder => {
    const children = fs.readdirSync(`./command/${folder}`)
        .map(fileName => {
            return `/${folder}/${fileName}`;
        }).filter(isJsFile);

    commandList = commandList.concat(children);
});

if (commandList.length === 0){
    console.log("No files found");
    return;
}

commandList.forEach((f,i) => {
    let props = require(`./command/${f}`);
    bot.commands.set(props.help.name, props);
    console.log(`${i+1}: ${f} loaded`);
});

bot.login(token);
