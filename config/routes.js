var routes = require('../routes/index')
    , user = require('../routes/user')

module.exports = function(app) {
    
    app.get('/', routes.index);
    app.get('/users', user.list);
    
    
    //Thought routes
    var thoughts = require('../app/controllers/thoughts');
    app.get('/thoughts', thoughts.getPublic);
    app.get('/thoughts/:thoughtId', thoughts.show);
}