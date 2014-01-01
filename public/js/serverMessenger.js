define('serverMessenger',['socketio'],function(io){
    var socket = io.connect();
    socket.on('connect', function(){
        socket.on('thoughts', function (data) {
            $(document).trigger('loadThoughts',[data]);
        });
        socket.on('thought', function (data) {
            $(document).trigger('loadThought',[data]);
        });
        socket.on('children', function (data) {
            $(document).trigger('loadChildren',[data]);
        });
        socket.on('parents', function (data) {
            $(document).trigger('loadParents',[data]);
        });
    });
    $(document).bind('loadAll', function(event){
        socket.emit('loadAll');
    });
    $(document).bind('getThought', function(event, id){
        socket.emit('getThought',{id:id});
    });
    
    $(document).bind('facebook-login', function(event){
        socket.emit('facebook-login');
    });
});