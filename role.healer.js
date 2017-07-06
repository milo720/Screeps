
var roleHealer = {
    run: function(creep) {

	   
            target = creep.pos.findClosestByPath(FIND_CREEPS,{
                       filter: (creep) => {creep.hits < creep.hitsMax}})
            
            if(target) {

                result = creep.heal(target)
                if(result == OK){
                    
                }else if(result == ERR_NOT_IN_RANGE){
                    creep.moveTo(target)
                } 
            }
        
	}
};
module.exports = roleHealer;