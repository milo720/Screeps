var roleUpgrader = require('role.upgrader');
var roleWallBuilder = {

    run: function(creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            
            creep.say('building');
           
            var targets3 =creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART) &&
                            (structure.hits/structure.hitsMax) < 0.75;
                        targets.sort(a => 1/a.hits)
                    }
                }).sort(a => 1/a.hits)
       
             var targets4 =creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_ROAD ) &&
                            (structure.hits/structure.hitsMax) < 0.75;
                        targets.sort(a => 1/a.hits)
                    }
                }).sort(a => 1/a.hits)
             
             try{
                 creep.memory.target = targets3.concat(targets4)[0].id;
                 
             }
             catch(err)
             {
              creep.memory.target = []
              
             }
        
            creep.memory.building = true;

        }

	    if(creep.memory.building) {
	        
	       var target = Game.getObjectById(creep.memory.target)
            if(creep.memory.sourceRoom != creep.room.name)
                {
                console.log("creep source   :   "+ creep.name + "   :   " +creep.memory.sourceRoom + " :  " +  creep.moveTo(new RoomPosition(21,25,creep.memory.sourceRoom)))
                    creep.moveTo(new RoomPosition(21,25,creep.memory.sourceRoom))
                }
	       
            if(target != null && target != []) {
                
                if(creep.build(target) == ERR_NOT_IN_RANGE || creep.repair(target) == ERR_NOT_IN_RANGE ) {
                    creep.say("build")
                    creep.moveTo(target);
                }
                if(creep.build(target) == ERR_INVALID_TARGET && creep.repair(target) == ERR_INVALID_TARGET  )
                {
                   creep.memory.building = false 
                }
            }else
            {
                
               roleUpgrader.run(creep)
            }
               
            
	    }
	    else {
	       // var Container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
             //       filter: (s) => s.structureType == STRUCTURE_CONTAINER
               //                 && s.store[RESOURCE_ENERGY] > 0
        //})
          // if(Container != null){
            //if(creep.withdraw(Container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              //  creep.moveTo(Container)
            //}
           //}else
           //{
              source = Game.getObjectById(creep.memory.source)
              creep.say("harv " + source.id)
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source)
            //} 
           }
            
	    }
	}
};

module.exports = roleWallBuilder;