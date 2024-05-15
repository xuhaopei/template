import React, {
  Suspense,
  useEffect,
  useRef,
  lazy,
  useState,
  useCallback,
} from "react";
import { HashRouter } from "react-router-dom";
import cs from "./app.module.less";
import reducer, { Context, initialState, setUserInfo } from "./store";
import useEnhancedReducer from "./store/useEnhancedReducer";
import AllRouters from "./router";
import BaseLoading from "./components/BaseLoading";
import { StoreState } from "@/pages/h5/types";
import useRem from "@/hooks/useRem";
const App = () => {
  useRem(1920);
  const [isInit, setIsInit] = useState(false);
  const [state, dispatch] = useEnhancedReducer(reducer, initialState);
  const { isShowLoading } =
    state as StoreState;
  useEffect(() => {
    setIsInit(true)
  }, []);
  return (
    <div className={cs.wrapper}>
      <Context.Provider value={{ state, dispatch }}>
        {isInit && (
          <HashRouter>
            <Suspense fallback={null}>
              <AllRouters />
            </Suspense>
          </HashRouter>
        )}
        {isShowLoading && <BaseLoading></BaseLoading>}
      </Context.Provider>
    </div>
  );
};

export default App;
