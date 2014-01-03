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
    function loadAll(userid, callback){
        Thought.find({parents:[], $or:[{public:true},{public:false,'question.author':userid}]},'question id',function(err, thoughts) {
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
    function getThoughtsByTerms(terms, userid, callback){
        var options = {
            project: 'question id'                // do not include the `created` property
          , filter: { $or:[{public: true},{public:false,'question.author':userid}]} // casts queries based on schema
          , limit: 10
          , lean:false
        };
        Thought.textSearch(terms,options, function (err, output) {
            if (err){
                console.log(err); 
            }
            callback(output);
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