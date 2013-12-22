
/**
 * Module dependencies.
 */

var express = require('express')
    , http = require('http')
    , env = process.env.NODE_ENV = process.env.NODE_ENV || 'development' 
    ;


var app = express();
require('./config/express')(app);
require('./config/routes')(app);




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
