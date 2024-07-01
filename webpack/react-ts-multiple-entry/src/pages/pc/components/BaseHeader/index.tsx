import React, { useEffect, useMemo } from "react";
import cs from "./index.module.less"; // 使用 .module.less 可以实现css的样式隔离
import { Avatar, Button, Dropdown, Flex, Space } from "antd";
import { useTranslation } from "react-i18next";
import AppIcon from "src/assets/imgs/icon_live.png";
import GameIcon from "src/assets/imgs/icon_game.png";
import { useContext } from "react";
import {
  Context,
  setIsShowLogin,
} from "src/pages/pc/store";
import { StoreContext } from "../../types";
import ApiUser from "src/pages/pc/apis/user";
import cx from 'classnames'
interface Props {}
export default (props: Props) => {
  const { t } = useTranslation();
  const { dispatch, state } = useContext<StoreContext>(Context);
  const { userInfo, isAtGamePage } = state;
  const handleLogout = async () => {
    await ApiUser.account_logout({})
    localStorage.setItem("loginInfo", JSON.stringify({}));
    window.location.href = `${window.location.origin}/pages/pc/index.html${window.location.search}`;
  };
  const items = [
    {
      key: "1",
      label: <div onClick={handleLogout}>{t("logout")}</div>,
    },
  ];
  const rednerLogin = useMemo(() => {
    if (userInfo?.nickname) {
      return (
        <Dropdown menu={{ items }} placement="bottomLeft">
          <div className={cs.right}>
            <Avatar size="large" src={<img src={userInfo.avatar} alt="" />} />
            <span style={{marginLeft: '10px'}}>
              <p>{userInfo.nickname}</p>
              {
                !isAtGamePage && <p>id:{userInfo.uid}</p>
              }
            </span>
          </div>
        </Dropdown>
      );
    } else {
      return <Button className={cs.btnlogin} onClick={() => dispatch(setIsShowLogin(true))}>{t('login.btn_login')}</Button>;
    }
  }, [userInfo]);

  useEffect(() => {
    let link = document.getElementById('icon')
    let title = document.getElementsByTagName('title')[0]
    if (isAtGamePage) {
      link.setAttribute('href', GameIcon)
      title.innerText= 'Hotlive'
    } else {
      link.setAttribute('href', AppIcon)
      title.innerText= 'Live Messenger'
    }
  }, [isAtGamePage])
  return (
    <div className={cx(cs.wrapper, {[cs. gameWrapper]: isAtGamePage})}>
      <div className={cs.logo}>
        <img src={isAtGamePage ? GameIcon : AppIcon} alt="" />
        {isAtGamePage ? 'Hotlive' : 'Live Messenger'}
      </div>
      {rednerLogin}
    </div>
  );
};
