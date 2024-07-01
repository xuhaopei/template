import * as React from "react";
import cs from "./index.module.scss"; // 使用 .module.less 可以实现css的样式隔离
import { ua } from "src/util";

interface Props {
  title: string;
}
interface State {}
export default () => {
  const handleClick = async () => {
    if (!window.deferredPrompt) return
    window.deferredPrompt.prompt();
    // Find out whether the user confirmed the installation or not
    const { outcome } = await window.deferredPrompt.userChoice;
    // Act on the user's choice
    if (outcome === "accepted") {
      console.log("User accepted the install prompt.");
    } else if (outcome === "dismissed") {
      console.log("User dismissed the install prompt");
    }
  };

  React.useEffect
  return (
    <div className={cs.wrapper}>
      <button onClick={handleClick}>安装pwa</button>
    </div>
  );
};
