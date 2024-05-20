import instance from './index'

const getGameList = (data) => {
    return instance.request({
        url: '/api/game_hall/demo_free_game',
        method: 'get',
        params:data
    })
}

const startStreaming = (data) => {
    return instance.request({
        url: '/api/v1/live/pc/start',
        method: 'post',
        data
    })
}

const stopStreaming = (data) => {
    return instance.request({
        url: '/api/v1/live/stop',
        method: 'post',
        data
    })
}

export default {
    getGameList,
    startStreaming,
    stopStreaming
}
