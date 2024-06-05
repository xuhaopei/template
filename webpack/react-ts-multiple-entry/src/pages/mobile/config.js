// 代理的域名：
const target = `https://testservice.hotlive.mx`
// const target = `https://service.hotlive.mx`
const proxy = {
    '/api/*': {
        target,
        secure: false,
        changeOrigin: true,  // 将拦截到浏览器的请求，将请求中的origin 由本地ip（域名） 改为 目标服务器， 因为有的目标服务器会对这块进行限制。
        onProxyReq(proxyReq, req, res) { },
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
        title: 'mobile',
        scripts: [
            `<script crossorigin src="/public/react@18.2.0/react.development.js"></script>`,
            `<script crossorigin src="/public/react@18.2.0/react-dom.development.js"></script>`,
            // 添加pwa清单与安装拦截代码
            `<link rel="manifest" href="/app.webmanifest">`,
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
            `,
            // 配合workbox-webpack-plugin添加sw
            // `
            // <script>
            //     if ('serviceWorker' in navigator) {
            //         window.addEventListener('load', async () => {
            //         console.log('page load...')
            //         let res = await navigator.serviceWorker.register('/service-worker.js')
            //         console.log(res, 'serviceWorker res')
            //         if (res) {
            //             console.log('register success!')
            //         } else {
            //             console.log('register fail!')
            //         }
            //         })
            //     }
            // </script>
            // `,
            // 动态添加eruda
            `
            <!--eruda-->
            <script async>
                function handleCreateEruda() {
                    let script = document.createElement('script')
                    script.src = '/public/js/eruda.js'
                    document.getElementsByTagName('head')[0].appendChild(script)
                    script.onload = () => {
                    eruda.init()
                    eruda.position({ x: 0, y: 200 })
                    }
                }
                let eruda_preTime = 0
                let eruda_count = 0
                let eruda_isopen = false
                let eruda_minWidth = 0
                let eruda_maxWidth = window.innerWidth / 5
                let eruda_minHeight = window.innerHeight - window.innerHeight / 10
                let eruda_maxHeight = window.innerHeight
                function eruda_is_inzone({ clientX, clientY }) {
                    if (
                    clientX <= eruda_maxWidth &&
                    clientX >= eruda_minWidth &&
                    clientY <= eruda_maxHeight &&
                    clientY >= eruda_minHeight
                    ) {
                    return true
                    } else {
                    return false
                    }
                }

                if (location.hostname.includes('192') || location.hostname.includes('test') || location.hostname.includes('localhost')) {
                    handleCreateEruda()
                    eruda_isopen = true
                }
                window.addEventListener('click', (data) => {
                    let currentTime = new Date().getTime()
                    if (eruda_isopen) {
                    return
                    }
                    if (eruda_is_inzone({ clientX: data.clientX, clientY: data.clientY })) {
                    if (currentTime - eruda_preTime < 500) {
                        count++
                    } else {
                        count = 0
                    }
                    } else {
                    count = 0
                    }
                    eruda_preTime = currentTime
                    if (count >= 15) {
                    handleCreateEruda()
                    eruda_isopen = true
                    }
                })
            </script>
            `,
        ],
        links: [
        ]
    }
}