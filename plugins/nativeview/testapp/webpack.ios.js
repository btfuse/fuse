
const Path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

const config = require('./webpack.config');
config.output.path = Path.join(__dirname, '../ios/TestApp/TestApp/assets/');

config.plugins.push(new CopyPlugin({
    patterns: [
        {
            from: Path.resolve(__dirname, 'assets')
        }
    ]
}));

module.exports = config;
