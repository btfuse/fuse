
/*
Copyright 2025-2025 Breautek

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const Path = require('path');
const TSLoader = require('../../compiler/webpack/ts-loader');
const StyleLoader = require('../../compiler/webpack/style-loader');

TSLoader.use.options.configFile = Path.resolve('./spec/tsconfig.json');

module.exports = {
    devtool: false,
    entry: [
        './spec/UnitTestApplication.ts'
    ],
    stats: 'error-warnings',
    output: {
        path: null,
        publicPath: '/assets/',
        filename: 'UnitTestApp.js'
    },
    resolve: {
        mainFields: [ 'main' ],
        extensions: [
            '.webpack.js',
            '.ts',
            '.js'
        ],
        alias: {
            '@btfuse/core': Path.resolve(__dirname, '../../js/src/api.ts'),
            '@btfuse/mocha': Path.resolve(__dirname, './src/api.ts')
        }
    },
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            TSLoader,
            // MochaLoader,
            StyleLoader,
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
