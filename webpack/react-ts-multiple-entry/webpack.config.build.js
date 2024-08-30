const { merge } = require('webpack-merge');
const webpackBase = require('./webpack.config.base.js');
const path = require('path');
const { GenerateSW, InjectManifest } = require('@aaroon/workbox-rspack-plugin')
const { ChangeWorkerServiceName } = require('./plugins/index')
module.exports = merge(webpackBase, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '../../', // 这里设置引用资源的路径
        filename: 'static/js/[name].[chunkhash:8].js', // 这里设置js文件在dist文件上的位置，设置js文件全都放在dist/static/js/文件夹下
    },
    plugins: [
        new GenerateSW({
            clientsClaim: true, // 快速启用服务
            skipWaiting: true,
            maximumFileSizeToCacheInBytes: 4 * 1024 * 1024
        }),
        new ChangeWorkerServiceName()
    ]
})
