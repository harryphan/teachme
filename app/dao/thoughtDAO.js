var mongoose = require('mongoose'),
    Thought = mongoose.model('Thought')
    ;
    
module.exports=function(){
    
    
    function loadAll(callback){
        Thought.find({parents:[]},'question id',function(err, thoughts) {
            if (err) {
                callback(err);
            } else {
                callback(thoughts);
            }
        });
    }
    
    function getThoughtById(id, callback){
        Thought.findOne({_id:id},function(err, thought) {
            if (err) {
                callback(err);
            } else {
                callback(thought);
            }
        });    
    }
    function getThoughtsByIds(ids, callback){
        Thought.find({_id:{$in:ids}},'question id',function(err, thoughts) {
            if (err) {
                callback(err);
            } else {
                callback(thoughts);
            }
        });
    }
    
    return{
        loadAll:loadAll,
        getThoughtById:getThoughtById,
        getThoughtsByIds:getThoughtsByIds
    }
}