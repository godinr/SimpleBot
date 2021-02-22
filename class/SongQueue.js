const { TextChannel, VoiceChannel, VoiceConnection } = require("discord.js");

class SongQueue {

    /**
     * @constructor
     * @param {TextChannel} textChannel 
     * @param {VoiceChannel} voiceChannel 
     * @param {Number} volume 
     */
    constructor(textChannel, voiceChannel,volume){
        this.textChannel = textChannel;
        this.voiceChannel = voiceChannel;
        this.connection = null;
        this.songs = Array();
        this.volume = volume;
        this.playing = true;
    }

    /** Leaves its current voice channel
     * @public
     */
    leaveVoiceChannel(){
        this.voiceChannel.leave();
    }

    /** sets a voice connection
     * @public
     * @param {VoiceConnection} connection 
     */
    setConnection(connection){
        this.connection = connection;
    }

    /** get the voice connection
     * @returns {VoiceConnection}
     */
    getConnection(){
        return this.connection;
    }

    /**
     * Change the broadcast volume
     * @param {Number} volume 
     */
    setVolume(volume){
        this.volume = volume;
    }

    /** get the broadcast volume
     * @returns {Number} 
     */
    getVolume(){
        return this.volume;
    }

    /**
     * Add a song to the queue
     * @param {Song} song 
     */
    addSong(song){
        this.songs.push(song);
    }

    /** returns first song in the queue
     * @returns {Song}
     */
    getFirst(){
        return this.songs[0];
    }

    /** returns the url of the first song in the queue
     * @returns {String}
     */
    getFirstURL(){
        return this.songs[0].video_url;
    }

    /**
     * removes the first song of the queue
     */
    removeFirst(){
        this.songs.shift();
    }

    /**
     * removes all songs from the queue
     */
    removeAll(){
        this.songs = Array();
    }

    /** Check if the queue has another song
     * @returns {Boolean}
     */
    hasNext(){
        if (songs.length > 0){
            return true;
        }
        return false;
    }

}

module.exports = SongQueue;