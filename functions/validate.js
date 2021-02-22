
module.exports = {
    validateStatus: function (status, options) {
        for (let i = 0; i < options.length; i++){
            if (options[i] == status){
                return true;
            }
        }
        return false;
    }
}