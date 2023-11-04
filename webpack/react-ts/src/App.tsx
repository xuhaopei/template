import * as React from 'react'
import cs from './index.module.less' // 使用 .module.less 可以实现css的样式隔离
interface Props {
}
interface State {
}
export default (props:Props) => {
  return <div className={cs.hello}>hello</div>
}

