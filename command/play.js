const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const Music = require('./../class/Music');
const Song = require('./../class/Song');
let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports.run = async (bot, message, db, args) => {

    const youtube = new YouTube(process.env.YT_API);

    // no link or title
    if(!args){
        message.channel.send("Please include the youtube url or title of the song!");
        return;
    }

    
    const userLink = args[0];
    let url;
    let title;
    let hasUrl = true;

    // join the title into a string
    if (args.length > 1){
        title = args.join(' ');
        hasUrl = false;
    }
    // no url, lets find it
    if(!hasUrl){
        let search = await youtube.searchVideos(title, 1);
        url = await search[0].url;
    // if we have a url lets make sure its valid
    }else if (!ytdl.validateURL(userLink)) {
        console.log("Not a valid link");
        return;
    // we have a valid url
    }else{
        url = userLink;
    }

    // Make sure the user is in a voice channel
    if (message.member.voice.channel){

        // join the voice channel and dispatch the song
        const connection = await message.member.voice.channel.join();
        const details = await ytdl.getBasicInfo(url);
        const dispatcher = connection.play(ytdl(url, {filter: 'audioonly'}), {volume: 0.2});

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