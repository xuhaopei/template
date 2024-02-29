import React, { useEffect, useMemo, useContext, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import KeepAlive from "react-activation";
import { lazyWithPreload } from "react-lazy-with-preload"; // 预加载组件
const Preview = lazyWithPreload(() => import("@/pages/h5/views/Preview/index"));
const Login = lazyWithPreload(() => import("@/pages/h5/views/Login/index"));

/**
 * routes config
 * The atomic configuration is as follows:
 * path: String,page routing
 * ToDo：
 * allowGuest: Boolean, is allowed guest
 * exact: Boolean, default true, Is it an exact match
 * lazy: Boolean, default true, Whether lazy loading
 * keep: Boolean, default false, Whether to keep the page status, currently there are only four bottom tab pages, that is, four first-level pages remain permanent, too many will affect page performance
 * preload: Boolean.default false, Whether to preload (for routing-level pages), currently four pairs of first-level pages, and some top-level top-level pages (such as event details, recharge) pages are preloaded
 * prerender: Boolean, default false, Whether to pre-render, pre-rendering has a great impact on page performance, temporarily only used for the first-level tab page
 * pageLevel: Number, Page level (primary, secondary...page). How to define page level? The bottom four tab pages are the first level, and the remaining page level = the first level page level + the shortest steps required to enter this page from the first level page
 * pagePriority: Number, Page priority, 1 is the highest priority, and it will be postponed later. For example, the login and recharge pages have the highest priority among all secondary pages.
 */
export const routesConfig = [
  {
    path: "/",
    redirect: "/preview",
    allowGuest: true,
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
