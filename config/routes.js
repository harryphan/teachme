var routes = require('../routes/index')
    , user = require('../routes/user')

module.exports = function(app) {
    
   // app.get('/', routes.index);
    app.get('/users', user.list);
    
    
    //Thought routes
    var thoughts = require('../app/controllers/thoughts');
    app.get('/thoughts', thoughts.getPublic);
    app.post('/thoughts', thoughts.create);
    app.get('/thoughts/:thoughtId', thoughts.show);
    
    //Finish with setting up the articleId param
    app.param('thoughtId', thoughts.thought);
    
    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render); 
}