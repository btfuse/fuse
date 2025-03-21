
const Path = require('node:path');
let config = require('./webpack.config');
const TSLoader = require('./compiler/ts-loader');

TSLoader.options.configFile = Path.resolve('./src/overlay/tsconfig.android.json');

config.entry.push('./src/overlay/android/entry.ts');
config.output.path = Path.join(__dirname, 'android/nativeview/src/main/res/raw/');
config.output.filename = 'btfuse_nativeviewoverlay.js';

module.exports = config;
