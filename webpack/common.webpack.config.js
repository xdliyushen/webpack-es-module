const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

// todo 不要产出 LICENSE.txt 文件
module.exports = {
    // todo 修改 mode
    mode: 'production',
    entry: './src/index.js',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 9000,
    },
    optimization: {
        minimizer: [new TerserPlugin({ extractComments: false })],
    },
}