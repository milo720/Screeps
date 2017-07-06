var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	        if(creep.memory.role == "farHarvester" && creep.memory.source ==null && Game.flags[creep.memory.sourceRoom].room)
	            {
	                creep.memory.source =Game.flags[creep.memory.sourceRoom].room.find(FIND_SOURCES)[creep.memory.sourceNum-1].id
	                creep.moveTo(Game.getObjectById(creep.memory.source))
	            }
	        if(Game.time%60==0)
	        {
	            var items = creep.pos.look()
                
                var container = items.filter((item) => item.type == "structure")
                if(container.length > 0 && (container[0].hits/container[0].hitsMax) < 0.6)
                {
                    creep.repair(container[0])
                }
                
	        }
	         creep.say("hi")
            
            if(creep.harvest(Game.getObjectById(creep.memory.source)) != OK  ) {
                var aroom =  creep.room.name
                if(creep.memory.sourceRoom != creep.room.name)
                {
               
                 if(!!Game.flags[creep.memory.sourceRoom])
	            {
	                
	               
	                creep.moveTo(Game.flags[creep.memory.sourceRoom])
	                creep.memory.source = null
	                
	                
	            }
	            else
	            {
	               creep.moveTo(new RoomPosition(1,30,creep.memory.sourceRoom))
	            }
                    
                }else
                {
                    source = Game.getObjectById(creep.memory.source)
                    
                    creep.moveTo(source)
                }
                
            }
            else
            {
                if(Game.time%60 == 0 && creep.pos.look()[0].structureType != STRUCTURE_CONTAINER)
                {
                    creep.room.createConstructionSite(creep.pos,STRUCTURE_CONTAINER)
                }
               
            }
        
        
	}
};

module.exports = roleHarvester;