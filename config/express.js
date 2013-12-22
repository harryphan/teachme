var express = require('express')
    , config = require('./config')
 
    ;

module.exports = function(app) {
    
    app.set('port', process.env.PORT || 3000);
    app.set('views', config.root + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    app.use(app.router);
    app.use(express.static(config.root + '/public'));
    
    // development only
    if ('development' == app.get('env')) {
      app.use(express.errorHandler());
    }
}