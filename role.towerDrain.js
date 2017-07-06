var towerDrain = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    
            
           
                if(creep.hits > (creep.hitsMax*0.99))
                {
                    
                    if(creep.room.name != "E73N28"){
                    var res= creep.moveTo(new RoomPosition(1,20, "E73N28"))
                    }
                    else
                    {
                       var des =  creep.room.find(FIND_STRUCTURES, {
                       filter: (structure) => {
                            return (
                                    structure.structureType == STRUCTURE_SPAWN ||
                                    structure.structureType == STRUCTURE_TOWER) 
                        }})
                     if(creep.attack(des[0]) == ERR_NOT_IN_RANGE)
                     {
                         creep.moveTo(des[0])
                     }
                    }
                    
                }
                else
                {
                 
                    creep.moveTo(new RoomPosition(48,3,'E72N28'))
                }
                
                
            }
        
        
	
};

module.exports = towerDrain;