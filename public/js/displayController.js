define('displayController',['jquery'],function($){
    $(document).bind('appendThought',function(event){
        var val = event.detail
        $('#thoughts').append('<div class="thought">'+JSON.stringify(val.question.content)+'</div>');
    });
    $(document).bind('loadThoughts',function(event){
        $('#thoughts').empty();
        $.each(event.detail,function(key, val){
            $(document).trigger({type:'appendThought', detail:val});
        });
    });    
    
})