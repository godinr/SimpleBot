class Music {

    /**
     * Music object
     * @constructor
     */
    constructor(){
        this.list = Array();
    }

    /**
     * copy a list of Song
     * @param {[Song]} list 
     */
    copyList(list){
        this.list = list;
    }

    /**
     * look thru list to see if the song url already exist
     * @param {String} url 
     * @returns {Boolean}
     */
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