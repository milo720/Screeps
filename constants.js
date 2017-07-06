/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('constants');
 * mod.thing == 'a thing'; // true
 */
creepStructure = {
    "harvester" : [[MOVE,1],[WORK,6],[CARRY,1],[MOVE,6]],
    "mover":[[MOVE,CARRY,25]],
    "upgrader":[[MOVE,WORK,CARRY,1],[WORK,2],[CARRY,2],[WORK,5]],
    "builder":[[MOVE,MOVE,CARRY,WORK,13]],
    "farHarvester":[[MOVE,1],[WORK,6],[CARRY,1],[MOVE,5]],
    "reserver" :[[MOVE,CLAIM,MOVE,CLAIM,1]],
    "patroller":[[MOVE,MOVE,TOUGH,ATTACK,100]],
     roleCreateFunctions :{"mover" :(myRoom,extenNum) => creepStructure.anyEnergyOfSize(myRoom,1500) ? 7 :1
                        , "harvester":(myRoom,extenNum) => 2
                        , "upgrader" : (myRoom,extenNum) => myRoom.find(FIND_STRUCTURES).some((a) => a.structureType== STRUCTURE_STORAGE && a.store[RESOURCE_ENERGY] > 90000) && myRoom.controller.level != 8 ? 5 :1
                        , "builder" : (myRoom,extenNum) => myRoom.find(FIND_CONSTRUCTION_SITES).length > 0  ? 3 :0
                        , "farHarvester" :(myRoom,extenNum) => Memory.roomStart[myRoom.name].allRooms.map(function(item){ return item.SourceNum || 0; }).reduce(function(a, b){ return a + b; }, 0)
                        , "reserver" :(myRoom,extenNum) => Memory.roomStart[myRoom.name].allRooms.map(function(item){ return 1 }).reduce(function(a, b){ return a + b; }, 0)
                        , "patroller":(myRoom,extenNum) => 1
     },
      anyEnergyOfSize : function(myRoom, threshold){ 
        try{ 
           
           var num = threshold
           var allRooms =Memory.roomStart[myRoom.name].allRooms.map(function(aRoom) {
                return Game.rooms[aRoom.NameOfRoom]
            }).filter(function( element ) {
                    return element !== undefined;
            });
           for(var singleRoom in allRooms)
           {
               var anyFoundInRoom = allRooms[singleRoom].find(FIND_DROPPED_ENERGY).concat(_.filter( allRooms[singleRoom].find(FIND_STRUCTURES),(structure) => (structure.structureType == STRUCTURE_CONTAINER)).map(function (item) {
        	                return item.store;
                            })).some((a) => a.energy > threshold )
                            
                if(anyFoundInRoom) return anyFoundInRoom
                anyFoundInRoom = []
           }
           
           return false
         }
        catch(err)
            {
            console.log("check free energy  : " + err.stack.split("\n"))
         }
        },
        increaseingThreshold : function(myRoom, threshold, baseIncriment , name){ 
        try{ 
           basemem = Memory.roomStart[myRoom.name]
        
            
             if(!(!!Memory.learningConstants))
            {
               Memory.learningConstants = {};
            }
             if(!(!!Memory.learningConstants[name]))
            {
               Memory.learningConstants[name] = {"currentThreshold":threshold, "incriment":baseIncriment};
            }
           }
        catch(err)
            {
            console.log("check free energy  : " + err.stack.split("\n"))
         }
        }

};
module.exports = creepStructure;