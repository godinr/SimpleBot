class Music {

    /**Music construction
     * creates a field name list with an empty array
     */
    constructor(){
        this.list = Array();
    }

    // make a copy of the list passed as paramater
    copyList(list){
        this.list = list;
    }

    // Looks thru all the song listing stored into the list array
    // the list array is just a clone of the data from the database
    // if a song url is equal to the new url then return true and 
    // the song will not be added
    lookup(url){
        for (let i = 0; i < this.list.length; i++){
            if (this.list[i].video_url == url){
                return true;
            }
        }
        return false;
    }
}

module.exports = Music;