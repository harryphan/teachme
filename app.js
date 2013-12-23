
/**
 * Module dependencies.
 */

var express = require('express')
    , http = require('http')
    , env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'
    , fs = require('fs')
    , config = require('./config/config')
    , mongoose = require('mongoose')
    , passport = require('passport')
    , db = mongoose.connect(config.db)
    ;


//Bootstrap db connection



var models_path = __dirname + '/app/models';
var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js$|coffee$)/.test(file)) {
                require(newPath);
            }
        } else if (stat.isDirectory()) {
            walk(newPath);
        }
    });
};
walk(models_path);
require('./config/passport')(passport);

var app = express();
require('./config/express')(app,passport,db);
require('./config/routes')(app);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
