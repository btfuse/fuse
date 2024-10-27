
const Path = require('path');
const TSLoader = require('./compiler/ts-loader');

module.exports = {
    devtool: false,
    entry: [],
    stats: 'error-warnings',
    output: {
        path: null,
        publicPath: '/assets/',
        filename: 'BTFuseNativeViewOverlay.js'
    },
    resolve: {
        mainFields: [ 'main' ],
        extensions: [
            '.webpack.js',
            '.ts',
            '.js'
        ]
    },
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            TSLoader,
            { 
                // Lift the library source maps to the application level
                // so the browser will load them up
                test: /\.js$/, 
                enforce : 'pre',
                use: ["source-map-loader"]
            },
            {
                test: /\.(ttf|eot|png|jp(e*)g|svg)$/,
                type: 'asset/resource',
                include: Path.resolve(__dirname, 'src/res'),
                exclude: /node_modules/
            }
        ]
    },
    plugins: []
};
