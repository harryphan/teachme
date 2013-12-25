var mongoose = require('mongoose'),
    Thought = mongoose.model('Thought')
    ;
    
module.exports=function(){
    
    
    function loadAll(callback){
        Thought.find({},function(err, thoughts) {
            if (err) {
                callback(err);
            } else {
                callback(thoughts);
            }
        });    
    }
    
    return{
        loadAll:loadAll
    }
}