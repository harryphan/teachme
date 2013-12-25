
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
    , app = express()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server)
    ;

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
require('./config/express')(app,passport,db);
require('./config/routes')(app);
server.listen(config.port);

require('./config/sockets')(io);