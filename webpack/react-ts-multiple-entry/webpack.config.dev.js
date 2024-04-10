const path = require('path');
const { merge } = require('webpack-merge');
const webpackBase = require('./webpack.config.base.js');
const { CustomBuildLogPlugin } = require('./plugins/index')
const { devServerProxy } = require('./entrys/index')
module.exports = merge(webpackBase, {
    mode: 'development',
    stats: 'errors-only',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
    },
    devServer: {
        static: {
            directory: path.join(__dirname, './dist/*'),
        },
        compress: true,
        port: 9000,
        proxy: devServerProxy,
    },
    plugins: [
        new CustomBuildLogPlugin()
    ],
})

