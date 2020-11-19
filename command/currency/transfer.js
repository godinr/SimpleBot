module.exports.run = async (bot,message,args) => {

    if(args.length != 3){
        return message.channel.send('command needs 3 argument.\n'+
        'Sender, reicer, and amount. Ex: .transfer c s 1000\n'+
        'This will take 1000 from checkings and put it in savings.');
    }

    let sender = args[0];
    let receiver = args[1];
    let sum = parseFloat(args[2]);

    if (isNaN(sum)) return message.channel.send('Third argument must be a number.')

    function checkAccount(account){
        if (account != 'c' || account != 's')
            return false;
        return true;
    }
    console.log(`sender: ${sender}, receiver: ${receiver}`);

    if (checkAccount(sender) || checkAccount(receiver)) return message.channel.send('Account names dont exist, try **__c__** for checking and **__s__** for savings');

    const userRef = bot.db.collection(message.guild.id).doc(message.author.id);
    const profile = await userRef.get();

    if (!profile.exists) return message.channel.send(`You dont have a bank account, try ${bot.prefix}signup`);

    let checkingsBal = profile.data().checkings;
    let savingsBal = profile.data().savings;
    
    if (sender === 'c'){
        checkingsBal -= sum;
        savingsBal += sum;
    }else {
        checkingsBal += sum;
        savingsBal -= sum;
    }
    if (checkingsBal < 0 || savingsBal < 0) return message.channel.send('You dont have enough funds for this transfer');

    userRef.update({
        checkings: checkingsBal,
        savings: savingsBal
    }).then(() => {
        message.channel.send('Successful Transfer')
    }).catch((err) => {
        console.log(err);
    })


}

module.exports.help = {
    name: "transfer",
    type: "open"
}