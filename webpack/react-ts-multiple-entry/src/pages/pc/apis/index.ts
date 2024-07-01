import axios from 'axios'
// import { message as Message } from 'antd';
import { query } from 'src/util';
import {
    CV,
    HOST_ONLINE,
    HOST_TEST,
    HOST_CURR,
    API_ONLINE,
    API_TEST,
} from 'src/constants/index'
// 接口的域名：
const domain = {
    [HOST_TEST]: `https://${API_TEST}`,
    [HOST_ONLINE]: `https://${API_ONLINE}`,
}
const instance = axios.create({
    baseURL: domain[HOST_CURR] || '',
    timeout: 15000,
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 基本的原子参数
    const baseAtom = {
        cv: CV,
        sid: '',
        uid: '',
    }
    try {
        const loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
        baseAtom.sid = loginInfo.sid
        // baseAtom.uid = '123'
        baseAtom.uid = loginInfo.uid
    } catch (error) {

    }
    // 在发送请求之前做些什么
    config.params = {
        ...baseAtom,
        ...query,
        ...config.params
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let { code, message } = response.data
    if (code != 0) {
        // Message.error(message)
        if (code === 505) {
            localStorage.setItem("loginInfo", JSON.stringify({}));
            setTimeout(() => {
                window.location.href = `${window.location.origin}/pages/pc/index.html${window.location.search}`;
            }, 1500);
            return
        }
        return Promise.reject(response.data);
    }
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance