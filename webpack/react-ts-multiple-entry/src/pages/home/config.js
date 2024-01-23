const domain = {
    dev:'https://testservice.hotlive.mx',
    qa:'https://testservice.hotlive.mx',
    online:'https://service.hotlive.mx',
}
module.exports = {
    domain,
    entry: 'pages/home',
    proxy: {
        '/api/v1/*': {
            target: `${domain[process.env.domain]}`,
            secure: false,
        }
    },
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