import { BackArrowSvg, MoonSvg, SunSvg } from "../Svg";
import { ScreenSize, getSystemThemePref } from "../App";
import { useContext, useEffect, useState } from "react";

export default function ColorTheme() {
  const screenSize = useContext(ScreenSize);
  if (screenSize >= 1440) {
    location.hash = "/settings";
  }
  
  const [theme, setTheme] = useState(localStorage.theme || getSystemThemePref());
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  function handleChange(e) {
    const changedTheme = e.target.value === "dark" ? "dark" : "light";
    setTheme(changedTheme);
    localStorage.theme = changedTheme;
  }
  
  return (
    <div className="color-theme-container">
      <button className="backBtn" onClick={() => (location.hash = "/settings")}>
        <BackArrowSvg />
        Settings
      </button>
      <h1 className="page-header">Color Theme</h1>
      <p className="page-description">Choose your color theme:</p>
      <ul className="radio-group">
        <li>
          <label>
            <figure>
              <SunSvg />
            </figure>
            <div className="theme-description">
              <h4>Light Mode</h4>
              <p>Pick a clean and classic light theme</p>
            </div>
            <input type="radio" name="theme" value={"light"} defaultChecked={theme === "light"} onChange={handleChange} />
          </label>
        </li>
        <li>
          <label>
            <figure>
              <MoonSvg />
            </figure>
            <div className="theme-description">
              <h4>Dark Mode</h4>
              <p>Select a sleek and modern dark theme</p>
            </div>
            <input type="radio" name="theme" value={"dark"} defaultChecked={theme === "dark"} onChange={handleChange} />
          </label>
        </li>
      </ul>
    </div>
  );
}
