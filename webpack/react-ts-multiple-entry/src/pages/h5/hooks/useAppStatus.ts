import React, { useState, useEffect } from 'react'
import { HEARTBEAT_ACTION } from 'src/constants'

const useAppStatus = () => {
  const [appStatus, setAppStatus] = useState(HEARTBEAT_ACTION.openApp)

  // h5就没有后台心跳一说，切换到后台定时器是不会工作的。
  useEffect(() => {
    setAppStatus(HEARTBEAT_ACTION.openApp)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setAppStatus(HEARTBEAT_ACTION.backToFront)
      } else if (document.visibilityState === 'hidden') {
        setAppStatus(HEARTBEAT_ACTION.frontToBack)
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      setAppStatus(HEARTBEAT_ACTION.closeApp)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return { appStatus }
}

export default useAppStatus
