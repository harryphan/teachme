define('displayController',['jquery'],function($){
    $(document).bind('appendThought',function(event){
        var val = event.detail
        var thought= $('<div/>',{
            class:'thought',
            text:val.question.content,
            id:val._id
        });
        $('#thoughts').append(thought);
    });
    
    $(document).bind('loadThoughts',function(event){
        $('#thoughts').empty();
        $.each(event.detail,function(key, val){
            $(document).trigger({type:'appendThought', detail:val});
        });
    });
    
    $(document).bind('showFAQ',function(event){
        $('#thoughts').empty();
        $.each(event.detail,function(key, val){
            $(document).trigger({type:'appendThought', detail:val});
        });
    });
    
    $(document).bind('hideFAQ',function(event){
        $('#thoughts').empty();
        $.each(event.detail,function(key, val){
            $(document).trigger({type:'appendThought', detail:val});
        });
    });
})