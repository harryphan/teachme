/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Thought = mongoose.model('Thought')
    ;
    
module.exports=function(){
    function thought(req,res,next,id){
        console.log("I've made id !!!!!");
        next();
    }
    function create(req,res){
        
    }
    function getPublic(req,res){
        Thought.find().sort('-created').exec(function(err, thoughts) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.jsonp(thoughts);
            }
        });
    }
    
    function show(req, res){
        var id=req.params.thoughtId;
        Thought.findById(id,function(err, thoughts){
            if (err) 
                console.log(err);
            if (!thoughts) 
                console.log(new Error('Failed to load article ' + id));
            res.jsonp(thoughts);
        });
    }
    function remove(req,res){
        
    }
    function update(req,res){
        
    }
    function findByWord(req,res){
        
    }
    function findByAuthor(req, res){
        
    }
    return{
        thought:thought,
        create:create,
        remove:remove,
        update:update,
        show:show,
        getPublic:getPublic,
        findByWord:findByWord,
        findByAuthor:findByAuthor
    }
}();