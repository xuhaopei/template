import instance from 'src/pages/h5/apis'
const getUserInfo = (data) => {
    return instance.request({
        url: '/api/v1/game/pin_message',
        method: 'get',
        params: data
    })
}