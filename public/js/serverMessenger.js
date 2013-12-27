define('serverMessenger',['socketio'],function(io){
    var socket = io.connect();
    socket.on('connect', function(){
        socket.on('thoughts', function (data) {
            $(document).trigger({type:'loadThoughts', detail:data});
        });
        socket.on('thought', function (data) {
            $(document).trigger({type:'loadThought', detail:data});
        });
        socket.on('children', function (data) {
            $(document).trigger({type:'loadChildren', detail:data});
        });
        socket.on('parents', function (data) {
            $(document).trigger({type:'loadParents', detail:data});
        });
    });
    $(document).bind('loadAll', function(event){
        socket.emit('loadAll');
    });
    $(document).bind('getThought', function(event){
        socket.emit('getThought',{id:event.detail});
    });
});