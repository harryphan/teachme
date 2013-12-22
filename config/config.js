var _ = require('lodash');

// Load app configuration
console.log(__dirname);
module.exports = _.extend(
    require(__dirname + '/env/all.js'),
    require(__dirname + '/env/' + process.env.NODE_ENV + '.js') || {});
