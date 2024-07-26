
import Link from 'next/link'
import cs from './page.module.css'

import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'hello',
}

export default () => {
  return <div className={cs.wrapper}>
    <Link href="/dashboard">Dashboard</Link>
  </div>
}