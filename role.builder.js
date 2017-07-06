var roleUpgrader = require('role.upgrader');
var roleBuilder = {

    run: function(creep) {
        flag = Game.flags.Settle
        
        if(!!flag && !!flag.room&&(creep.room.name != flag.room.name ))
        {
            creep.moveTo(flag)
            
            creep.memory.source = flag.room.find(FIND_SOURCES)[0].id
            try{
            creep.memory.sourceRoom = flag.room.name
            creep.memory.target = flag.room.find(FIND_SOURCES)[0].id
            }
            catch(err)
            {
                console.log("error in flag movment of build roll:" + err)
            } 
            
            creep.memory.moving = true;
            
            return 0
        }
        if(!creep.memory.moving) {
            
            if(!creep.memory.building)
            {
            var containers = []
            creep.memory.building = false;
            
                containers = containers.concat(creep.room.find(FIND_STRUCTURES, {
                   filter: (s) =>{ return(s.structureType == STRUCTURE_CONTAINER)
                                && s.store[RESOURCE_ENERGY] > 0 && s.room.name == creep.room.name}
            }))

          
            
             containers = containers.concat(creep.room.find(FIND_DROPPED_RESOURCES))
             var targets = containers.sort((a,  b) => (b.energy || b.store.energy) - (a.energy || a.store.energy));
             if(targets.length > 0)
             {
                 

                 creep.memory.target = targets[0].id
             }
             creep.memory.moving = true;
             creep.memory.building = false;
            
            creep.say('harvesting');
        }
        
        else {
            
         
             
            
             
             var targets = creep.room.find(FIND_CONSTRUCTION_SITES,{
                       filter: (structure) => {return(structure.structureType == STRUCTURE_TOWER ||structure.structureType == STRUCTURE_EXTENSION ||
                       structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_SPAWN) && creep.moveTo(structure) == OK && creep.build(structure) != ERR_INVALID_TARGET  }})
            
            if(!!targets &&targets[0] != null)
            {
                creep.memory.target = targets[0].id
                
            }
            else
            {
                 targets = creep.room.find(FIND_CONSTRUCTION_SITES, {filter: (structure) => {return creep.moveTo(structure) == OK && creep.build(structure) != ERR_INVALID_TARGET  }})
                if(!!targets &&targets[0] != null )
                {
                    
                    creep.memory.target = targets[0].id
                }
                else
                {
            
                    targets =  creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_ROAD ) &&
                            (structure.hits/structure.hitsMax) < 0.75;
                        
                    }
                }).sort(function(a, b) {
                          return (a.hits/a.hitsMax) - (b.hits/b.hitsMax);
                        });
                if(!!targets &&targets[0] != null )
                {
                    
                    creep.memory.target = targets[0].id
                }
                else
                {
                    creep.memory.target = creep.room.controller.id
                }
                
                }
            }
            
            creep.memory.moving = true;

        }
        }else{

	    if(creep.memory.building) {
	        
	       var target = Game.getObjectById(creep.memory.target)
	       creep.say("B:"+target)
	       
           
	       if(creep.carry.energy == 0)
	       {
	           creep.memory.building =false;
	           creep.memory.moving = false;
	       }
            if(target != null && target != [] && target != undefined) {
                if(creep.build(target) == ERR_NOT_IN_RANGE || creep.repair(target) == ERR_NOT_IN_RANGE ||creep.upgradeController(target) == ERR_NOT_IN_RANGE ) {
                    creep.say("B:"+target)
                    creep.moveTo(target);
                }
                 if(creep.build(target) == ERR_INVALID_TARGET )
                 {
                   creep.memory.moving = false;  
                 }
                
            }else
            {
                
               creep.memory.moving = false
            }
               
            
	    }
	    else {
            
           target = Game.getObjectById(creep.memory.target)
             if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE || creep.pickup(target) == ERR_NOT_IN_RANGE || creep.harvest(target) == ERR_NOT_IN_RANGE) {
                
                    creep.moveTo(target);
                }
            if(!(!!target)){
                  
                    creep.memory.moving = false
                
            }

            if(creep.carry.energy == creep.carryCapacity)
    	    {
    	        creep.memory.moving = false
    	        creep.memory.building = true
    	    }
    	    if(!(!!target))
            {
    	        creep.memory.moving = false

    	    }else
    	    {
    	       if((target != undefined) && (target.energy == 0 || target.store[RESOURCE_ENERGY] == 0))
    	       {
    	       creep.memory.moving = false
    	       }
    	    }


	    }

	  }
    
	}
};

module.exports = roleBuilder;