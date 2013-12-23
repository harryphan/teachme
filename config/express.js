var express = require('express')
    , mongoStore = require('connect-mongo')(express)
    , config = require('./config')
    , helpers = require('view-helpers')
    ;

module.exports = function(app,passport,db) {
    app.set('showStackError', true);    
    
    //Prettify HTML
    app.locals.pretty = true;
    app.use(express.compress({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));
    
    app.set('port', process.env.PORT || 3000);
    
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    
    app.use(express.logger('dev'));
   
    app.use(express.static(config.root + '/public'));
    
    // development only
    if ('development' == app.get('env')) {
      app.use(express.errorHandler());
    }
    
    app.configure(function() {
        //cookieParser should be above session
        app.use(express.cookieParser());

        // request body parsing middleware should be above methodOverride
        app.use(express.urlencoded());
        app.use(express.json());
        app.use(express.methodOverride());

        //express/mongo session storage
        app.use(express.session({
            secret: 'MYSECRET',
            store: new mongoStore({
                db: db.connection.db,
                collection: 'sessions'
            })
        }));

   

        //dynamic helpers
        app.use(helpers(config.app.name));

        //use passport session
        app.use(passport.initialize());
        app.use(passport.session());

        //routes should be at the last
        app.use(app.router);

        //Assume "not found" in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
        app.use(function(err, req, res, next) {
            //Treat as 404
            if (~err.message.indexOf('not found')) return next();

            //Log it
            console.error(err.stack);

            //Error page
            res.status(500).render('500', {
                error: err.stack
            });
        });

        //Assume 404 since no middleware responded
        app.use(function(req, res, next) {
            res.status(404).render('404', {
                url: req.originalUrl,
                error: 'Not found'
            });
        });

    });
}