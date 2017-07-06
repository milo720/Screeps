var roleUpgrader = require('role.upgrader');
var roleSoldier = {
   

    /** @param {Creep} creep **/
    run: function(creep) {
	    
            
           
                    
                   
	   target = creep.room.find(FIND_CREEPS ,{filter: (creep) => (creep.owner.username != 'slowmotionghost' &&creep.owner.username != "milo720")
                    })
            
            if(!target || (target.length == 0) ) {
                try{
                target = creep.pos.findClosestByPath(FIND_STRUCTURES,{filter: (structure) => (structure.owner.username != 'slowmotionghost' &&structure.owner.username != "milo720" && structure.structureType != STRUCTURE_CONTROLLER)
                    })
                }catch(err)
                {
                   target = [] 
                }
                
                if(!target || target.length == 0 ) {
                    
                    creep.moveTo(Game.flags.Attack)
                    }
                else{
                    console.log("pkjbkph"+creep.attack(target))
                    result = creep.attack(target)
                    console.log(creep.moveTo(target) )
                        if(result == OK){
                            
                        }else if(result == ERR_NOT_IN_RANGE){
                            creep.moveTo(target)
                        } 

                }
            }
            else
            {
                result = creep.attack(target[0])
                if(result == OK){
                    
                }else if(result == ERR_NOT_IN_RANGE){
                    creep.moveTo(target[0])
                }  
            }
            
	}
};
