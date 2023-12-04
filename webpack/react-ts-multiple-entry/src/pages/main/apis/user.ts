import http from './index'

export const getUserInfo = (data) => {
    return  http.request({
        url: '/userInfo',
        method: 'get',
        params: data
    })
}