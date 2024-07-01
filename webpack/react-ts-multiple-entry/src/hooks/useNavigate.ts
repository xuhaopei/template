import { createBrowserRouter, RouterProvider, Route, useNavigate, useLocation, NavigateOptions } from 'react-router-dom';

export default () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (pathname: string | number, options: NavigateOptions = {}) => {
        if (Number.isInteger(pathname)) {
            navigate(-1)
            return
        }
        // 获取当前的查询参数
        const searchParams = new URLSearchParams(location.search);
        // 判断url上是否有 ? 标识，如果有，则截取。
        let [originPathName, search] = pathname.toString().split('?')
        search = search ? search + '&' : ''
        // 导航到新路径并携带查询参数
        navigate({
            pathname: originPathName,
            search: search + searchParams.toString(),
        }, options);
    }
}