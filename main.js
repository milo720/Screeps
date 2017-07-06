
var Creeps = require('creeps');
var makeBuildings = require('makeBuildings');
var helpers = require('Helpers');
module.exports.loop = function () {
    var spawnRooms = _.filter(Game.rooms,(myRoom) => (myRoom.controller != undefined && myRoom.controller.level > 0));
    for(var aRoom in spawnRooms){
        var myRoom = spawnRooms[aRoom]
        var farHarv = 0
        ps = new RoomPosition(23,41, myRoom.name)
        basemem = Memory.roomStart[myRoom.name]
        
        try{
            
             if(!(!!Memory.CreepChatter))
            {
               Memory.CreepChatter = {"Pickups":{}};
            }
             if(!(!!Memory.roomStart[myRoom.name]))
            {
                Memory.roomStart[myRoom.name] = []
            }
            if(!(!!Memory.roomStart[myRoom.name].sourceToCreeps))
            {
                var sources = myRoom.find(FIND_SOURCES)
                 
                Memory.roomStart[myRoom.name].sourceToCreeps = {'source1':{'sourceRoom' : myRoom.name, 'source' : sources[0].id, 'havesterSources' : [],'harvestingCreeps' : []}, 'source2':{'sourceRoom' : myRoom.name, 'source' : sources[1].id, 'havesterSources' : [],'harvestingCreeps' : []}}
            }
            if(!(!!Memory.roomStart[myRoom.name].spanwQueue))
            {
               Memory.roomStart[myRoom.name].spanwQueue = [];
            }
            if(!(!!Memory.roomStart[myRoom.name].containerTypes))
            {
                var sources = myRoom.find(FIND_SOURCES)
                 
                Memory.roomStart[myRoom.name].containerTypes = {'mine':[], 'deposit':[]}
            }
            if(!(!!Memory.roomStart[myRoom.name].diagnostics))
            {
                
                 
                Memory.roomStart[myRoom.name].diagnostics = {"moverPickups":[]}
            }
            if(!(!!Memory.roomStart[myRoom.name].allRooms))
            {
                Memory.roomStart[myRoom.name].allRooms = [{'NameOfRoom':myRoom.name}]
            }
             if(!(!!Memory.roomStart[myRoom.name].storageTypes))
            {
                Memory.roomStart[myRoom.name].storageTypes = []
            }

        }
        catch(err)
        {

         console.log(err.stack.split("\n") )   
        }
    
        //var wallpath =  ps.findPathTo(26,41,{ignoreCreeps:true,ignoreRoads:true,ignoreDestructibleStructures:true})
         //  for(var i = 0;i < wallpath.length;i++)
           //{ 
            //    
             // if(i > (wallpath.length/2) -1 && i < (wallpath.length/2) + 1)
               // {
               // put =  myRoom.createConstructionSite(wallpath[i].x,wallpath[i].y,STRUCTURE_WALL)
            //    put = myRoom.createConstructionSite(wallpath[i].x,wallpath[i].y-1,STRUCTURE_WALL)
              // }else
            //    {
             //   put = myRoom.createConstructionSite(wallpath[i].x,wallpath[i].y,STRUCTURE_WALL)
              //  put = myRoom.createConstructionSite(wallpath[i].x,wallpath[i].y-1,STRUCTURE_WALL)
    
            //}
           //}
         
                
                 
       
       
        if(Game.time%500 == 0)
        {
             try{
            makeBuildings.run(myRoom)
            }catch(err)
            {
                console.log("room make error :" + err)
            }
        }
        if(Game.time%20 == 0)
        {
             Memory.roomStart[myRoom.name].spanwQueue = [];
             var extentions = myRoom.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION ) 
                        }});
             var mySpawns = myRoom.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_SPAWN ) 
                        }});
            
            try{
        console.log("ougougyo" + myRoom)
            Creeps.make(helpers.createSpawnList(["harvester","mover","upgrader","builder",,"patroller","farHarvester","reserver"],extentions.length,myRoom),myRoom)
            for(mySpwan in mySpawns)
            {
                Creeps.pullCreepFromRoomQueue(myRoom,mySpawns[mySpwan])
            }
            }
            catch(err)
            {
                console.log("Make errror :" + err)
            }
        } 
        try{
       if(Game.time%20 == 0)
    {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                var roommem =Memory.roomStart[myRoom.name].sourceToCreeps
          
                for(var source in roommem)
                {
                    for(var creepName in roommem[source].harvestingCreeps)
                    {
                        if (roommem[source].harvestingCreeps[creepName] == name)
                        {
                                roommem[source]["harvestingCreeps"].splice(creepName, 1);
                            
                        }
                         if (roommem[source].havesterSources[creepName] == name)
                        {
                                roommem[source]["havesterSources"].splice(creepName, 1);
                            
                        }
                    }
                    
                   
                }
                 var roommem =Memory.roomStart[myRoom.name]
                
                console.log('Clearing non-existing creep memory:', name);
                
                
            
            }
        
        } 
        for(var cat in Memory.roomStart[myRoom.name].diagnostics)
        {
            for(var dataPoint in Memory.roomStart[myRoom.name].diagnostics[cat])
            {
                if( Memory.roomStart[myRoom.name].diagnostics[cat][dataPoint].time < Game.time - 1000)
                {
                    Memory.roomStart[myRoom.name].diagnostics[cat].splice(dataPoint,1);
                }
            }
        }
        for(chatCat in Memory.CreepChatter)
        {
            for(message in Memory.CreepChatter[chatCat])
            {
                if(Memory.CreepChatter[chatCat][message].Time < Game.time -300)
                {
                    delete Memory.CreepChatter[chatCat][message]
                }
            }
        }
    }
    }
    catch(err)
    {
        console.log("memory wipe error: " +err.stack.split("\n"))
    }
    
    towers = myRoom.find(FIND_STRUCTURES, {
                        filter: (structure) => structure.structureType == STRUCTURE_TOWER
                    })
    for(var tower in towers)
    {
        var tower = towers[tower]
           try{
            if(tower != undefined) {
                 if(Game.time%16 < 4)
                {
                   
                        var closestDamagedStructure = tower.room.find(FIND_STRUCTURES, {
                            filter: (structure) => structure.hits < structure.hitsMax && structure.hits < 200000 && (structure.structureType != STRUCTURE_ROAD || structure.pos.look()[0].type == "creep")
                        }).sort(function(a, b) {
                                      return a.hits - b.hits
                                    })[0];
                        if(closestDamagedStructure && tower.energy > tower.energyCapacity*0.75) {
                            tower.repair(closestDamagedStructure);
                       }
                }       
                 var closestHostile = tower.room.find(FIND_CREEPS,{filter: (creep) => creep.owner.username != "milo720"  }).sort(function(a, b) {
                                      if(a.body.some(c => c.type =="heal"))
                                      {return -1}
                                      if(b.body.some(c => c.type== "heal"))
                                      {return 1}
                                      return -1
                                    })[0]
                if(closestHostile) {
                    tower.attack(closestHostile)
                }
            }
                 
            }catch(err)
            {
                console.log(err.stack.split("\n") ) 
            } 
        }
    }
    

    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        try{    
            Creeps.run(creep)
        }catch(err)
        {
            console.log("run error :" + err.stack.split("\n") + "   in role:" + creep.memory.role)
        }

    }

    
    


}