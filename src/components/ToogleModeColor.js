import { ReactComponent as LightToogleIco } from "../assets/images/lightToogle.svg";
import { ReactComponent as DarkToogleIco } from "../assets/images/darkToogle.svg";
import { useContext, useEffect } from "react";
import { AppContext } from "../store/AppContext";

function ToogleModeColor() {
  const { colorMode, setColorMode } = useContext(AppContext);

  useEffect(() => {
    // reset html data-bs-theme
    document.documentElement.setAttribute("data-bs-theme", colorMode);
  }, [colorMode]);

  return (
    <>
      {console.log("color mode >>> ", colorMode)}
      <div className="ms-1 colorModeToogle">
        <button
          type="button"
          className="d-flex justify-content-center align-items-center colorModeToogleBtn"
          onClick={() => setColorMode(colorMode === "light" ? "dark" : "light")}
          title="Switch between dark and light mode"
        >
          {colorMode === "dark" ? <LightToogleIco /> : <DarkToogleIco />}
        </button>
      </div>
    </>
  );
}

export default ToogleModeColor;
