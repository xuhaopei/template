'use client'

import css from "./page.module.css";
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { useEffect } from "react";


export default () => {

  const pathname = usePathname()

  useEffect(() => {
    console.log('pathname', pathname)
  }, [])
  return <div className={css.wrapper}>
    this is dashborad
    
    <Link href="/dashboard/settings">settings</Link>
  </div>;
};
