import { createContext, useMemo, useState } from "react";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [colorMode, setColorMode] = useState("light");
  const contextValue = useMemo(
    () => ({
      colorMode,
      setColorMode,
    }),
    [colorMode, setColorMode]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
