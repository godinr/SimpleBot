let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports.run = async (bot, message, args) => {

    if (args.length != 3) return message.channel.send("Needs 3 argument. \n**__1.__** @user\n**__2.__** your account (c or s)\n**__3.__** sum of funds to send");

    const receiver = args[0];
    const account = args[1];
    const funds = parseFloat(args[2]);

    if (receiver.length != 22) return message.channel.send('Receiver must the a User, @them');
    // remove the <@! ... >
    const receiverID = receiver.substr(3,receiver.length-4);

    if (!(account === 'c' || account === 's')) return message.channel.send("The Second argument must either be **__c_** for checkings or **__s__** for savings.")

    if (isNaN(funds) || funds <= 0) return message.channel.send("The third argument must be a number greater than 0.");

    const senderRef = bot.db.collection(message.guild.id).doc(message.author.id);
    const senderProfile = await senderRef.get();

    const receiverRef = bot.db.collection(message.guild.id).doc(receiverID);
    const receiverProfile = await receiverRef.get();

    if (!senderProfile.exists) return message.channel.send(`You dont have a bank account, try ${bot.prefix}signup.`);
    if (!receiverProfile.exists) return message.channel.send('The receiver doesnt have a bank account.');

    

    let checkingBal = senderProfile.data().checkings;
    let savingBal = senderProfile.data().savings;

    if (account === 'c'){
        checkingBal -= funds;    
    }else{
        savingBal -= funds
    }

    if(checkingBal < 0 || savingBal < 0) return message.channel.send('You dont have enough funds to transfer');

    senderRef.update({
        checkings: checkingBal,
        savings: savingBal
    }).then(() => {
        message.channel.send("Funds Successfuly Removed");
    }).catch((err) => {
        console.log(err);
    })

    receiverRef.update({
        checkings: FieldValue.increment(funds)
    }).then(() => {
        message.channel.send("Funds Successfuly Transfer to user");
    }).catch((err) => {
        console.log(err);
    })

}

module.exports.help = {
    name: "send-funds",
    type: "open"
}