
var thoughts = require('../app/dao/thoughtDAO')();

module.exports=function(io){
    
  
    io.sockets.on('connection', function (socket) {
      
        socket.on('create', function(data){
            console.log(data); 
        });
        socket.on('getChildren', function(data){
            console.log(data); 
        });
        socket.on('search', function (data) {
            console.log(data);
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
            thoughts.loadAll(function(result){
                socket.emit('thoughts',result);
            });
        })
    });
    
     
    
};