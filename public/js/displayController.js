define('displayController',['jqueryui'],function($){
    $(document).bind('appendThought',function(event){
        var val = event.detail;
        var thought= $('<div/>',{
            class:'thought',
            text:val.question.content,
            id:val._id
        });
        thought.bind('click',function(event){
            var maskHeight = window.innerHeight;
            var maskWidth = window.innerWidth;
            $('#mask').css({'display':'block','width':maskWidth,'height':maskHeight});
            $('#thought-display').css({'display':'inline-block','width':maskWidth,'height':maskHeight});
            $(document).trigger({type:'getThought', detail:val._id});
        });
        $('#thoughts').append(thought);
    });
    
    
    $('#mask').click(function(event){
        $(this).hide();
        $('#thought-display').hide();
    });
    
    $(window).resize(function(event) {
        var maskHeight = window.innerHeight;
        var maskWidth = window.innerWidth;
        $('#mask').css({'width':maskWidth,'height':maskHeight});
        $('#thought-display').css({'width':maskWidth,'height':maskHeight});
    });
    
    $(document).keyup(function(event) {
        if(event.which === 27){
            $('#thought-display').hide();
            $('#mask').hide();
        }
    });
    
    $(document).bind('loadThoughts',function(event){
        $('#thoughts').empty();
        $.each(event.detail,function(key, val){
            $(document).trigger({type:'appendThought', detail:val});
        });
    });
    
    $(document).bind('loadThought',function(event){
        $('#tmp').empty();
        var result = event.detail;
        $('#tmp').append(JSON.stringify(result));
    });
    
    $(document).bind('loadChildren',function(event){
        $('#children').empty();
        var result = event.detail;
        $('#children').append('<p>'+JSON.stringify(result)+'</p>');
    });
    
    $(document).bind('loadParents',function(event){
        $('#parents').empty();
        var result = event.detail;
        $('#parents').append('<p>'+JSON.stringify(result)+'</p>');
    });
    
    
})