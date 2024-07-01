// https://reactrouter.com/en/main/routers/create-hash-router 官网学习地址
// https://www.npmjs.com/package/react-lazy-with-preload 官网学习地址
import React, { useEffect, useMemo, useContext, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  createHashRouter,
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from "react-router-dom";
import App from "../app";
import { lazyWithPreload, PreloadableComponent } from "react-lazy-with-preload"; // 预加载组件
// 配置webpackChunkName: "[name]" 这个有助于打包后的文件名称生成，没有这个，模块文件的名称默认取id。
const Preview = lazyWithPreload(
  (/* webpackChunkName: "Preview" */) =>
    import("src/pages/pc/views/Preview/index")
);
const Login = lazyWithPreload(
  (/* webpackChunkName: "Login" */) => import("src/pages/pc/views/Login/index")
);

type ExtendsRouteObject = RouteObject & {
  children?: ExtendsRouteObject[];
  preloadlevel?: number;
};
const routerList: Array<ExtendsRouteObject> = [
  {
    path: "/",
    element: <App />,
    errorElement: null,
    children: [
      {
        index: true,
        element: <Preview />,
      },
      {
        path: "Preview",
        element: <Preview />,
        preloadlevel: 1,
        children: [],
      },
      {
        path: "Login",
        element: <Login />,
        preloadlevel: 2,
        children: [],
      },
    ],
  },
];

// 预加载组件
(() => {
  let listElemens: Array<{
    element: PreloadableComponent<() => JSX.Element>;
    preloadlevel: number;
  }> = [];
  // 获取能够预加载的元素
  const getList = (list: Array<any>) => {
    list.forEach((router) => {
      // 注意，调用preload只能是函数，不能是组件，所以这里要取type
      if (router.element?.type?.preload) {
        listElemens.push({
          element: router.element.type as PreloadableComponent<
            () => JSX.Element
          >,
          preloadlevel: router?.preloadlevel || 999,
        });
      }
      if (router.children) {
        getList(router.children);
      }
    });
  };
  getList(routerList);
  listElemens = listElemens.sort(
    (router1, router2) => router1.preloadlevel - router2.preloadlevel
  );
  listElemens.map((item, index) => {
    setTimeout(() => {
      item.element?.preload();
    }, index * 1000);
  });
})();
export default <RouterProvider router={createBrowserRouter(routerList)} />;
