import {
    HOST_ONLINE,
    HOST_TEST,
    HOST_CURR,
    SERVICE_ONLINE,
    SERVICE_TEST,
    SERVICE_DEV
} from '../../constants'
const domain = {
    dev: SERVICE_DEV,
    qa: SERVICE_TEST,
    online: SERVICE_ONLINE,
}
module.exports = {
    domain,
    entry: 'pages/main',
    proxy: {
        '/api/v2/*': {
            target: `${domain[process.env.domain]}`,
            secure: false,
        }
    },
    html: {
        title:'main',
        scripts: [
            `<script crossorigin src="/public/react@18.2.0/react.development.js"></script>`,
            `<script crossorigin src="/public/react@18.2.0/react-dom.development.js"></script>`,
        ],
        links: [
            
        ]
    }
}