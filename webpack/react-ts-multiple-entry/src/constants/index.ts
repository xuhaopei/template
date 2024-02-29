
// 账户类型
export const ACCOUNT_TYPE_USER = 1
export const ACCOUNT_TYPE_ANCHOR = 2
export const ACCOUNT_TYPE_VISITOR = 3

// 网站的域名
export const HOST_ONLINE = `www.hlive.mx`
export const HOST_TEST = `testwww.hlive.mx`
export const HOST_CURR = window.location.hostname
// 接口的域名
export const API_ONLINE = `service.hotlive.mx`
export const API_TEST = `testservice.hotlive.mx`

export const CV = 'HLIVE1.0.00_Web'

// 网站的心跳行为
export const HEARTBEAT_ACTION = {
    backend: 1,
    frontend: 2,
    backToFront: 3,
    frontToBack: 4,
    openApp: 5,
    closeApp: 6,
}

// 消息类型
export const EVENT_TYPE = {
    normal: 'normal', // 用户说话
    room_in: 'room_in', // 用户加入房间
    room_out: 'room_out', // 用户离开房间
    gift: 'gift', // 用户送礼的消息
    admin: 'normal_v2', // 后台管理人员发送警告
    userlist_update: 'userlist_update', // 房间列表更新
}

// 网站语言
let language = navigator.language
if (language.indexOf('zh') >= 0) {
    language = 'zh_CN'
} 
else if (language.indexOf('es') >= 0) {
    language = 'es'
} 
else if (language.indexOf('en') >= 0) {
    language = 'en'
}
else {
    language = 'en'
}
export const LANGUAGE = language