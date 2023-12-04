const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageJson = require('./package.json');
const CopyPlugin = require("copy-webpack-plugin");
const pagesConfig = require('./pages.config')
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
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
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
            'process.env.DOMAIN': JSON.stringify(process.env.DOMAIN),
        }),
        ...pagesConfig.htmlWebpackPlugins,
        new CopyPlugin({
            patterns: [
              { from: "public", to: "." }, // 将public里面的文件也打包进dist文件夹
            ],
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
        extensions: ['.tsx','.jsx','.ts', '.js'],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, './dist'),
        },
        compress: true,
        port: 9000,
    },
    externals:{
        'react':'React',
    }
}

