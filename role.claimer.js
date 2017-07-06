/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.claimer');
 * mod.thing == 'a thing'; // true
 */
var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) {
	        
	        settleflag = Game.flags.Settle
	        
	        if(creep.room == Game.flags.Settle.room)
	        {
	           contoller = Game.flags.Settle.room.controller    
	        }
	        else
	        {
	            contoller = Game.flags.Settle.room
	        }
            if(creep.claimController(contoller) != OK || creep.claimController(contoller) == ERR_NOT_IN_RANGE) {
                
                if(settleflag.room != undefined && settleflag.room.name == creep.room.name)
                {
            
                    creep.moveTo(contoller)
                 
                }else
                {
                 creep.moveTo(settleflag)   
                }
                
            }
        
        
	}
};

module.exports = roleClaimer;