const Log = require('./Log');
const {MessageEmbed, GuildMember, Client} = require('discord.js');

/**
 * @class representing a kicklog
 * @extends Log 
 */
class KickLog extends Log {

    /**
     * @constructor create a KickLog
     * @param {Client} bot 
     * @param {GuildMember} member 
     * @param {GuildMember} mod 
     * @param {String} reason 
     * @param {String} color 
     */
    constructor(bot, member, mod, reason, color){
        super(bot, member, mod, reason, color);
        this.action = 'KICK';
    }

    /** get the type of action
     * @returns {String} 
     */
    getAction(){
        return this.action;
    }

    /** get an embed representation of a kick log
     * @returns {MessageEmbed}
     */
    exportEmbed(){
        let banEmbed = new MessageEmbed()
            .setColor(this.color)
            .setAuthor(this.action, this.bot.user.avatarURL)
            .setDescription(`> **Member username:** ${this.member.user.username}
                             > **Member id:** ${this.member.id}
                             > **Mod id:** ${this.mod.id}
                             > **Reason:** ${this.reason}`)
            .setTimestamp(new Date())
            .setFooter(this.mod.user.username, this.mod.user.avatarURL);

            return banEmbed;
    }

    /** get an object representation of a kick log
     * @returns {Object}
     */
    exportObject(){
        return {
            'member_id': this.member.id,
            'member_username': this.member.user.username,
            'mod_id' : this.mod.id,
            'kick_reason': this.reason,
            'timestamp': new Date()
        }
    }

}

module.exports = KickLog;