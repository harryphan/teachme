

module.exports=function(){
    function render (req, res) {
        res.render('index', {
            user: req.user ? JSON.stringify(req.user) : "null"
        });
    }
    return{
        render:render
    }
}();