var roleMover = require('role.mover');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep,targetHarv) {
	    if(creep.carry.energy < creep.carryCapacity) {
            
            if(creep.harvest(Game.getObjectById(creep.memory.source)) != OK) {
                
                 if(creep.memory.sourceRoom != creep.room.name)
                {
                
                    creep.moveTo(new RoomPosition(14,25,creep.memory.sourceRoom))
                }
                else
                {
                    if(creep.moveTo(Game.getObjectById(creep.memory.source)) != OK)
                    {
                        roleMover.run(creep)
                    };
                }
                
            }
        }
        else {
        
           var target = creep.room.find(FIND_STRUCTURES, {
                           filter: (structure) => {
                                return (structure.structureType == STRUCTURE_EXTENSION ||
                                        structure.structureType == STRUCTURE_SPAWN ||
                                        structure.structureType == STRUCTURE_TOWER
                                        )  && structure.my && structure.energy != structure.energyCapacity
                            }
                    })[0]
            if(target) {

                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }else
            {
            roleMover.run(creep)
            }
        }
	}
};

module.exports = roleHarvester;