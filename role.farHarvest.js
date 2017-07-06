var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    
            
            if(creep.harvest(Game.getObjectById(creep.memory.source)) == ERR_INVALID_TARGET || creep.harvest(Game.getObjectById(creep.memory.source)) == ERR_NOT_IN_RANGE) {
                
                if(creep.memory.sourceRoom != creep.room.name)
                {
                
                    creep.moveTo(new RoomPosition(1,30,creep.memory.sourceRoom))
                }else
                {
                    creep.moveTo(Game.getObjectById(creep.memory.source))
                }
                
            }
        
        
	}
};

module.exports = farHarvester;