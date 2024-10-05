const Path = require('path');
const config = require('./webpack.config');

config.output.path = Path.resolve(process.env.ASSET_DIR);

module.exports = config;
