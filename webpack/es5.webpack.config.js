const path = require('path');
const commonConfig = require('./common.webpack.config');

// es5
const es5Config = {
    output: {
        filename: 'main.es5.js',
        path: path.resolve(__dirname, '../public'),
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env', {
                            modules: false,
                            useBuiltIns: 'usage',
                            targets: {
                                browsers: [
                                    '> 1%',
                                    'last 2 versions',
                                    'Firefox ESR',
                                ],
                            },
                        }],
                    ],
                },
            },
        }, {
            test: /.less/,
            use: ["style-loader", "css-loader", "less-loader"]
        }],
    },
};

module.exports = Object.assign({}, commonConfig, es5Config)