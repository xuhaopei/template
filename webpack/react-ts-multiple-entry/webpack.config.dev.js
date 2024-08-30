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
        publicPath: '/',
        filename: '[name].[contenthash].js',
    },
    devServer: {
        static: {
            directory: path.join(__dirname, './dist/*'),
        },
        compress: true,
        port: 9000,
        proxy: [devServerProxy],
        historyApiFallback: {       // 配置路由上的资源未找到时，则从/pages/h5里面查找资源。 类似nginx 查不到资源则向此路径上的资源获取。
            index: '/pages/pc'
        }
    },
    plugins: [
        new CustomBuildLogPlugin()
    ],
})

