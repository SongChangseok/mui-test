import React, { createContext, useContext, useState } from "react";
import Alert from "../common/component/Alert";

const AlertContext = createContext();
export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    title: "알림",
    message: "",
  });
  const openAlert = ({ title = "알림", message = "" }) =>
    setAlert({ open: true, title, message });
  const closeAlert = () => setAlert({ ...alert, open: false });

  return (
    <AlertContext.Provider value={{ openAlert, closeAlert }}>
      {children}
      <Alert {...alert} onClose={closeAlert} />
    </AlertContext.Provider>
  );
};
