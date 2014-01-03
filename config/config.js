var _ = require('lodash');

// Load app configuration
module.exports = _.extend(
    require(__dirname + '/env/all.js'),
    require(__dirname + '/env/' + process.env.NODE_ENV + '.js') || {});
