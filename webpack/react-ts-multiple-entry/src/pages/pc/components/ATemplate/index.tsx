import * as React from 'react'
import cs from './index.module.less' // 使用 .module.less 可以实现css的样式隔离
import jpg from './imgs/1.jpg'
interface Props {
  title: string;
}
interface State {
}
export default (props:Props) => {
  return <div className={cs.hello}>{props.title}
    <img src={jpg} alt="" />
  </div>
}

