
const Path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    // inline is required by Android because sourcemaps aren't loaded in the webview context, but rather the DevConsole
    // context, whose network requests doesn't pass through the WebViewAssetLoader
    devtool: 'inline-source-map',
    entry: ['./src/App.ts'],
    stats: 'errors-warnings',
    output: {
        path: Path.join(__dirname, 'build/'),
        publicPath: '/assets/',
        filename: 'js/app.js'
    },
    resolve: {
        mainFields: [
            'main'
        ],
        extensions: [
            '.webpack.js',
            '.ts',
            '.js'
        ],
        alias: {
            '@btfuse/core': Path.resolve(__dirname, '../js/src/api.ts'),
            '@btfuse/echo': Path.resolve(__dirname, '../echo/src/api.ts')
        }
    },
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /(\.tsx?|\.jsx?)$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        projectReferences: true
                    }
                },
                exclude: /node_modules/
            },
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
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: './assets/*', to: './' }
            ]
        })
    ]
}
