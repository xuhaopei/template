const { merge } = require('webpack-merge');
const webpackBase = require('./webpack.config.base.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = merge(webpackBase, {
    mode: 'production',
    plugins: [
        new BundleAnalyzerPlugin(),
    ],
})
