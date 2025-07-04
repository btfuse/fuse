
const Path = require('path');
const TSLoader = require('../../compiler/webpack/ts-loader');

TSLoader.use.options.configFile = Path.resolve('./tsconfig.json');

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
        ],
        alias: {
            '@btfuse/core': Path.resolve(__dirname, '../../js/src/api.ts')
        }
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
