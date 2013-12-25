require.config({
    baseUrl: 'js',
    shim: {
        'socketio': {
          exports: 'io'
        }
    },
    paths: {
        // the left side is the module ID,
        // the right side is the path to
        // the jQuery file, relative to baseUrl.
        // Also, the path should NOT include
        // the '.js' file extension. This example
        // is using jQuery 1.9.0 located at
        // js/lib/jquery-1.9.0.js, relative to
        // the HTML page.
        jquery: 'lib/jquery/jquery-2.0.3',
        socketio: '/socket.io/socket.io'
    }
});

define(['jquery','serverMessenger', 'displayController'], function($,serverMessenger, dc){
    $(document).ready(function(){
        $( '#think' ).submit(function( event ) {
            event.preventDefault();
        });
        $(document).trigger({
            type:"loadAll"
        });
    });
});
