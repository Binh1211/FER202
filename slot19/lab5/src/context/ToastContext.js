import React, { createContext, useReducer, useCallback } from "react";
import { toastReducer, initialToastState } from "../reducers/toastReducer";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toastState, dispatch] = useReducer(toastReducer, initialToastState);

  const showToast = useCallback((message, type = "success") => {
    dispatch({ type: "SHOW_TOAST", payload: { message, type } });
  }, []);

  const hideToast = useCallback(() => {
    dispatch({ type: "HIDE_TOAST" });
  }, []);

  return (
    <ToastContext.Provider value={{ toastState, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
};
