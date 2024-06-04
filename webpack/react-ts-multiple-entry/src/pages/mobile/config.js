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
const entry = 'pages/mobile'

module.exports = {
    entry,
    proxy,
    html: {
        title:'mobile',
        scripts: [
            `<script crossorigin src="/public/react@18.2.0/react.development.js"></script>`,
            `<script crossorigin src="/public/react@18.2.0/react-dom.development.js"></script>`,
            `
            <script>
            var deferredPrompt;
            window.addEventListener('beforeinstallprompt', (e) => {
            // Prevents the default mini-infobar or install dialog from appearing on mobile
            e.preventDefault();
            // Save the event because you'll need to trigger it later.
            deferredPrompt = e;
            // Show your customized install prompt for your PWA
            // Your own UI doesn't have to be a single element, you
            // can have buttons in different locations, or wait to prompt
            // as part of a critical journey.
            // showInAppInstallPromotion();
            });
            </script>
            `
        ],
        links: [
            `<link rel="manifest" href="/app.webmanifest">`
        ]
    }
}