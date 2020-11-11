module.exports = function (raw) {
    let playerIdRaw = raw;
    let playerIdFormat = "";

    if (playerIdRaw.charAt(2) == '!'){
        playerIdFormat = playerIdRaw.substring(3,playerIdRaw.length - 1);
    }else playerIdFormat = playerIdRaw.substring(2,playerIdRaw.length - 1);

    return playerIdFormat;
}