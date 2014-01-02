require.config({
    baseUrl: 'js',
    shim: {
        'socketio': {
          exports: 'io'
        },
        'jqueryui': {
            exports: '$',
            deps: ['jquery']
        },
        arbor:{
            exports:'arbor',
            deps:['jquery']
        }
    },
    paths: {
        jquery: 'lib/jquery/jquery-2.0.3',
        jqueryui: 'lib/jquery/jquery-ui',
        socketio: '/socket.io/socket.io',
        arbor: 'lib/arbor/arbor'
    }
});

require(['jqueryui','serverMessenger', 'displayController','menuController'], function($){
    $(document).ready(function(){
        // var sys = arbor.ParticleSystem(0, 0, 1) // create the system with sensible repulsion/stiffness/friction
        // sys.parameters({gravity:false}) // use center-gravity to make the graph settle nicely (ymmv)
        // sys.renderer = renderer // our newly created renderer will have its .init() method called shortly by sys...
    
        // // add some nodes to the graph and watch it go...
        // sys.addEdge('a','b')
        // sys.addEdge('a','c')
        // sys.addEdge('a','d')
        // sys.addEdge('a','e')
        // sys.addNode('f', {alone:true, mass:.25})
        $('#think').submit(function( event ) {
            event.preventDefault();
            $(document).trigger('search',[$('#query').val()]);
        });
        
        $(document).trigger({
            type:"loadAll"
        });
    });
});
