
const Path = require('path');

module.exports = {
    devtool: 'inline-source-map',
    entry: ['./src/template/Cordova.ts'],
    stats: 'errors-warnings',
    output: {
        path: Path.join(__dirname, 'lib/template'),
        filename: 'cordova.js'
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
            {
                test: /(\.tsx?|\.jsx?)$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: {
                    context: Path.resolve(__dirname, './src/template'),
                    configFile: Path.resolve(__dirname, './src/template/tsconfig.json')
                }
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
    }
};
