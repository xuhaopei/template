# 开始
npm i 
npm run start

# 更新日志
## 2024-08-30
1. 将webpack迁移到rspack
2. 添加构建所花费时间
3. 将bable-loader替换成swc-loader加快构建速度
## 2024-08-12
1. 引入纯的react-redux与react-toolkit的使用
## 2024-07-25
1. 添加打包进度日志
2. 支持sw打包后生成的文件名更新，避免cdn影响
3. 更新react，从17 =》 18
## 2024-07-01
1. 打包环境才将serivce worker进行打包，避免开发环境报sw渲染错误。
2. 将/pages/pc 从 hash路由 改成 history路由，并封装useNavigate，支持切换url的时候url上的参数还在。
3. 开发环境添加webpack的output配置publicPath为'/'，避免history路由影响。
## 2024-06-05
1. 增加eruda的安装
2. 增加pwa中清单的安装
## 2024-05-17
1. 优化目录结构，pc目录为适配rem，mobile为适配vw
2. 通过扩张hashRouter的属性，支持了通过在hashRouter配置preloadLevel达到组件预加载的效果。
## 2024-05-15
1. 设置生产环境下js文件全都放置在dist/static/js/文件夹下
2. 加入postcss-pxtorem与全局hooks，针对less文件将其px转成rem
## 2024-04-10
1. 优化postcss.config的配置颗粒度，支持针对scss文件用vw转换，针对其他文件不进行vw的转换。
2. 优化打包后输出的文件名称。
3. 添加一个模板组件，规范api、图片与组件的源码都在同一个目录下，这么做的目的是方便为了代码的复用。
## 2024-03-05
1. 支持sass文件
2. 修改入口文件为entrys/index
## 2024-02-29
1. 新增react store
2. 多语言
3. 新增analyze进行构建分析
## 2024-02-28
1. 新增react路由
## 2024-02-05
1. 优化config.js关于proxy的配置信息
## 2024-01-25
1. 配置接口代理更改优化
2. 新增基本的常量定义
3. 优化api文件的基本配置
## 2023-12-04
1. react更新为18，并将文件放入pubilc文件夹下
2. 优化css类名的展示，为名称为： 组件_类名_哈希值
3. 优化日志显示
4. 配置接口代理