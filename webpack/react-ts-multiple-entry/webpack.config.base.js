const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { DefinePlugin, ProgressPlugin, CopyRspackPlugin } = require('@rspack/core');
const CopyPlugin = CopyRspackPlugin
const { GteFinishTime } = require('./plugins/index')
const pagesConfig = require('./entrys')
module.exports = {
    entry: pagesConfig.entries,
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/ // 不编译node_modules下的文件
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[folder]_[local]_[hash:base64:5]', // 设置样式隔离后css的文件名称，参考这个:https://webpack.docschina.org/loaders/css-loader/#root
                            },
                        },
                    },
                    'postcss-loader',
                    'less-loader',
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[folder]_[local]_[hash:base64:5]', // 设置样式隔离后css的文件名称，参考这个:https://webpack.docschina.org/loaders/css-loader/#root
                            },
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        // 将node的环境变量注入到浏览器的环境变量中
        new DefinePlugin({
            'process.env.domain': process.env.domain ? JSON.stringify(process.env.domain) : '',
        }),
        ...pagesConfig.htmlWebpackPlugins,
        new CopyPlugin({
            patterns: [
              { from: "public", to: "./public" }, // 将public里面的文件也打包进dist文件夹
              { from: "root", to: "."}
            ],
        }),
        new ProgressPlugin((percentage, message, ...args) => {
            console.clear()
            console.info('构建进度：' + Math.round(percentage * 100) + '%');
        }),
        new GteFinishTime()
    ],
    resolve: {
        alias: {
            'src': path.resolve(__dirname, './src'),
        },
        extensions: ['.tsx', '.jsx', '.ts', '.js'],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, './dist'),
        },
        compress: true,
        port: 9000,
    },
    externals: {
        react: 'React',             // react 代表 包名， `React`代表全局变量名
        'react-dom': 'ReactDOM',
    }
}

