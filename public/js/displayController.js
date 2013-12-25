define('displayController',['jquery'],function($){
    $(document).bind('loadThoughts',function(event){
        $('#thoughts').empty();
        $('#thoughts').append('<span>'+JSON.stringify(event.detail)+'</span>');
    });    
    
})