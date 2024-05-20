import * as React from "react";
import cs from "./index.module.less"; // 使用 .module.less 可以实现css的样式隔离
import cx from 'classnames'
import { BaseProps } from 'src/pages/pc/types/index.d'
import { Avatar, Button, Dropdown, Flex, Space } from "antd";
import { useTranslation } from "react-i18next";
interface Props extends BaseProps{
}
interface State {}
export default (props: Props) => {
  const { t } = useTranslation();
  const onHandleToGame = () => {
    let { origin, pathname, search} = window.location
    window.open(`${origin + pathname + search}#/Games`)
  }
  return (
    <div className={cx(cs.wrapper, props.className)} onClick={onHandleToGame}>
      <div className={cs.gameIcon}></div>
      <Button  type={'link'} size={'large'} style={{padding: '4px'}}>
          {t('game_hall.lobby')}
      </Button>
    </div>
  );
};
