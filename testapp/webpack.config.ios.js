const Path = require('path');
const config = require('./webpack.config');

config.output.path = Path.join(__dirname, './ios/testapp/assets/');

module.exports = config;
