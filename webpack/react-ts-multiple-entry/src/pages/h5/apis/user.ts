import instance from './index'
const getUserInfo = (data) => {
    return instance.request({
        url: '/api/v1/game/pin_message',
        method: 'get',
        params: data
    })
}

// 发送短信验证码-登录/换绑手机 https://yapi.inkept.cn/project/3278/interface/api/31065
export function sms_send(params: any): Promise<any> {
    return instance.request({
        url: '/api/v1/user/account/sms/send',
        method: 'POST',
        data: params
    })
}
// 账号登录 https://yapi.inkept.cn/project/3278/interface/api/31061
export function account_login(params: any): Promise<any> {
    return instance.request({
        url: '/api/v1/user/account/login',
        method: 'POST',
        data: params
    })
}


// 第三方登录 https://yapi.inkept.cn/project/3278/interface/api/32630
export function third_party_login(params: any): Promise<any> {
    return instance.request({
        url: '/api/v1/user/account/third_party/login',
        method: 'POST',
        data: params
    })
}

// 获取地区列表 https://yapi.inkept.cn/project/3278/interface/api/32669
export function region_list(params: any): Promise<any> {
    return instance.request({
        url: '/api/v1/user/region/list',
        method: 'GET',
        params
    })
}

// 账号退出登录 https://yapi.inkept.cn/project/3278/interface/api/32670
export function account_logout(params: any): Promise<any> {
    return instance.request({
        url: '/api/v1/user/account/logout',
        method: 'POST',
        data: params
    })
}

// 获取本人信息 getmyself https://yapi.inkept.cn/project/3278/interface/api/31063
export function info_self(params: any): Promise<any> {
    return instance.request({
        url: '/api/v1/user/account/info/self',
        method: 'GET',
        params
    })
}

// 心跳上报接口 https://yapi.inkept.cn/project/3278/interface/api/32024
export function heartbeat_upload(params: any): Promise<any> {
    return instance.request({
        url: '/api/v1/user/heartbeat/upload',
        method: 'GET',
        params
    })
}


// 直播间心跳上报 https://yapi.inkept.cn/project/3284/interface/api/31191
export function live_heartbeat(params: any): Promise<any> {
    return instance.request({
        url: '/api/v1/live/heartbeat',
        method: 'POST',
        data: params
    })
}


export default {
    getUserInfo,
    sms_send,
    account_login,
    third_party_login,
    region_list,
    account_logout,
    info_self,
    heartbeat_upload
}