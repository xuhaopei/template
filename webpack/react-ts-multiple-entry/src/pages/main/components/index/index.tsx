import * as React from 'react'
import cs from './index.module.less' // 使用 .module.less 可以实现css的样式隔离
import Hello from '@/components/Hello'
interface Props {
}
interface State {
}
export default (props: Props) => {
  return <div className={cs.wrapper}>
    <Hello title={'hello11'}></Hello>
  </div>
}

