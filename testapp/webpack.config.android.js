const Path = require('path');
const config = require('./webpack.config');

config.output.path = Path.join(__dirname, './android/testapp/src/main/assets/');

module.exports = config;
