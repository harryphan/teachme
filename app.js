var cluster = require('cluster')
    , store = new (require('socket.io-clusterhub'))();

if (cluster.isMaster) {
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
    cluster.on('exit', function (worker) {
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();
    });
}
else{

    /**
     * Module dependencies.
     */
    var express = require('express')
        , env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'
        , fs = require('fs')
        , config = require('./config/config')
        , mongoose = require('mongoose')
        , passport = require('passport')
        , auth = require('./config/middlewares/authorization')
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
    io.configure(function() {
        io.set('store', store);
    });
    require('./config/sockets')(io);
    require('./config/passport')(passport); 
    require('./config/express')(app,passport,db);
    require('./config/routes')(app,passport,auth);
    server.listen(config.port);
}