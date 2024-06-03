import React, {
    useEffect,
} from "react";
// 动态计算rem
export default (desginW = 1920, minimumDesginW = 300) => {
    console.log('desginW', 1920)
    console.log('minimumDesginW', minimumDesginW)
    useEffect(() => {
        const changeSize = () => {
            const innerWidth = window.innerWidth;

            let pcWidth = innerWidth < minimumDesginW ? minimumDesginW : innerWidth;
            if (innerWidth < minimumDesginW) {
                pcWidth = minimumDesginW;
            } else if (innerWidth > 1920) {
                pcWidth = 1920;
            } else {
                pcWidth = innerWidth;
            }
            const rem = pcWidth / desginW;
            document.documentElement.style.fontSize = `${rem}px`;
        };
        window.addEventListener("resize", changeSize, false);
        changeSize();
        return () => {
            window.removeEventListener("resize", changeSize, false);
        };
    }, []);
}