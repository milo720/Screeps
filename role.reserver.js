var roleReserver = {

    /** @param {Creep} creep **/
    run: function(creep) {
	      
            if(Game.rooms[creep.memory.reserveRoom] != undefined && creep.reserveController(Game.rooms[creep.memory.reserveRoom].controller) != OK  ) {
                var aroom =  creep.room.name
                if(creep.memory.reserveRoom != creep.room.name)
                {
               
                 if(!!Game.flags[creep.memory.reserveRoom])
	            {
	                
	               
	                creep.moveTo(Game.flags[creep.memory.reserveRoom])
	                creep.memory.source = null
	                
	                
	            }
	            else
	            {
	               creep.moveTo(new RoomPosition(1,30,creep.memory.reserveRoom))
	            }
                    
                }else
                {
                    source = Game.rooms[creep.memory.reserveRoom].controller
                    
                    creep.moveTo(source)
                }
                
            }
            else
            {
                
            }
        
        
	}
};

module.exports = roleReserver;