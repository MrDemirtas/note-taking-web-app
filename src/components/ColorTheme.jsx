import { BackArrowSvg, MoonSvg, SunSvg } from "../Svg";

export default function ColorTheme() {
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
            <input type="radio" name="theme" />
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
            <input type="radio" name="theme" />
          </label>
        </li>
      </ul>
    </div>
  );
}
