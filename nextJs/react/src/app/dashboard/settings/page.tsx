import Image from "next/image";
import css from "./page.module.css";

import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'settings',
}


export default () => {
  return <div className={css.wrapper}>
    this is settings
  </div>;
};
