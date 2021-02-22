const {MessageEmbed, GuildMember} = require('discord.js')

/**
 * @class represent a Log
 */
class Log {

    /** @constructs create log object
     * @param {GuildMember} member 
     * @param {GuildMember} mod
     * @param {String} reason 
     */
    constructor(bot, member, mod, reason, color){
        this.bot = bot;
        this.member = member;
        this.mod = mod;
        this.reason = reason;
        this.color = color;
        this.timestamp = new Date();
    }

    /** get the member acused in the log
     * @returns {GuildMember}
     */
    getMember(){
        return this.member;
    }

    /** get the mod who create the log
     * @returns {GuildMember}
     */
    getMod(){
        return this.mod;
    }

    /** get the reason behind the log
     * @returns {String}
     */
    getReason(){
        return this.reason;
    }

    /** get the color for the embed
     * @returns {String}
     */
    getColor(){
        return this.color;
    }

    /**
     * set the color for the embed
     * @param {String} color 
     */
    setColor(color){
        this.color = color;
    }
}

module.exports = Log;