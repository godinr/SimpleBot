class SongQueue {

    constructor(textChannel, voiceChannel,volume){
        this.textChannel = textChannel;
        this.voiceChannel = voiceChannel;
        this.connection = null;
        this.songs = Array();
        this.volume = volume;
        this.playing = true;
    }

    leaveVoiceChannel(){
        this.voiceChannel.leave();
    }

    setConnection(connection){
        this.connection = connection;
    }

    getConnection(){
        return this.connection;
    }

    setVolume(volume){
        this.volume = volume;
    }

    getVolume(){
        return this.volume;
    }

    addSong(song){
        this.songs.push(song);
    }

    getFirst(){
        return this.songs[0];
    }

    getFirstURL(){
        return this.songs[0].video_url;
    }

    removeFirst(){
        this.songs.shift();
    }

    removeAll(){
        this.songs = Array();
    }

    hasNext(){
        if (songs.length > 0){
            return true;
        }
        return false;
    }

}

module.exports = SongQueue;