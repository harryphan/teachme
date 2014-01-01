

module.exports=function(){
    function render (req, res) {
        res.render('index', {
            user: req.user ? req.user : undefined
        });
    }
    return{
        render:render
    }
}();