
module.exports.run = async (bot, message, args) => {

    if (args.length != 2) return message.channel.send("Needs 2 argument, first is the account, second is the sum of the funds.");

    const account = args[0];
    const funds = parseFloat(args[1]);

    if (isNaN(funds) || funds <= 0) return message.channel.send("The second argument must be a number greater than 0.");

    if (!(account === 'c' || account === 's')) return message.channel.send("The first argument must either be **__c_** for checkings or **__s__** for savings.")

    const userRef = bot.db.collection(message.guild.id).doc(message.author.id);
    const profile = await userRef.get();

    if (!profile.exists) return message.channel.send(`You dont have a bank account, try ${bot.prefix}signup.`);

    let checkingBal = profile.data().checkings;
    let savingBal = profile.data().savings;

    if (account === 'c'){
        checkingBal += funds;    
    }else{
        savingBal += funds
    }

    userRef.update({
        checkings: checkingBal,
        savings: savingBal
    }).then(() => {
        message.channel.send("Funds Successfuly Added");
    }).catch((err) => {
        console.log(err);
    })

}

module.exports.help = {
    name: "get-funds",
    type: "management"
}