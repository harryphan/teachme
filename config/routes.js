var routes = require('../routes/index')
    , user = require('../routes/user')
    ;

module.exports = function(app,passport, auth) {
    var users = require('../app/controllers/users');
    // app.get('/', routes.index);
    //app.get('/users', user.list);
    //Setting the facebook oauth routes
    app.get('/signout', users.signOut);
    
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email'],
        failureRedirect: '/signin'
    }), users.signIn);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.signIn);

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.signIn);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the google oauth routes
    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), users.signIn);

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Finish with setting up the userId param
    app.param('userId', users.user);
    
    
    
    //Thought routes
    var thoughts = require('../app/controllers/thoughts');
    app.get('/thoughts', thoughts.getPublic);
    app.post('/thoughts', thoughts.create);
    app.get('/thoughts/:thoughtId', thoughts.show);
    
    //Finish with setting up the articleId param
    app.param('thoughtId', thoughts.thought);
    
    //Home route
    var index = require('../app/controllers/index');
    app.get('/',index.render); 
}