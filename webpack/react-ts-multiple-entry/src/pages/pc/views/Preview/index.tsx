import React, { useContext, useEffect } from "react";
import cs from "./index.module.less";
import { useTranslation } from "react-i18next";
import { useNavigate, NavLink } from "react-router-dom";
export default () => {
  const { t } = useTranslation();
  return <div className={cs.wrapper}>
    <p>{t("welcome")}</p>
    <p>自定义多页面路由</p>
    <p>这是preivew页面</p>
    <NavLink to={'Login'}>前往Login页面</NavLink>
  </div>;
};
