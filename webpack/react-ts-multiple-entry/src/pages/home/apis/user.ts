import http from './index'

const getUserInfo = (data) => {
    return  http.request({
        url: '/api/v1/game/pin_message',
        method: 'get',
        params: data
    })
}

export default {
    getUserInfo
}