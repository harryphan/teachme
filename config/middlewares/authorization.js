


module.exports=function(){
        
    /**
     * Generic require login routing middleware
     */
    function requiresLogin(req, res, next) {
        if (!req.isAuthenticated()) {
            return res.send(401, 'User is not authorized');
        }
        next();
    }
    
    /**
     * User authorizations routing middleware
     */
    var user = {
        hasAuthorization: function(req, res, next) {
            if (req.profile.id != req.user.id) {
                return res.send(401, 'User is not authorized');
            }
            next();
        }
    };
    
    /**
     * Article authorizations routing middleware
     */
    var article = {
        hasAuthorization: function(req, res, next) {
            if (req.article.user.id != req.user.id) {
                return res.send(401, 'User is not authorized');
            }
            next();
        }
    };
    
    return{
        requiresLogin:requiresLogin,
        user:user,
        article:article
    }

}