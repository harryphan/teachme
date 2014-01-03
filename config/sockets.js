
var thoughts = require('../app/dao/thoughtDAO')()
    ,natural = require('natural')
    ,tokenizer = new natural.WordTokenizer()
    ,mongoose = require('mongoose')
    ,Thought = mongoose.model('Thought')
    ;

module.exports=function(io){
    
  
    io.sockets.on('connection', function (socket) {
        
        socket.on('create', function(data){
            var thought = new Thought(data);
            thoughts.createThought(thought,function(res){
                console.log(res);
            });
        });
        socket.on('getChildren', function(data){
            console.log(data); 
        });
        socket.on('search', function (data) {
            thoughts.getThoughtsByTerms(data.query,data.userid,function(res){
                var stuff = res.results.map(function(item){
                    return item.obj;
                });
                socket.emit('thoughts',stuff);
            });
        });
        socket.on('getThought', function(data){
            var id = data.id;
            thoughts.getThoughtById(id,function(result){
                socket.emit('thought', result);
                if(result.children && result.children.length > 0){
                    thoughts.getThoughtsByIds(result.children, function(myres){
                        socket.emit('children', myres);
                    });
                }
                if (result.parents && result.parents.length > 0){
                    thoughts.getThoughtsByIds(result.parents, function(myres){
                        socket.emit('parents', myres);
                    });
                }
            })
        });
        socket.on('loadAll', function(data){
            
            thoughts.loadAll(data ? data.userid:null,function(result){
                socket.emit('thoughts',result);
            });
        })
    });
    
     
    
};