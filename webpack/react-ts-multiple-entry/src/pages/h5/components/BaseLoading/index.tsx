import React from 'react'
import { createPortal } from 'react-dom'
import cs from './index.module.less'
import cx from 'classnames'
import loading from 'src/assets/imgs/loading.png'

const Loading = ({ wrapperClassName, contentClassName }) => {
  return <div className={cx(cs.wrapper, wrapperClassName)}>
    <div className={cx(cs.content, contentClassName)}>
      <img src={loading} />
    </div>
  </div>
}
export default ({ isInBody = true, wrapperClassName = '', contentClassName = '' }) => {
  if (isInBody) {
    return createPortal(
      <Loading wrapperClassName={wrapperClassName} contentClassName={contentClassName}></Loading>,
      document.body,
    )
  } else {
    return <Loading wrapperClassName={wrapperClassName} contentClassName={contentClassName}></Loading>
  }
}
