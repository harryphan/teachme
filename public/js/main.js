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
        jqueryui: 'lib/jquery/jquery-ui',
        socketio: '/socket.io/socket.io'
    }
});

define(['jquery','serverMessenger', 'displayController','jqueryui','menuController'], function($,serverMessenger, dc){
    $(document).ready(function(){
        $('#faq').dialog({
            modal:true,
            autoOpen: false
        });
        $( '#think' ).submit(function( event ) {
            event.preventDefault();
        });
        
        $(document).trigger({
            type:"loadAll"
        });
    });
});
