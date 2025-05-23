
const Path = require('node:path');
let config = require('./webpack.config');
const TSLoader = require('./compiler/ts-loader');

TSLoader.use.options.configFile = Path.resolve('./src/overlay/tsconfig.ios.json');

config.entry.push('./src/overlay/ios/entry.ts');
config.output.path = Path.join(__dirname, 'ios/BTFuseNativeView/assets/');
config.output.filename = 'BTFuseNativeViewOverlay.js';

module.exports  = config;
