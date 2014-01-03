var mongoose = require('mongoose'),
    Thought = mongoose.model('Thought')
    ;
    
module.exports=function(){
    function createThought(thought, callback){
        thought.save(function(err) { 
            if (err) {
                callback(err);
            } else {
                callback(true);
            }
        });
    }
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
    function getThoughtsByKeywords(terms, callback){
        Thought.find({'question.tags':{$in:terms}},'question id',function(err, thoughts) {
            if (err) {
                callback(err);
            } else {
                console.log(thoughts);
                callback(thoughts);
            }
        });
    }
    function getThoughtsByTerms(terms, callback){
        Thought.textSearch('moon', function (err, output) {
            if (err){
                console.log(err); 
            }
            console.log(output);
        });
    }
    return{
        loadAll:loadAll,
        createThought:createThought,
        getThoughtById:getThoughtById,
        getThoughtsByIds:getThoughtsByIds,
        getThoughtsByTerms:getThoughtsByTerms,
        getThoughtsByKeywords:getThoughtsByKeywords
    }
}