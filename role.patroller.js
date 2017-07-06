
var rolePatroller = {
   

    /** @param {Creep} creep **/
    run: function(creep) {
	    var lol = []
	    var harvRooms = _.filter(Memory.roomStart[creep.memory.baseRoom].allRooms,(myRoom) => (Game.rooms[myRoom.NameOfRoom] != undefined));
	    for(var harvRoom in harvRooms){
                    
                    try{
                        var curRoom = Game.rooms[harvRooms[harvRoom].NameOfRoom]
                        var targets = curRoom.find(FIND_CREEPS ,{filter: (creep) => (creep.owner.username != 'slowmotionghost' &&creep.owner.username != "milo720")})
                    } catch(err)
                    {
                        console.log(err.stack.split("\n"))
                    }
                    if(!!targets)
                    {
                        
               
                    lol = lol.concat(targets)
                   
                    }
                    
                 }
            if(lol.length == 0 ) {
                try{
                
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES,{filter: (structure) => (structure.owner.username != 'slowmotionghost' &&structure.owner.username != "milo720" && structure.structureType != STRUCTURE_CONTROLLER)
                    })
                }catch(err)
                {
                   target = [] 
                }
                
                if(!target || target.length == 0 ) {
                    
                    
                    
                    }
                else{
                    result = creep.attack(target)
                        if(result == OK){
                            
                        }else if(result == ERR_NOT_IN_RANGE){
                            creep.moveTo(target)
                        } 

                }
            }
            else
            {
                console.log(lol[0])
                result = creep.attack(lol[0])
                if(result == OK){
                    
                }else if(result == ERR_NOT_IN_RANGE){
                    creep.moveTo(lol[0])
                }  
            }
            
	}
};
module.exports = rolePatroller;