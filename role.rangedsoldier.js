var roleUpgrader = require('role.upgrader');
var roleRangedSoldier = {
    run: function(creep) {

	    
            
           // target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS)
            if(!target) {
                target = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES)
            }
            
            if(target) {

                result = creep.attack(target)
                if(result == OK){
                    
                }else {
                    creep.moveTo(target)
                } 
            }
       
	}
};
module.exports = roleRangedSoldier;