require.config({
    baseUrl: 'js',
    shim: {
        'socketio': {
          exports: 'io'
        },
        'jqueryui': {
            exports: '$',
            deps: ['jquery']
        }
    },
    paths: {
        jquery: 'lib/jquery/jquery-2.0.3',
        jqueryui: 'lib/jquery/jquery-ui',
        socketio: '/socket.io/socket.io'
    }
});

define(['jqueryui','serverMessenger', 'displayController','menuController'], function($){
    $(document).ready(function(){
        
        $('#think').submit(function( event ) {
            event.preventDefault();
        });
        
        $(document).trigger({
            type:"loadAll"
        });
    });
});
