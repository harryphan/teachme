define('serverMessenger',['socketio'],function(io){
    var socket = io.connect();
    socket.on('connect', function(){
        socket.on('thoughts', function (data) {
          $(document).trigger({type:'loadThoughts', detail:data});
         
        });
    });
    $(document).bind('loadAll', function(event){
        socket.emit('loadAll');
    });
});