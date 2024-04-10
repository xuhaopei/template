import React, { useEffect, useMemo, useContext, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import KeepAlive from "react-activation";
import { lazyWithPreload } from "react-lazy-with-preload"; // 预加载组件
// 配置webpackChunkName: "[name]" 这个有助于打包后的文件名称生成，没有这个，模块文件的名称默认取id。
const Preview = lazyWithPreload((/* webpackChunkName: "Preview" */ ) => import("@/pages/h5/views/Preview/index"));
const Login = lazyWithPreload((/* webpackChunkName: "Login" */ ) => import("@/pages/h5/views/Login/index"));


export const routesConfig = [
  {
    path: "/",
    redirect: "/preview",
  },
  {
    path: "/preview",
    component: Preview,
    preload: true,
    preloadLevel: 1,
    exact: true,
  },
  {
    path: "/login",
    component: Login,
    preload: true,
    preloadLevel: 2,
    exact: true,
  },
  // {
  //   path: "/Live",
  //   component: Live,
  //   preload: true,
  //   exact: true,
  //   children: [
  //     {
  //       index: true,
  //       path: "Ready",
  //       component: LiveReady,
  //       preload: true,
  //       pageLevel: 1,
  //       keep: true
  //     },
  //     {
  //       path: "Doing",
  //       component: LiveDoing,
  //     },
  //   ],
  // },
];

const renderComponentHasKeepAlive = (route) => {
  const { component: Component, keep, path } = route;
  return keep ? (
    <KeepAlive cacheKey={path} name={path} saveScrollPosition="screen">
      <Component />
    </KeepAlive>
  ) : (
    <Component />
  );
};
const RenderRoutes = () => {
  const renderRoutes = useMemo(() => {
    const getRoutes = (routes) => {
      return routes.map((route) => {
        // redirect
        if (route.redirect) {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<Navigate to={route.redirect} replace />}
            />
          );
        }
        // 路由是否有子路由
        if (route.children) {
          const defaultIndex = route.children.find((item) => item.index);
          return (
            <Route
              key={route.path}
              path={route.path}
              element={renderComponentHasKeepAlive(route)}
            >
              {defaultIndex ? (
                <Route
                  path=""
                  element={<Navigate to={defaultIndex.path} replace />}
                />
              ) : null}
              {getRoutes(route.children)}
            </Route>
          );
        } else {
          return (
            <Route
              path={route.path}
              key={route.path}
              element={renderComponentHasKeepAlive(route)}
            />
          );
        }
      });
    };
    return getRoutes(routesConfig);
  }, []);

  const needPreloadRouters = useCallback(() => {
    // 将树结构变成一维数组
    let preloadRouters = [];
    const getRouters = (routes) => {
      routes.forEach((route) => {
        if (route.preload) {
          preloadRouters.push(route);
        }
        if (route.children) {
          getRouters(route.children);
        }
      });
    };
    getRouters(routesConfig);
    // 根据preloadLevel排序
    preloadRouters.sort((a, b) => {
      return a?.preloadLevel - b?.preloadLevel;
    });
    // 每间隔500毫秒执行一次组件的预加载
    preloadRouters.forEach((router, index) => {
      setTimeout(() => {
        console.log('preload router: ' + index, router?.path)
        router?.component?.preload();
      }, 500 * index);
    });
  }, []);
  useEffect(() => {
    needPreloadRouters()
  }, [needPreloadRouters])
  return <Routes>{renderRoutes}</Routes>;
};

export default RenderRoutes;
