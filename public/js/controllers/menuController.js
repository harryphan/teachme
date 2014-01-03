define('controllers/menuController',['jqueryui'],function($){
    
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
    
    $('#signin').dialog({
        modal:true,
        autoOpen: false,
        height:window.innerHeight * 0.75,
        width:window.innerWidth * 0.75,
        draggable:false
    });
    $('#signin-button').click(function(event){
        $('#signin').dialog('open');
    });
    
    
    $('#facebook-login').click(function(event){
        $(document).trigger('facebook-login');
    });
    
});