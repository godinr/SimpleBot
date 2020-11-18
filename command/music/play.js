const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const Music = require('../../class/Music');
const Song = require('../../class/Song');
const SongQueue = require('../../class/SongQueue');
let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports.run = async (bot, message, args) => {
    // youtube api connection
    const youtube = new YouTube(process.env.YT_API);

    // get the queue
    let serverQueue = bot.queue.get(message.guild.id);

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
    if (!args[0].startsWith("https")){
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

    // get video details
    const details = await ytdl.getInfo(url);

    let videoTitle = details.videoDetails.title;
    let videoLength = details.videoDetails.lengthSeconds;
    let videoURL = details.videoDetails.video_url;
    
    // Creating a Song object to with the video information
    let song = new Song(videoTitle, videoLength, videoURL);
    let music = new Music();

    // formating the data for the database
    let songData = song.databaseFormat();



    // Make sure the user is in a voice channel
    if (message.member.voice.channel){

        // If we dont have a active queue, create one and join the voice channel
        if (!serverQueue) {
            let songQueue = new SongQueue(message.channel,message.member.voice.channel,0.2);
            bot.queue.set(message.guild.id, songQueue);
            songQueue.addSong(songData);

            try {
                let connection = await message.member.voice.channel.join();
                songQueue.connection = await connection;
                player(songQueue.getFirst());
            } catch (err) {
                console.log(err);
                bot.queue.delete(message.guild.id);
                return;
            }
        // with an active queue simply push the song into the songs array
        } else {
            
            serverQueue.addSong(songData);
            console.log('song added to queue');
        }

        /* Dispatche the song stream into the voice channel, recursive calls until 
         * the song queue is empty or force stopped.
         */
        function player(song){
            serverQueue = bot.queue.get(message.guild.id);

            if (!song){
                console.log('No songs to play.')
                serverQueue.leaveVoiceChannel();
                bot.queue.delete(message.guild.id);
                return;
            }

            const dispatcher = serverQueue.getConnection().play(ytdl(song.video_url, {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }))
                // remove last played song and call player with the next one in queue.
                .on('finish', () => {
                    serverQueue.removeFirst();
                    player(serverQueue.getFirst());
                })
                .on('error', (err) => {
                console.log(err);
                })

            dispatcher.setVolume(serverQueue.getVolume());
            console.log(`VOLUME: ${dispatcher.volume}`);
            console.log(`VOLUME DEC: ${dispatcher.volume.Decibels}`);
            console.log(`VOLUME LOG: ${dispatcher.volumeLogarithmic}`);
            console.log(`[PLAYER]: ${song.video_title}`);
        }

        // database music document reference
        let musicRef = bot.db.collection(message.guild.id).doc('music');

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