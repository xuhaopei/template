// 代理的域名：
const proxy = {
    '/api/v1/*': {
        // target: `https://service.hotlive.mx`,
        target: `https://testservice.hotlive.mx`,
        secure: false,
    }
}
// 入口文件
const entry = 'pages/home'

module.exports = {
    entry,
    proxy,
    html: {
        title:'home',
        scripts: [
            `<script crossorigin src="/public/react@18.2.0/react.development.js"></script>`,
            `<script crossorigin src="/public/react@18.2.0/react-dom.development.js"></script>`,
        ],
        links: [
            
        ]
    }
}