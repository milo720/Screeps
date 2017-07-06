var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleSoldier = require('role.soldier');
var roleMover = require('role.mover');
var roleRangedSoldier = require('role.rangedsoldier');
var roleHealer = require('role.healer');
var roletowerDrain = require('role.towerDrain');
var roleHarvesterbasic = require('role.harvesterbasic');
var roleWallBuilder = require('role.wallBuilder');
var roleClaimer = require('role.claimer');
var roleReserver = require('role.reserver');
var rolePatroller = require('role.patroller')
var creeps = {

    /** @param {Creep} creep **/
   run : function(creep){
       if(creep.fatigue !=0)
       {
           return 0
       }
       
          if(creep.memory.role == 'patroller') {
            rolePatroller.run(creep);
        }
       
          if(creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
         if(creep.memory.role == 'reserver') {
            roleReserver.run(creep);
        }
           if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
           if(creep.memory.role == 'farHarvester') {
            roleHarvester.run(creep);
        }
       
        else if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        } 
        else if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        else if(creep.memory.role == 'wallBuilder') {
            roleWallBuilder.run(creep);
        } 
        
        else if(creep.memory.role == 'mover') {
            roleMover.run(creep);
        }
        else if(creep.memory.role == 'soldier') {
            roleSoldier.run(creep);
        } 
        else if(creep.memory.role == 'rangedSoldier') {
            roleRangedSoldier.run(creep);
        } 
        else if(creep.memory.role == 'towerDrain') {
            roletowerDrain.run(creep);
        }
        else if(creep.memory.role == 'healer') {
            roleHealer.run(creep);
        }
	},
	make : function(makes,myRoom){
        for( var i =0; i< makes.length; i++)
        {
        
        
    	var screeps = _.filter(Object.keys(Game.creeps).map(function (key) { return Game.creeps[key]; }).concat(Memory.roomStart[myRoom.name].spanwQueue.map(function(queuedCreep) {
                                                        return {"memory" :queuedCreep.startingMemory} ;
                                                                })), (creep) => (creep.memory.role ==makes[i][0] && creep.memory.baseRoom == myRoom.name));
        
        console.log("Chekcing make" + makes[i][0]+"  screepnum: "  + screeps.length + "  numWanted:" + makes[i][1]);
    
         if(screeps.length < makes[i][1] ||  makes[i][1] == -1) {
             var roommem =Memory.roomStart[myRoom.name].sourceToCreeps
        var creepSource = ""
        var list = []
        var lenprev = 1000
        var sourceNum = 0
        for(var source in roommem)
        {
           console.log("befor")
            var len = roommem[source].harvestingCreeps.length
            len =  _.filter(screeps, (creep) => (creep.memory.source == roommem[source].source)).length;
            
            if(len <= lenprev)
            {
                lenprev = len
                creepSource = roommem[source].source
                var list = roommem[source].harvestingCreeps
                var sourceroom = roommem[source].sourceRoom
                 
            }
        }
        
             if( makes[i][0] == "farHarvester")
            {
            creepSource == null
            creepNum = 0
            
            var allRooms =Memory.roomStart[myRoom.name].allRooms
            var extrasources = []
            for(var aroom in allRooms)
            {
                console.log("hgsodgfkjhdfiodh"+myRoom.name)
                if(Memory.roomStart[myRoom.name].allRooms[aroom].NameOfRoom != myRoom.name)
                {
                    console.log("Num="+Memory.roomStart[myRoom.name].allRooms[aroom].SourceNum + "   CreepNum:"+creepNum )
                    creepNum += Memory.roomStart[myRoom.name].allRooms[aroom].SourceNum
                    var roomCreeps = _.filter(screeps, (creep) => (creep.memory.sourceRoom ==Memory.roomStart[myRoom.name].allRooms[aroom].NameOfRoom));
                    if(_.filter(roomCreeps, (creep) => (creep.memory.sourceRoom ==Memory.roomStart[myRoom.name].allRooms[aroom].NameOfRoom && (creep.memory.sourceNum == 1))).length == 0)
                    {
                        sourceroom = Memory.roomStart[myRoom.name].allRooms[aroom].NameOfRoom
                        sourceNum = 1
                    }
                    if(_.filter(roomCreeps, (creep) => (creep.memory.sourceRoom ==Memory.roomStart[myRoom.name].allRooms[aroom].NameOfRoom && creep.memory.sourceNum == 2  )).length == 0 && Memory.roomStart[myRoom.name].allRooms[aroom].SourceNum == 2 )
                    {
                        sourceroom = Memory.roomStart[myRoom.name].allRooms[aroom].NameOfRoom
                        sourceNum = 2
                    }
                    
                    
                    
                    
                }
            }
            }
            var reserveRoom = undefined
            if(makes[i][0] == "reserver")
            {
                var allRooms =Memory.roomStart[myRoom.name].allRooms
                var extrasources = []
                for(var aroom in allRooms)
                {
                    var roomCreeps = _.filter(screeps, (creep) => (creep.memory.reserveRoom ==Memory.roomStart[myRoom.name].allRooms[aroom].NameOfRoom));
                    if(_.filter(roomCreeps, (creep) => (creep.memory.reserveRoom ==Memory.roomStart[myRoom.name].allRooms[aroom].NameOfRoom )).length == 0)
                    {
                        reserveRoom = Memory.roomStart[myRoom.name].allRooms[aroom].NameOfRoom

                    }
                }
            }
            console.log("Atempting creep to queue wit role " + makes[i][0] + " and with source : " + creepSource);
            num = 0;
           
            var baseName =myRoom.name
            var creepToAddTpQueue = {"body":makes[i][2],"name": undefined,"startingMemory" : {'role': makes[i][0], 'sourceNum':sourceNum, 'baseRoom':baseName, 'source' : creepSource, 'sourceRoom': sourceroom, 'target' : 'W11S53', "reserveRoom": reserveRoom}};
            Memory.roomStart[myRoom.name].spanwQueue.unshift(creepToAddTpQueue);
            
            
        }
    }
	},
    pullCreepFromRoomQueue: function (myRoom, spawn)
    {
        if( Memory.roomStart[myRoom.name].spanwQueue.length > 0)
        {
            var queuedCreep = Memory.roomStart[myRoom.name].spanwQueue.pop()
            var newName = spawn.createCreep(queuedCreep.body,queuedCreep.name,queuedCreep.startingMemory)
              if(!(newName<0) )
            {
                var list = roommem[source].harvestingCreeps
                console.log('Spawning new ' + makes[i][0] + ' : ' + newName+ "  : to list -" + list);
                list.push(newName)
                
            }
            else
            {
            Memory.roomStart[myRoom.name].spanwQueue.push(queuedCreep)
            console.log('Error in Spawning new with code  :' + newName);
            }
        }
    }
    

};

module.exports = creeps;