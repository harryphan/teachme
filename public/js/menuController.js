define('menuController',['jqueryui'],function($){
    
    $('#faq').dialog({
        modal:true,
        autoOpen: false,
        height:window.innerHeight * 0.75,
        width:window.innerWidth * 0.75,
        draggable:false
    });
   
    $('#faq-button').click(function(event){
        $('#faq').dialog('open');
    });
});