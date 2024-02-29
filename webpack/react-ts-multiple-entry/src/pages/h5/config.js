// 代理的域名：
const target = `https://testservice.hotlive.mx`
// const target = `https://service.hotlive.mx`
const proxy = {
    '/api/*': {
        target,
        secure: false,
        changeOrigin:true,  // 将拦截到浏览器的请求，将请求中的origin 由本地ip（域名） 改为 目标服务器， 因为有的目标服务器会对这块进行限制。
        onProxyReq(proxyReq, req, res){},
        onProxyRes(proxyRes, req, res) { // 获取到target服务器返回的接口信息后进行拦截，这里进行代理信息填写后，再传给“浏览器”
            proxyRes.headers['x-proxy-by'] = 'local-proxy'
            proxyRes.headers['x-proxy-target'] = target
            proxyRes.headers['x-proxy-target-path'] = target + req.url
        },
    }
}
// 入口文件
const entry = 'pages/h5'

module.exports = {
    entry,
    proxy,
    html: {
        title:'Live Messenger',
        scripts: [
            `<script crossorigin src="/public/react@18.2.0/react.development.js"></script>`,
            `<script crossorigin src="/public/react@18.2.0/react-dom.development.js"></script>`,
            `<script src="https://accounts.google.com/gsi/client" async></script>`,
            `<script src="//sf-unpkg.bytepluscdn.com/obj/byteplusfe-sg/sdk/@byteplus/veplayer/1.6.3/index.min.js"></script>`
        ],
        links: [
            `<link rel="stylesheet" href="//sf-unpkg.bytepluscdn.com/obj/byteplusfe-sg/sdk/@byteplus/veplayer/1.6.3/index.min.css">`,
            `<link id="icon" rel="shortcut icon" href="" />`
        ]
    }
}