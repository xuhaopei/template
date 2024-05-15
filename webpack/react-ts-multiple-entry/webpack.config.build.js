const { merge } = require('webpack-merge');
const webpackBase = require('./webpack.config.base.js');
const path = require('path');
module.exports = merge(webpackBase, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '../../', // 这里设置引用资源的路径
        filename: 'static/js/[name].[chunkhash:8].js', // 这里设置js文件在dist文件上的位置，设置js文件全都放在dist/static/js/文件夹下
    },
})
