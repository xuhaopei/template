import React, {
  Suspense,
} from "react";
import { Outlet } from "react-router-dom";
import cs from "./app.module.less";
import reducer, { Context, initialState, setUserInfo } from "./store";
import useEnhancedReducer from "./store/useEnhancedReducer";
import useRem from "@/hooks/useRem";
const App = () => {
  useRem(1920, 800);
  const [state, dispatch] = useEnhancedReducer(reducer, initialState);
  return (
    <div className={cs.wrapper}>
      <Context.Provider value={{ state, dispatch }}>
        <Suspense fallback={null}>
          <Outlet></Outlet>
        </Suspense>
      </Context.Provider>
    </div>
  );
};

export default App;
