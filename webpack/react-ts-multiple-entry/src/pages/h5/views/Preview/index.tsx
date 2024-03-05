import React, { useContext, useEffect } from "react";
import cs from "./index.module.less";
import { useTranslation } from "react-i18next";
import { Context, setIsAtGamePage } from "@/pages/h5/store";
import { StoreContext } from "@/pages/h5/types";
import { useNavigate } from "react-router-dom";
import BaseName from "../../components/BaseName";
export default () => {
  const { t } = useTranslation();
  return <div className={cs.wrapper}>
    <p>{t("welcome")}</p>
    <p>自定义多页面路由</p>
    <BaseName></BaseName>
  </div>;
};
