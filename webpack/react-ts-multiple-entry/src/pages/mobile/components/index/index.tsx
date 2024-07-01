import * as React from 'react'
import cs from './index.module.scss' // 使用 .module.less 可以实现css的样式隔离
import Hello from 'src/components/Hello'
import InstallPwa from 'src/components/InstallPwa'
interface Props {
}
interface State {
}
export default (props: Props) => {
  return <div className={cs.wrapper}>
    <Hello title={'hello111'}></Hello>
    <InstallPwa></InstallPwa>
  </div>
}

