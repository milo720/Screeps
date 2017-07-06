var makeBuildings=
 {

    /** @param {Creep} creep **/
    run: function(room) {
    var mySpawn = room.find(FIND_STRUCTURES,  {
                   filter: (s) =>{ return(s.structureType == STRUCTURE_SPAWN)}}).find();
    targets1 = Memory.roomStart[room.name].sourceToCreeps
    var screeps = _.filter(Game.creeps, (creep) => creep.memory.role == "harvester" ||creep.memory.role == "mover" || creep.memory.role == "upgrader");
    
   // for(var creep in screeps)
    //{
        
      //  creepObj = screeps[creep]
        
    //    room.createConstructionSite(creepObj.pos.x,creepObj.pos.y,STRUCTURE_ROAD)
    //}
   
    
            if (false)
             {
                 return 0;
             }
           var sources = room.find(FIND_SOURCES);
           var extentions = room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ) 
                    }});
             var structures =  room.find(FIND_STRUCTURES, {
             filter: (structure) => {
                 return (structure.structureType == STRUCTURE_CONTAINER ) 
             }
             });
             console.log('Len struct ' +  structures.length + extentions.length)
             
             var spawns =  room.find(FIND_STRUCTURES, {
             filter: (structure) => {
                 return (structure.structureType == STRUCTURE_SPAWN ) 
             }});
            var array = []
            array = array.concat(sources,[room.controller],spawns,spawns)
            console.log('array of buildings to make' + array)
            var spawn = spawns[0];
            if (room.controller.level >= 1) 
            {
               
                for (var v = 0; v < 0; v++)
                {
                    
                    var place = array[v%array.length];
                    var xs = place.pos.x
                    var ys = place.pos.y// Start coordinates
                    var put = -1
                    

                    for (var d = 1; d<15; d++)
                    {
                        for (var i = 0; i < d + 1; i++)
                        {
                             if(put ==0)
                            {
                                break;
                            }
                            var x1 = xs - d + i;
                            var y1 = ys - i;

                            put = room.createConstructionSite(x1, y1,STRUCTURE_CONTAINER)
                             if(put ==0)
                                {
                                    break;
                                }
                            var x2 = xs + d - i;
                            var y2 = ys + i;

                            put = room.createConstructionSite(x2, y2,STRUCTURE_CONTAINER)
                            if(put ==0)
                                {
                                    break;
                                }
                        }   

                        
                        
                        for (var i = 1; i < d; i++)
                        {
                             if(put ==0)
                            {
                                break;
                            }
                            var x1 = xs - i;
                            var y1 = ys + d - i;

                            put = room.createConstructionSite(x1, y1,STRUCTURE_CONTAINER)
                             if(put ==0)
                            {
                                break;
                            }
                            var x2 = xs + d - i;
                            var y2 = ys - i;

                            put = room.createConstructionSite(x2, y2,STRUCTURE_CONTAINER)
                            if(put ==0)
                                {
                                    break;
                                }
                        }
                    }
                }
            }
                        
                 if (room.controller.level >= 2) 
             {
                    var extensionCount;
                    switch (room.controller.level) {
                        case 2:
                          extensionCount = 5;
                          break;
                        case 3:
                          extensionCount = 10;
                          break;
                        default:
                          extensionCount = (room.controller.level - 2) * 10;
                          break;
                        }
                     var put = -1
                     var xs = mySpawn.pos.x
                     var ys = mySpawn.pos.y// Start coordinates
                            for (var d = 1; d < 15 && extentions.length < extensionCount ; d++) {
                                for (var i = 0; i < d + 1; i++) {
                                    var x1 = xs - d + i*2;
                                    var y1 = ys - d;

                                    put = room.createConstructionSite(x1, y1, STRUCTURE_EXTENSION)

                                    var x2 = xs - d + i*2;
                                    var y2 = ys + d;

                                    put = room.createConstructionSite(x2, y2, STRUCTURE_EXTENSION)
                                }


                                for (var i = 1; i < d; i++) {
                                    var x1 = xs - d;
                                    var y1 = ys - d + i*2;

                                    put = room.createConstructionSite(x1, y1, STRUCTURE_EXTENSION)

                                    var x2 = xs  + d;
                                    var y2 = ys - d + i*2;

                                    put = room.createConstructionSite(x2, y2, STRUCTURE_EXTENSION)
                                }
                            }
                        
                     
                 }
             }
             

};

module.exports = makeBuildings;