var helpers = require('Helpers');
var roleUpgrader = {

    /** @param {Creep} creep **/
   run: function(creep) {
       creep.say(!creep.memory.moving)
        var container = null;
        if(!creep.memory.moving) {
            if( creep.carry.energy != creep.carryCapacity)
            {

            
               var container = _.filter(helpers.ListCacheRoomProvider(creep,creep.room.name,FIND_STRUCTURES,30),
                   (s) =>( s.structureType == STRUCTURE_STORAGE)
                                && s.store[RESOURCE_ENERGY] > 0
            )
           
           if(container != null && container[0] != null){
               creep.say(container[0].id) 
               creep.memory.target = container[0].id
           }else 
           {
            container = helpers.ListCacheRoomProvider(creep,Game.rooms[creep.memory.baseRoom].name,FIND_DROPPED_ENERGY,60).map(function (item) {
        	                return item.id;
                            });
                            container = container.sort((a,  b) => Game.getObjectById(b).energy - Game.getObjectById(a).energy )
                            if(!!container && !!container[0])
                            {
                            creep.memory.target = container[0]
                            }
                            else
                            {
                                container =   _.filter(helpers.ListCacheRoomProvider(creep,creep.room.name,FIND_STRUCTURES,30),
                                            (s) =>( s.structureType == STRUCTURE_CONTAINER)
                                                    && s.store[RESOURCE_ENERGY] > 0
                                                     ).map(function (item) {
        	                                        return item.id;
                                                    });
                            container = container.sort((a,  b) => Game.getObjectById(b).store.energy - Game.getObjectById(a).store.energy )
                            if(!!container && !!container[0])
                            {
                            creep.memory.target = container[0]
                            }
                            else
                            {
                             creep.memory.target = creep.memory.source
                            }
                            
                             
                        }
                    }
                   
                   
             creep.memory.moving = true;

            //creep.say('har: '+creep.memory.target);
        } else {
            
           
             
            console.log("hi")
             
             creep.memory.target = Game.rooms[creep.memory.baseRoom].controller.id
            creep.memory.moving = true;

        }
        }else{

	    if(Game.getObjectById(creep.memory.target) != null && Game.getObjectById(creep.memory.target).structureType == STRUCTURE_CONTROLLER) {
	        
	       var target = Game.getObjectById(creep.memory.target)
            if(creep.memory.baseRoom != creep.room.name)
                {
                creep.moveTo(new RoomPosition(21,25,creep.memory.sourceRoom))
                }
	       if(creep.carry.energy == 0)
	       {
	           creep.memory.upgrading =false;
	           creep.memory.moving = false;
	       }
            if(target != null && target != []) {
                
                if(creep.upgradeController(target) == ERR_NOT_IN_RANGE) {

                    creep.moveTo(target, {'reusePath':15});
                }
               
                
            }else
            {
                
              creep.memory.moving = false
            }
               
            
	    }
	    else {
	     
           
           target = Game.getObjectById(creep.memory.target)
             if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE || creep.pickup(target) == ERR_NOT_IN_RANGE|| creep.harvest(target) == ERR_NOT_IN_RANGE) {
                
                    creep.moveTo(target, {'reusePath':15});
                }
            else if(creep.withdraw(target, RESOURCE_ENERGY) != OK || creep.pickup(target) != OK|| creep.harvest(target) != OK)
            {
                creep.memory.moving = false
            }
            if(target){
                  
                    creep.memory.moving = false
                
            }

            if(creep.carry.energy == creep.carryCapacity)
    	    {
    	        creep.memory.moving = false
    	        creep.memory.upgrading = true
    	    }
    	    if(target == undefined)
            {
    	        creep.memory.moving = false

    	    }else
    	    {
    	        
    	       if(target.store == undefined){
        	       if( target.energy == 0 )
        	       {
        	           
        	       creep.memory.moving = false
        	       }
    	       }
    	       else
    	       {
    	           
    	         if(  target.store.energy == 0)
        	       {
        	           
        	       creep.memory.moving = false
        	       }   
    	       }
    	    }


	    }

	  }
    
	}
};

module.exports = roleUpgrader;