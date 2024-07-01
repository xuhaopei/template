import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import cs from "./index.module.less";
import cx from "classnames";
import { useTranslation } from "react-i18next";
import phoneLimit from "src/constants/phoneLimit";
import BaseSelectZones from "../BaseSelectZones";
import ApiUser from "src/pages/pc/apis/user";
import {
  Context,
  accountLogin,
  accountLoginByThird,
  setIsShowLogin,
  setIsShowLoading,
} from "src/pages/pc/store";
import iconGoogle from "src/assets/imgs/icon_google.png";
import iconHotlive from "src/assets/imgs/icon_live.png";
import btnCloseLogin from "src/assets/imgs/btn_close_login.png";
import { googleLogin } from "src/util/index";
import { message } from "antd";
import iconTitle from "src/assets/imgs/icon_title.png";
import { Select, Space } from "antd";
let timer: number;
export default () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { dispatch, state } = useContext(Context);
  const [zone, setZone] = useState({ label: "México +52", value: "+52" });
  const [phone, setPhone] = useState("");
  const inputPhoneEle = useRef(null);
  const inputCodeEle = useRef(null);
  const [code, setCode] = useState("");
  const [restTime, setRestTime] = useState(60);
  const googleBtnRef = useRef(null);
  const canClose = useRef(true);
  const icon = useRef(iconHotlive);
  const [messageApi, contextHolder] = message.useMessage();

  const [zoneList, setZoneList] = useState([{ label: "México +52", value: "+52" }]);

  const getZoneList = useCallback(async () => {
    let { data } = await ApiUser.region_list({ type: 1 });
    let list = [];
    data.list.forEach((item) => {
      list.push({
        value: `+${item.code}`,
        label: `${item.name} +${item.code}`,
      });
    });
    setZoneList(list);
  }, []);
  const handleLoginByPhone = async () => {
    dispatch(setIsShowLoading(true));
    let errcode = 0;
    let errmsg = "";
    let is_new = -1;
    try {
      let { data } = await dispatch(
        accountLogin({
          account_type: 2,
          nation_code: zone.value?.replace("+", ""),
          phone: zone.value?.replace("+", "") + phone,
          code: code,
        })
      );
      is_new = data.is_new ? 1 : 0;
      dispatch(setIsShowLogin(false));
    } catch (error) {
      errcode = -1;
      errmsg = error?.message;
    }
    dispatch(setIsShowLoading(false));
  };
  const handleLoginByGoogle = useCallback(
    async (token: string) => {
      dispatch(setIsShowLoading(true));
      let errcode = 0;
      let errmsg = "";
      let is_new = -1;
      try {
        let { data } = await dispatch(
          accountLoginByThird({
            token,
            platform: "google",
            account_type: 2,
          })
        );
        is_new = data.is_new ? 1 : 0;
        dispatch(setIsShowLogin(false));
      } catch (error) {
        errcode = -1;
        errmsg = error?.message;
      }
      dispatch(setIsShowLoading(false));
    },
    [dispatch]
  );
  const onHandleGetCode = async () => {
    if (restTime !== 60) return;
    if (!phone) {
      messageApi.error(t("coms.pleaseInputPhone"));
      return;
    }
    await ApiUser.sms_send({
      phone: zone.value?.replace("+", "") + phone,
      nation_code: zone.value?.replace("+", ""),
      action: 0,
    });
    setRestTime((preValue) => preValue - 1);
    timer = window.setInterval(() => {
      if (restTime <= 0) {
        setRestTime(60);
        window.clearInterval(timer);
        return
      }
      setRestTime((preValue) => preValue - 1);
    }, 1000);
  };
  const onHandleChangeCode = (event) => {
    let val = event.target.value;
    if (val) {
      val = val.replace(/\D/g, "");
    }
    setCode(val);
  };
  const onHandleChangePhone = (event) => {
    let val = event.target.value;
    if (val) {
      val = val.replace(/\D/g, "");
    }
    setPhone(val);
  };
  const onSelectZone = (data) => {
    setZone({
      label: "",
      value: data,
    });
    // setZone(data)
  };
  const handleClose = () => {
    if (canClose.current) {
      dispatch(setIsShowLogin(false));
    }
  };
  // the login will close when user switch inputEle but it click the mask.
  const handleSetClose = () => {
    setTimeout(() => {
      canClose.current = true;
    }, 300);
  };

  useEffect(() => {
    if (restTime <= 0) {
      setRestTime(60);
      clearInterval(timer);
    }
  }, [restTime]);
  useEffect(() => {
    googleLogin((response) => {
      handleLoginByGoogle(response.credential);
    }, googleBtnRef.current);
  }, [handleLoginByGoogle]);

  useEffect(() => {
    const style = document.body.getAttribute("style") || "";
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";
    return () => {
      document.body.setAttribute("style", style);
    };
  }, []);

  useEffect(() => {
    getZoneList();
  }, [getZoneList]);
  return createPortal(
    <div className={cx(cs.wrapper)}>
      <div className={cs.closeZone} onClick={handleClose}></div>
      <div className={cs.content}>
        <img
          className={cs.btn_close}
          src={btnCloseLogin}
          alt=""
          onClick={handleClose}
        />
        <img className={cs.half_circle} src={iconTitle} alt="" />
        <img className={cs.icon} src={icon.current} alt="" />
        <div className={cx(cs.item)}>
          <Select
            defaultValue={zone.value}
            className={cs.inputPhone_left}
            onChange={onSelectZone}
            options={zoneList}
          />
          <div className={cs.inputPhone_line}></div>
          <input
            className={cs.inputPhone_right}
            value={phone}
            onChange={onHandleChangePhone}
            placeholder={t("login.input_phone")}
            ref={inputPhoneEle}
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
            maxLength={phoneLimit[zone.value] || 20}
            onFocus={() => {
              canClose.current = false;
            }}
            onBlur={handleSetClose}
          />
        </div>
        <div className={cx(cs.item)}>
          <input
            className={cs.inputCode_input}
            value={code}
            onChange={onHandleChangeCode}
            placeholder={t("login.input_code")}
            ref={inputCodeEle}
            type="text"
            maxLength={6}
            onFocus={() => {
              canClose.current = false;
            }}
            onBlur={handleSetClose}
          />
          {restTime < 60 && (
            <div className={cs.inputCode_btn_restTime}>
              {restTime}
              {t("login.btnTextRestTime")}
            </div>
          )}
          {restTime === 60 && (
            <div className={cs.inputCode_btn_get} onClick={onHandleGetCode}>
              {t("login.sms")}
            </div>
          )}
        </div>
        <div
          className={cx(cs.btn_login, {
            [cs.btn_login_gray]: !code || !phone,
          })}
          onClick={handleLoginByPhone}
        >
          {t("login.btn_login")}
        </div>
        <div className={cs.btn_login_google}>
          <img src={iconGoogle} alt="" />
          Google
          <div className={cs.btn_google_render} ref={googleBtnRef}></div>
        </div>
      </div>
    </div>,
    document.body
  );
};
