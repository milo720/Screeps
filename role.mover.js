var roleBuilder = require('role.builder');
var helpers = require('Helpers');
var roleMover = {
    
    
    run: function(creep) {
        if(!creep.memory.moveing){
            
            if(  creep.carry.energy == 0) {
               delete Memory.CreepChatter.Pickups[creep.id]
                var lol = []
                 for(var roomNum in Memory.roomStart[creep.memory.baseRoom].allRooms){
                    
                    try{
                        var curRoom = Game.rooms[Memory.roomStart[creep.memory.baseRoom].allRooms[roomNum].NameOfRoom]
                        
                        var targets = _.filter( helpers.ListCacheRoomProvider(creep,curRoom.name,FIND_DROPPED_RESOURCES,30), (resource) =>resource.resourceType == RESOURCE_ENERGY).map(function (item) {
        	                return item.id;
                            });
                    } catch(error)
                    {
                   
                    }
                    if(!!targets)
                    {
                        
               
                    lol = lol.concat(targets)
                   
                    }
                    
                 }
                 
                 containers = Memory.roomStart[creep.memory.baseRoom].containerTypes
                 var targets1 = creep.room.find(FIND_STRUCTURES, {
                   filter: (s) =>{ return(s.structureType == STRUCTURE_CONTAINER)
                                && s.store[RESOURCE_ENERGY] > 0 && s.room.name == creep.room.name}}).map(function (item) {
        	                return item.id;
                            });
                  
                 creep.say("harv")
                 creep.memory.target = lol.concat(targets1).sort((a,  b) => ((Game.getObjectById(b).energy || Game.getObjectById(b).store.energy) - helpers.energyAfterPickeups(b)) - ((Game.getObjectById(a).energy || Game.getObjectById(a).store.energy) - helpers.energyAfterPickeups(a) ))[0];
                creep.memory.moveing = true;
                 Memory.CreepChatter.Pickups[creep.id] =({"target":creep.memory.target,"creepId":creep.id,"Ammount":creep.carryCapacity, "Time":Game.time});
                
            }
            if( creep.carry.energy >0) {
                delete Memory.CreepChatter.Pickups[creep.id]
                var lols = []
                for(var roomNum in Memory.roomStart[creep.memory.baseRoom].allRooms ){
                    
                var curRoom = Game.rooms[Memory.roomStart[creep.memory.baseRoom].allRooms[roomNum].NameOfRoom]
                
                try{ 
                    var targets = helpers.ListCacheRoomProvider(creep,curRoom.name,"EssentialStores",60)
                    
                }
                catch(err){
                    
                }
                creep.say('carrying');
                if(!!targets)
                {
                   
                    lols = lols.concat(targets)
                    
                }
                 
                }
                 //sort((a,  b) => Game.getObjectById(a).energy -Game.getObjectById(b).energy);
                var targets1 =helpers.ListCacheRoomProvider(creep,Game.rooms[creep.memory.baseRoom].name,"EssentialStores",30)
        	                
                
                
                var items = _.filter(lols.concat(targets1), c => Game.getObjectById(c).energy != Game.getObjectById(c).energyCapacity)
                var finalItem = _.sortBy(items, s => creep.pos.getRangeTo(Game.getObjectById(s)))[0]
                if(finalItem  == null || !(!!finalItem) )
                {
                    creep.say("hi")
                    var arr = _.filter( helpers.ListCacheRoomProvider(creep,Game.rooms[creep.memory.baseRoom].name,FIND_STRUCTURES,60), (structure) => structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY]  < structure.storeCapacity)
        	       
        	       if(!!arr && !!arr[0])
        	       {
        	           creep.memory.target = arr[0].id
        	       }
        	       else
        	       {
        	           
        	       }
                }
                else
                {
                   creep.memory.target = finalItem
                }
                var tarr = _.filter( helpers.ListCacheRoomProvider(creep,Game.rooms[creep.memory.baseRoom].name,FIND_STRUCTURES,60), (structure) => structure.structureType == STRUCTURE_TOWER && structure.energy  < 100)
        	    if(tarr.length > 0)
    	        {   creep.say(tarr[0].id)
    	            creep.memory.target = tarr[0].id
    	        }
    	        
        	    creep.say(creep.memory.target)
                creep.memory.moveing = true;
               
            }
        }
        else{
	    if(creep.carry.energy >0) {
	       var target = Game.getObjectById(creep.memory.target)
                
                var tras =creep.transfer(target, RESOURCE_ENERGY)
                if(tras == ERR_NOT_IN_RANGE) {
                
                    creep.moveTo(target);
                }
                if(!(tras == ERR_NOT_IN_RANGE || tras == OK )) 
                {
                    creep.memory.moveing = false;
                }
               if(tras == OK ) { 
                   
                   creep.memory.moveing = false;
               }
               if(!(!!target))
                {
                    
                 creep.memory.moveing = false;
                }
            
	    }
	    else {
	            creep.say("else :" + creep.memory.target)
	            var target = Game.getObjectById(creep.memory.target)
	       
                if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE || creep.pickup(target)  == ERR_NOT_IN_RANGE ) {
                    creep.moveTo(target)
                    } 
                 if(!(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE || creep.pickup(target)  == ERR_NOT_IN_RANGE ||creep.withdraw(target, RESOURCE_ENERGY) == OK || creep.pickup(target)  == OK) ) 
                    {
                        creep.memory.moveing = false;
                    }
                    
               
                if(creep.withdraw(target, RESOURCE_ENERGY) == OK || creep.pickup(target)  == OK)
                {
                    Memory.roomStart[creep.memory.baseRoom].diagnostics.moverPickups.push({"energy":(creep.carry.energyCapacity > (target.energy || target.store.energy)?(target.energy || target.store.energy):creep.carry.energyCapacity), "time":Game.time})
                    creep.memory.moveing = false;
                }
                if(target == null || target == [] || target == undefined || !(!!target))
                {
                    
                 creep.memory.moveing = false;
                }
	    
	        }
        }     
    }

};


module.exports = roleMover;