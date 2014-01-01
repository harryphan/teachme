
/*
 * GET home page.
 */

exports.index = function(req, res){
    console.log('user= ' +req.user);
    res.render('index', { title: 'Teach Me' });
};