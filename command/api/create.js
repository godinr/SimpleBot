module.exports.run = async (bot, message, args) => {
    bot.db.collection('seasons').doc('summer').set({
        Artist: "",
        Coder: "",
        Helper: ""
    });
}

module.exports.help = {
    name: "create",
    type: "open"
}