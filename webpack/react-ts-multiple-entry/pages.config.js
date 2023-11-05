const path = require('path');
const entries = {}
const htmlWebpackPlugins = []
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getConfig = (entryName) => {
    entries[entryName] = path.resolve(__dirname, `./src/${entryName}/main`)
    htmlWebpackPlugins.push(new HtmlWebpackPlugin({
        filename: `${entryName}/index.html`,
        chunks: [entryName],
        template: path.resolve(__dirname, './index.html'),
        script1: `<script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>`,
        script2: `<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>`,
    }))
}

getConfig('pages/home')
getConfig('pages/main')

module.exports = {
    entries,
    htmlWebpackPlugins
}