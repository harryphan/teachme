define('menuController',['jquery'],function($){
    $('#faq-button').click(function(event){
        console.log('heheheh');
        $('#faq').dialog('open');
    });
});