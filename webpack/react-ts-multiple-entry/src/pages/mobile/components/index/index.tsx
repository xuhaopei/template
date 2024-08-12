import * as React from 'react'
import cs from './index.module.scss' // 使用 .module.less 可以实现css的样式隔离
import Hello from 'src/components/Hello'
import InstallPwa from 'src/components/InstallPwa'

// 引入store相关
import { useSelector, useDispatch } from "react-redux";
import { syncActionSetUseInfo, asyncActionSetUserInfo } from 'src/pages/mobile/store'
interface Props {
}
interface State {
}
export default (props: Props) => {

  // 声明store相关
  const state = useSelector((states: any) => states.state) as any;
  const dispatch = useDispatch();
  const handleChangeSync = () => {
    dispatch(syncActionSetUseInfo({
      username: "hhhh"
    }))
  }
  const handleChangeASync = () => {
    dispatch(asyncActionSetUserInfo({
      username: "aaaa"
    }))

  }
  React.useEffect(() => {
    console.log('state', state)
  }, [state])

  const [data, setData] = React.useState('asd')

  React.useLayoutEffect(() => {
    setData('aaaaa')
  }, [])
  // React.useEffect(() => {
  //   setData('aaaaa')
  // }, [])
  return <div className={cs.wrapper}>
    <Hello title={'hello111'}></Hello>
    <InstallPwa></InstallPwa>
    <div onClick={handleChangeSync}>handleChangeSync</div>
    <div onClick={handleChangeASync}>handleChangeASync</div>
    <div>{data}</div>
  </div>
}

