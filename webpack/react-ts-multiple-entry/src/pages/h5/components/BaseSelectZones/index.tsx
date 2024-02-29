import * as React from "react";
import cs from "./index.module.less"; // 使用 .module.less 可以实现css的样式隔离
import { Button, Dropdown, } from 'antd';
import { useTranslation } from "react-i18next";
interface Props {
}
interface State {}
export default (props: Props) => {
  const { t } = useTranslation();
  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
  ];
  return (
    <div className={cs.wrapper}>
      <div className={cs.logo}>
        <img src="" alt="" />
        {t('app.name')}
      </div>
      <Dropdown menu={{ items }} placement="bottomLeft">
        <Button>login</Button>
      </Dropdown>
    </div>
  );
};
