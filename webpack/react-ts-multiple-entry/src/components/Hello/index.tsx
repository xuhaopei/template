import * as React from "react";
import cs from "./index.module.scss"; // 使用 .module.less 可以实现css的样式隔离
import jpg from "@/assets/imgs/1.jpg";
interface Props {
  title: string;
}
interface State {}
export default (props: Props) => {
  const [list, setList] = React.useState([]);
  const handleAddImg = () => {
    setList([...list, jpg]);
  };
  return (
    <div className={cs.hello}>
      {props.title}
      <button onClick={handleAddImg}>add</button>
      {list.map((url, index) => (
        <img src={url} key={index} alt="" />
      ))}
    </div>
  );
};
