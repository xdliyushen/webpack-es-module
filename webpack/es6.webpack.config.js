const path = require('path');
const commonConfig = require('./common.webpack.config');

// es6+
const es6Config = {
    output: {
        filename: 'main.mjs',
        path: path.resolve(__dirname, '../public'),
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            // todo tips: useBuiltIns: usage 代表按需加入 ployfill, entry 代表自动加上 polyfill
            use: 'babel-loader'
        }, {
            test: /.less/,
            use: ["style-loader", "css-loader", "less-loader"]
        }],
    },
};

module.exports = Object.assign({}, commonConfig, es6Config);