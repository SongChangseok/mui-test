import React, { createContext, useContext, useState } from "react";
import recipesData from "./recipes.json";

const ContextTest = createContext();

export const useContextTest = () => useContext(ContextTest);

export const ContextProviderTest = ({ children }) => {
  const [data, setData] = useState(recipesData);
  const addData = ({ name, ingredients, steps }) =>
    setData([...data, { name, ingredients, steps }]);
  const removeData = (name) =>
    setData(data.filter((recipe) => recipe.name !== name));

  return (
    <ContextTest.Provider value={{ data, addData, removeData }}>
      {children}
    </ContextTest.Provider>
  );
};
