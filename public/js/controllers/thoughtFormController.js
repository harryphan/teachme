define('controllers/thoughtFormController',['jqueryui'],function($){
    $(document).bind('create',function(){
        var thought={
            question:{
                content:$('#question-content').val(),
                author:$('#question-author').val()
            },
            answer:{
                content:$('#answer-content').val(),
                author:$('#answer-author').val()
            },
            public:$('#visibility').prop('checked')
        };
        $(document).trigger('create-thought',thought);
    })
});