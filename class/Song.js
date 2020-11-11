class Song {

    /**Construct a song object
     * title: video title
     * time: video duration
     * url: video url
     */
    constructor(title, time, url){
        this.video_title = title;
        this.video_time = time;
        this.video_url = url;
    }

    /* Format I used in firebase to
        store new songs
    */
    databaseFormat(){
        return {
            video_title: this.video_title,
            video_time: this.video_time,
            video_url: this.video_url 
        }
    }

    /* Change the object into a string.
        usefull when debugging
    */
    toString() {
        return `Song information:        
        video_title: ${this.video_title}
        video_time: ${this.video_time}
        video_url: ${this.video_url}`;
    }
}

module.exports = Song;