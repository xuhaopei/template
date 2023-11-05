const { merge } = require('webpack-merge');
const webpackBase = require('./webpack.config.base.js');
const path = require('path');
module.exports = merge(webpackBase, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '../../',
        filename: '[name]/static/bundle.[fullhash].js',
    },
})
