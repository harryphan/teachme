/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User');


module.exports = function()
{
    
    function authCallback(req,res,next){
        res.redirect('/');
    }
    /**
     * Show login form
     */
    function signIn(req, res) {
        res.render('users/signin', {
            title: 'Signin',
            message: req.flash('error')
        });
    }
    /**
     * Show sign up form
     */
    function signUp(req, res) {
        res.render('users/signup', {
            title: 'Sign up',
            user: new User()
        });
    }
    
    /**
     * Logout
     */
    function signOut(req, res) {
        req.logout();
        res.redirect('/');
    }
    
    /**
     * Session
     */
    function session(req, res) {
        res.redirect('/');
    }
    
    /**
     * Create user
     */
    function create(req, res) {
        var user = new User(req.body);
        var message = null;
    
        user.provider = 'local';
        user.save(function(err) {
            if (err) {
                switch(err.code){
                    case 11000:
                    case 11001:
                        message = 'Username already exists';
                        break;
                    default: 
                        message = 'Please fill all the required fields';
                }
    
                return res.render('users/signup', {
                    message: message,
                    user: user
                });
            }
            req.logIn(user, function(err) {
                if (err) return err;
                return res.redirect('/');
            });
        });
    }
    /**
     * get user
     */
    function me(req, res) {
        res.jsonp(req.user || null);
    }
    
    /**
     * Find user by id
     */
    function user(req, res, next, id) {
        User
            .findOne({
                _id: id
            })
            .exec(function(err, user) {
                if (err) return next(err);
                if (!user) return next(new Error('Failed to load User ' + id));
                req.profile = user;
                next();
            });
    }
    return {
        authCallback: authCallback,
        signIn:signIn,
        signUp:signUp,
        signOut:signOut,
        session:session,
        create:create,
        me:me,
        user:user
    };
}();
