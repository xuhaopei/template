// postcss.config.js
// postcss-loader的使用说明，https://www.npmjs.com/package/postcss-loader
// plugins中postcss-px-to-viewport的使用说明文档 https://github.com/evrone/postcss-px-to-viewport

module.exports = (api) => {
    // `api.file` - path to the file
    // `api.mode` - `mode` value of webpack, please read https://webpack.js.org/configuration/mode/
    // `api.webpackLoaderContext` - loader context for complex use cases
    // `api.env` - alias `api.mode` for compatibility with `postcss-cli`
    // `api.options` - the `postcssOptions` options
    if (/\.s[ac]ss$/.test(api.file)) {
        return {
            // You can specify any options from https://postcss.org/api/#processoptions here
            plugins: {
                'postcss-px-to-viewport': {
                    viewportWidth: 750,  // 设置视口宽度，根据你的设计稿而定
                    unitPrecision: 5,   // 单位转换后保留的小数位数
                    propList: ['*'],    // 要转换的CSS属性，* 表示所有属性
                    viewportUnit: 'vw', // 要转换成的单位
                    selectorBlackList: [
                        'pc', // 如 .pc-class则会被忽略
                    ], // 需要忽略的选择器
                    minPixelValue: 1,   // 小于等于1px不转换
                    mediaQuery: false    // 是否在媒体查询中转换
                }
            },
        }
    }
    if (/\.less$/.test(api.file)) {
        return {
            // https://www.npmjs.com/package/postcss-pxtorem
            plugins: {
                'postcss-pxtorem': {
                    rootValue: 1, // 根元素字体大小，可以根据设计稿设置
                    propList: ['*'], // 要转换的属性列表，这里表示所有属性都转换
                    minPixelValue: 2 // 最小的像素值，小于这个值的不会被转换
                }
            },
        }
    }
    return {
        // You can specify any options from https://postcss.org/api/#processoptions here
        plugins: {}
    }
}