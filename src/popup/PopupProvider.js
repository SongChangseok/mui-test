import React, { createContext, useContext, useReducer } from "react";
import Popup from "./Popup";

const PopupContext = createContext();
export const usePopup = () => useContext(PopupContext);
export const PopupProvider = ({ children }) => {
  const [popup, setPopup] = useReducer(
    (popup, newPopup) => ({ ...popup, ...newPopup }),
    {
      type: "alert",
      open: false,
      title: "알림",
      message: "",
      onConfirm: null,
      onCancel: null,
    }
  );
  const openPopup = (paramters) => setPopup({ ...paramters, open: true });
  const closePopup = () => {
    console.log("onClose");
    setPopup({ open: false });
  };

  return (
    <PopupContext.Provider value={{ openPopup, closePopup }}>
      {children}
      <Popup {...popup} onClose={closePopup} />
    </PopupContext.Provider>
  );
};
