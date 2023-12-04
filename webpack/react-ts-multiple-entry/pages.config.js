const path = require('path');
const entries = {}
const htmlWebpackPlugins = []
let devServerProxy = {}
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getConfig = (options = {}) => {
    const entryName = options.entry
    entries[entryName] = path.resolve(__dirname, `./src/${entryName}/main`)
    htmlWebpackPlugins.push(new HtmlWebpackPlugin({
        filename: `${entryName}/index.html`,
        chunks: [entryName],
        template: path.resolve(__dirname, './index.html'),
        ...options.html,
        scripts: options.html.scripts.join(''),
        links: [
            '<link rel="stylesheet" href="/public/css/global.css">',
        ].join(''),
    }))
    devServerProxy = {
        ...devServerProxy,
        ...options.proxy,
    }
}


// 业务更改
getConfig(require('./src/pages/home/config'))
getConfig(require('./src/pages/main/config'))



module.exports = {
    entries,
    htmlWebpackPlugins,
    devServerProxy
}