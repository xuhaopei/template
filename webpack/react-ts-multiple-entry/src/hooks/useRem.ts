import React, {
    useEffect,
} from "react";
// 动态计算rem
export default (desginW = 1920) => {
    useEffect(() => {
        const changeSize = () => {
            const innerWidth = window.innerWidth;
            const minimum = 1534; // pc最低宽度要求

            let pcWidth = innerWidth < minimum ? minimum : innerWidth;
            if (innerWidth < minimum) {
                pcWidth = minimum;
            } else if (innerWidth > 1920) {
                pcWidth = 1920;
            } else {
                pcWidth = innerWidth;
            }
            console.log("desginW", desginW);
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