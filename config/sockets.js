
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
        
        socket.on('loadAll', function(data){
            thoughts.loadAll(function(result){
                socket.emit('thoughts',result);
            });
        })
    });
    
     
    
};