const path = require('path')
const entries = {}
const htmlWebpackPlugins = []
let devServerProxy = {}
const HtmlWebpackPlugin = require('html-webpack-plugin')
const build = (options = {}) => {
    // 设置页面入口，
    const entryName = options.entry
    entries[entryName] = path.resolve(__dirname, `./src/${entryName}/main`)
    // 设置每个页面对应的html文件模板
    htmlWebpackPlugins.push(new HtmlWebpackPlugin({
        filename: `${entryName}/index.html`,
        chunks: [entryName],
        template: path.resolve(__dirname, './index.html'),
        ...options.html,
        scripts: [
            ...options.html.scripts
        ].join(''),
        links: [
            '<link rel="stylesheet" href="/public/css/global.css">',
            ...options.html.links
        ].join(''),
    }))

    // 设置页面对应的代理信息
    devServerProxy = {
        ...devServerProxy,
        ...options.proxy,
    }
}


// 这里是业务方添加代码使用。
// build(require('./src/pages/home/config')) // 构建页面 home
// build(require('./src/pages/main/config')) // 构建页面 main
build(require('./src/pages/h5/config')) // 构建页面 h5


module.exports = {
    entries,
    htmlWebpackPlugins,
    devServerProxy
}