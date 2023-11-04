// postcss.config.js
module.exports = {
    plugins: {
        'postcss-px-to-viewport': {
            viewportWidth: 750,  // 设置视口宽度，根据你的设计稿而定
            unitPrecision: 5,   // 单位转换后保留的小数位数
            propList: ['*'],    // 要转换的CSS属性，* 表示所有属性
            viewportUnit: 'vw', // 要转换成的单位
            selectorBlackList: [], // 需要忽略的选择器
            minPixelValue: 1,   // 小于等于1px不转换
            mediaQuery: false    // 是否在媒体查询中转换
        }
    }
};
