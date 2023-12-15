import axios from 'axios'
import { query } from '@/util';
import {
    HOST_ONLINE,
    HOST_TEST,
    HOST_DEV,
    HOST_CURR,
    SERVICE_ONLINE,
    SERVICE_TEST,
    SERVICE_DEV
} from '@/constants';
import { Toast } from 'antd-mobile'
const baseURLMap = {
    [HOST_DEV]: SERVICE_DEV,
    [HOST_TEST]: SERVICE_TEST,
    [HOST_ONLINE]: SERVICE_ONLINE,
}
const instance = axios.create({
    baseURL: process.env.domain ? `` : `${baseURLMap[HOST_CURR]}`,
    timeout: 15000,
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.params = {
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
    if (response.data.code != 0) {
        Toast.show(response.data.message)
    }
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance