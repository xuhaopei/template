import * as React from "react";
import cs from "./index.module.less"; // 使用 .module.less 可以实现css的样式隔离
import BaseHeader from "../BaseHeader";
interface Props {
  children: React.ReactNode;
}
interface State {}
export default (props: Props) => {
  return (
    <div className={cs.wrapper}>
      <BaseHeader></BaseHeader>
      <div className={cs.content}>{props.children}</div>
    </div>
  );
};
