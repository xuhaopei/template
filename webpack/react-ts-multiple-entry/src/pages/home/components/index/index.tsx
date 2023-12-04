import * as React from 'react'
import cs from './index.module.less' // 使用 .module.less 可以实现css的样式隔离
import Hello from '@/components/Hello'
import api from '@/pages/home/apis/user'
interface Props {
}
interface State {
}
export default (props: Props) => {
  const getUser = () => {
    api.getUserInfo({})
  }
  return <div className={cs.wrapper} onClick={getUser}>
    <Hello title={'home'}></Hello>
  </div>
}

