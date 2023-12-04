import * as React from 'react'
import cs from './index.module.less' // 使用 .module.less 可以实现css的样式隔离
import png from '@/assets/game.png'
import { getUserInfo } from '@/apis/user'
import Hello from '../Hello'
interface Props {
}
interface State {
}
export default (props:Props) => {
  const getData = () => {
    getUserInfo({a: 1})
  }
  return <div className={cs.wrapper} onClick={getData}>
    <img src={png} alt="" />
    <Hello></Hello>
  </div>
}

