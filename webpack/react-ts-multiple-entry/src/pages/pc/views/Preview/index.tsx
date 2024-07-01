import React, { useContext, useEffect } from "react";
import cs from "./index.module.less";
import { useTranslation } from "react-i18next";
import useNavigate from "src/hooks/useNavigate";
export default () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return <div className={cs.wrapper}>
    <p>{t("welcome")}</p>
    <p>自定义多页面路由</p>
    <p>这是preivew页面</p>
    <div style={{color: 'blue', textDecoration: 'undelind'}} onClick={() => navigate('Login')}>点击此处前往Login页面</div>
  </div>;
};
