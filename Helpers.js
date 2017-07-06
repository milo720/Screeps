var constants = require('constants');
var helpers =
 {
     funcDirect : function(func, curRoom){ 
        try{ 
           
            var tars = curRoom.find(func)
            return tars
         }
        catch(err)
            {
            console.log("funct store failed withe error  : " + err + " on funct" + func)
         }
        },
      EssentialStores : function(curRoom){ try{ 
      var tars = curRoom.find(FIND_STRUCTURES, {
                           filter: (structure) => {
                                return ((structure.structureType == STRUCTURE_EXTENSION ||
                                        structure.structureType == STRUCTURE_SPAWN ||
                                        structure.structureType == STRUCTURE_TOWER) &&
                                        structure.energy != structure.energyCapacity
                                        )  && structure.my
                            }
                    }).map(function (item) {
        	                return item.id;})
        	                return tars
        }
        catch(err)
        {
            console.log("EssentialStores failed withe error  : " + err)
        }
    },
     DroppedEnergy : function(curRoom){ try{ 
      var tars = curRoom.find(FIND_DROPPED_ENERGY)
        }
        catch(err)
        {
            console.log("EssentialStores failed withe error  : " + err)
        }
    },
    
        ListCacheRoomProvider : function(creep,myRoomName, itemWanted, timeWindow){
            
            try{
                myroom = Game.rooms[myRoomName]
                
                if(!!myroom.memory[itemWanted] && !!myroom.memory[itemWanted].myItems)
                {
                    
                    var itemsObj =   myroom.memory[itemWanted]
                    if(Game.getObjectById(itemsObj.myItems[0]) && itemsObj.timeStamp > (Game.time - timeWindow) )
                    {
                       return itemsObj.myItems
                    }
                    else
                    {
                        if(itemWanted == "EssentialStores"  )
                        {
                            targets = helpers.EssentialStores(myroom)
                        }
                       else
                       {
                           
                           targets = helpers.funcDirect(itemWanted, myroom)
                           
                       }
                    
                        itemsObj.timeStamp = Game.time
                        itemsObj.myItems = targets
                        return targets
                    }
                }
                else
                {
                     if(itemWanted == "EssentialStores"  )
                        {
                            var targets = helpers.EssentialStores(myroom)
                        }
                       else
                       {
                           
                           var targets = helpers.funcDirect(itemWanted, myroom)
                           
                       }
                    

                    myroom.memory[itemWanted] = {'myItems':targets, "timeStamp":Game.time}

                }
                
            }catch(err){ 
                console.log("cache failed with inputs  : " + creep+" : " +myRoomName+" : " +itemWanted+" : " +timeWindow+ "  And error  " + err)
                return []
                
            }
        },
        createSpawnList : function(roleList, extenNum, myRoom){ 
        try{ 
           
           
           var creepNum = Object.keys(Game.creeps).filter(c => Game.creeps[c].memory.baseRoom == myRoom.name).length 
           var spawnList = []
           if(creepNum < 3)
           {
               return [["harvester",1,[MOVE,CARRY,WORK]], ["upgrader",1,[MOVE,CARRY,WORK,WORK]],["mover",1,[MOVE,MOVE,MOVE,CARRY,CARRY,CARRY]]]
           }
           capacity = myRoom.energyCapacityAvailable
           for(role in roleList)
           {
              spawnList.push( [roleList[role],constants.roleCreateFunctions[roleList[role]](myRoom,extenNum),helpers.makeCreepSpawnValues(capacity,roleList[role])])
           }
           return(spawnList)
         }
        catch(err)
            {
            console.log("funct store failed withe error  : " + err.stack.split("\n") )
         }
        }
       ,
        makeCreepSpawnValues : function(capacity,role){ 
        try{ 
           var roleList = constants[role]
           var curCapacity = capacity
           var partList = []
           
           for( block in roleList)
           {
               var partBlock = roleList[block]
               for(var v =0;v < partBlock[partBlock.length -1]; v++)
               {
                   for(var i = 0; i < partBlock.length -1; i++)
                   {
                       if( (curCapacity - BODYPART_COST[partBlock[i]] < 0)  )
                       {
                           return partList
                       }
                       partList.push(partBlock[i])
                       if(partList.length == 50)
                       {
                           return partList
                       }
                       curCapacity = curCapacity - BODYPART_COST[partBlock[i]]
                   }
               }
           }
           return partList
         }
        catch(err)
            {
            console.log("make creepParts Failed with  : " + err.stack.split("\n"))
         }
        },
        energyAfterPickeups : function(id)
        {
            try{
                   var total = 0
            for(message in Memory.CreepChatter.Pickups)
            {
                if(Memory.CreepChatter.Pickups[message].Time > (Game.time -300) && Memory.CreepChatter.Pickups[message].target == id)
                {
                       
                    total += Memory.CreepChatter.Pickups[message].Ammount
                }
            }
            return total; 
            }
            catch(err)
            {
            console.log("calc energy after all pickups failed : " + err.stack.split("\n"))
            }
        
        
        }
        
       
      
    
};
module.exports = helpers;