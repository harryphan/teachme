/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Thought = mongoose.model('Thought')
    ;
    
module.exports=function(){
    function thought(req,res,next,id){
        Thought.load(id, function(err, thought) {
            if (err) return next(err);
            if (!thought) return next(new Error('Failed to load thought ' + id));
            req.thought = thought;
            next();
        });
    }
    function create(req,res){
        var payload = req.body;
        var tmp={
            question:{
                content:payload.content,
                author:'52b8c5e83af4bd0000000001'
            },
            public: payload.public ? true:false
        }
       
        var thought = new Thought(tmp);
        thought.save(function(err) {
            if (err) {
                return res.send('users/signup', {
                    errors: err.errors,
                    article: thought
                });
            } else {
                res.jsonp(thought);
            }
        });    
    }
    function getPublic(req,res){
        Thought.find({},function(err, thoughts) {
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
        res.jsonp(req.thought);
        
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