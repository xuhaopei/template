import React, { useContext, useEffect } from "react";
import cs from "./index.module.less";
import { useTranslation } from "react-i18next";
export default () => {
  const { t } = useTranslation();
  return <div className={cs.wrapper}>
    <p>登录页面</p>
  </div>;
};
