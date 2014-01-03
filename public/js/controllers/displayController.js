define('controllers/displayController',['jqueryui'],function($){
    
    
    /**
     * data loading events
     **/
    $(document).bind('appendThought',function(event, val){
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
            $('#thought-display > div').css({'width':maskWidth});
            $(document).trigger('getThought', val._id);
        });
        $('#thoughts').append(thought);
    });
    
    $(document).bind('loadThoughts',function(event, results){
        $('#thoughts').empty();
        if(results.length===0 ){
            $('#thoughts').text('No questions found. Click to form a question.');
        }else{
            $.each(results,function(key, val){
                $(document).trigger('appendThought', val);
            });
        }
    });
    
    $(document).bind('loadThought',function(event,result){
        $('#tmp').empty();
        $('#children').empty();
        $('#parents').empty();
        $('#question').text(result.question.content);
        if(result.answer.content && result.answer.content!==''){
            $('#answer').text(result.answer.content);
        }else{
            $('#answer').text('No Answer Yet. Click to answer');
        }
    });
    
   
    $(document).bind('loadChildren',function(event,result){
        $.each(result, function(key,val){
            $(document).trigger('appendThoughtNode', ['#children',val]);
        });
    });
    $(document).bind('loadParents',function(event,result){
        $.each(result, function(key,val){
            $(document).trigger('appendThoughtNode', ['#parents',val]);
        });
    });
    
    $(document).bind('appendThoughtNode',function(event, target, result){
        
        var node = $('<span/>',{
            class:'thought-node',
            text:result.question.content,
            id:result._id
        });
        node.bind('click',function(event){
            $(document).trigger('getThought', result._id);
        });
        $(target).append(node);
    });
    /**
     * browser events
     * */
    $('#mask').click(function(event){
        $(this).hide();
        $('#thought-display').hide();
    });
    
    $(window).resize(function(event) {
        var maskHeight = window.innerHeight;
        var maskWidth = window.innerWidth;
        $('#mask').css({'width':maskWidth,'height':maskHeight});
        $('#thought-display').css({'width':maskWidth});
        $('#thought-display > div').css({'width':maskWidth});
    });
    
    $(document).keyup(function(event) {
        if(event.which === 27){
            $('#thought-display').hide();
            $('#mask').hide();
        }
    });
    
})