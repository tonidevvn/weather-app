import { createContext, useState } from "react";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [colorMode, setColorMode] = useState("light");

  return (
    <AppContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
