const ytdl = require('ytdl-core');
const Music = require('./../class/Music');
const Song = require('./../class/Song');
let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports.run = async (bot, message, db, args) => {

    /* Check to see if the user included a link with the command.
        if le length is not equal to 1 that means we sont have a link
        so we can send a message and stop executing the code.
    */
    if(args.length != 1){
        message.channel.send("Please include the youtube url to the song!");
        return;
    }

    // Save the link from the args
    const link = args[0];

    // Make sure the user is in a voice channel
    if (message.member.voice.channel){

        // Make sure the link is a valid youtube video
        if (!ytdl.validateURL(link)){
            message.channel.send("Url is not valid!");
            return;
        }
        // join the voice channel and dispatch the song
        const connection = await message.member.voice.channel.join();
        const details = await ytdl.getBasicInfo(link);
        const dispatcher = connection.play(ytdl(link, {filter: 'audioonly'}), {volume: 0.2});

        dispatcher.on('finish', () => {
            console.log('done playing');
        })

        // Getting the video information
        let videoTitle = details.videoDetails.title;
        let videoLength = details.videoDetails.lengthSeconds;
        let videoURL = details.videoDetails.video_url;
        
        // Creating a Song object to with the video information
        let song = new Song(videoTitle, videoLength, videoURL);
        let music = new Music();
        console.log(song.toString());
        let musicRef = db.collection(message.guild.id).doc('music');
        
        // formating the data for the database
        let songData = song.databaseFormat();

        // Get the music document
        musicRef.get().then((res) => {
            
            // check if the music document does exist
            if (res.exists){
                // Copy all the data since of music.songs for the music object
                music.copyList(res.data().songs);

                // if the song isnt already into the database then add it
                if (!music.lookup(song.video_url)){
                    console.log("Adding new song to the database");
                    musicRef.update({
                        'songs': FieldValue.arrayUnion(songData)
                    });

                }else {
                    console.log('Song already is in the database');
                }
            // if the music document doesnt exist in firebase, create it
            }else {
                musicRef.set({
                    songs: [songData]
                });
            }
        })
    }
}
module.exports.help = {
    name: "play"
}