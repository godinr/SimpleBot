const { MessageEmbed, GuildMember, Client } = require("discord.js");
const Log = require("./Log");

/**
 * @class represents a Ban Log
 * @extends Log
 */
class BanLog extends Log {

    /**
     * @constructor creates a ban log
     * @param {Client} bot 
     * @param {GuildMember} member 
     * @param {GuildMember} mod 
     * @param {String} reason 
     * @param {String} color 
     * @param {Number} duration 
     */
    constructor(bot, member, mod, reason, color, duration){
        super(bot, member, mod, reason, color);
        this.duration = duration;
        this.action = 'BAN';
    }

    /** get the duration of the ban
     * @returns {Number}
     */
    getDuration(){
        return this.duration;
    }

    /**
     * set the duration of the ban
     * @param {Number} duration 
     */
    setDuration(duration){
        this.duration = duration;
    }

    /** get the type of action
     * @returns {String}
     */
    getAction(){
        return this.action;
    }


    /** get an embed representation of a ban log
     * @returns {MessageEmbed}
     */
    exportEmbed(){
        let banEmbed = new MessageEmbed()
            .setColor(this.color)
            .setAuthor(this.action, this.bot.user.avatarURL)
            .setDescription(`> **Member username:** ${this.member.user.username}
                             > **Member id:** ${this.member.id}
                             > **Mod id:** ${this.mod.id}
                             > **Reason:** ${this.reason}
                             > **Duration:** ${this.duration}`)
            .setTimestamp(new Date())
            .setFooter(this.mod.user.username, this.mod.user.avatarURL);

            return banEmbed;
    }

    /** get an object representation of a ban log
     * @returns {Object}
     */
    exportObject(){
        return {
            'member_id': this.member.id,
            'member_username': this.member.user.username,
            'mod_id' : this.mod.id,
            'ban_reason': this.reason,
            'ban_duration': this.duration,
            'timestamp': new Date()
        }
    }

}

module.exports = BanLog;