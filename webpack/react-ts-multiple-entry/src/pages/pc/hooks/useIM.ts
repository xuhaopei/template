import React, { useCallback, useEffect, useRef, useState } from 'react'
import { setImMsg } from 'src/pages/pc/store/index'
import IMInstance from 'src/util/IM'
import { message as Message } from 'antd';
const msgQueue = []
export default function (dispatch) {
  const timer = useRef(0)
  // 这里的目的是为了避免多条同步的msg消息，导致旧消息被store覆盖。
  const lazySetImMsg = useCallback(() => {
    clearTimeout(timer.current)

    timer.current = window.setTimeout(() => {
      if (msgQueue.length === 0) return
      let msg = msgQueue.shift()
      dispatch(setImMsg(msg))
      lazySetImMsg()
    }, 100);
  }, [dispatch])
  const onCustomMsg = useCallback(
    res => {
      try {
        let msg = JSON.parse(res.payload.data)
        if (msg.source === 'live') {
          msgQueue.push(msg)
          console.log('im msg', msg)
        }
      } catch (error) {
        console.log('Failed to parse IM data', error)
      }
      lazySetImMsg()
    },
    [lazySetImMsg],
  )
  const loginIM = useCallback(async () => {
    try {
      let loginInfo = localStorage.getItem('loginInfo')
      const curloginInfo = JSON.parse(loginInfo)
      try {
        await IMInstance.logout()
      } catch (error) {
        //
      }
      await IMInstance.login({
        userID: curloginInfo.uid.toString(),
        userSig: curloginInfo.im_token,
      })
      console.log('im login success')
      IMInstance.offAllCustomMsg()
      IMInstance.onCustomMsg(onCustomMsg)
    } catch (error) {
      Message.error('im login failure: ' + error.toString())
    }
    return () => {
      IMInstance.offCustomMsg(onCustomMsg)
    }
  }, [onCustomMsg])
  return {
    loginIM,
  }
}
