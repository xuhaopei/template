import { Query } from "src/types"

// 获取url上的原子参数
export const getQuery = (): Query => {
  const query: Query = {}
  window.location.search.substring(1).split("&").forEach((item) => {
    let [key, value] = item.split('=')
    query[key] = value
  })

  return query
}
export const query = getQuery()

// 根据原子参数判断来源
export const getFrom = () => {
  if (query['cv']?.indexOf('_Android') >= 0) {
    return 'Android'
  }
  else if (query['cv']?.indexOf('_Web') >= 0) {
    return 'Web'
  }
  else {
    return new Error('get from error, cv is' + query['cv'])
  }
}

// 获取当前平台， 比如 ua.android // true || false
export const ua = (function () {
  const regs = {
    android: /android/i,
    iphone: /iphone/i,
    ipad: /ipad/i,
    ipod: /ipod/i,
    weixin: /micromessenger/i,
    mqq: /QQ\//i,
    alipay: /aliapp/i,
    weibo: /weibo/i,
    dingtalk: /dingtalk/i,
    chrome: /chrome\//i,
  }

  const ret: any = {}
  Object.keys(regs).forEach(key => {
    var reg = regs[key]
    ret[key] = reg.test(navigator.userAgent)
  })

  ret.ios = ret.iphone || ret.ipad || ret.ipod
  ret.mobile = ret.ios || ret.android
  ret.pc = !ret.mobile

  return ret
})()