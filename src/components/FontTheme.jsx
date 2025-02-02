import { BackArrowSvg } from "../Svg";

export default function FontTheme() {
  return (
    <div className="font-theme-container">
      <button className="backBtn" onClick={() => (location.hash = "/settings")}>
        <BackArrowSvg />
        Settings
      </button>
      <h1 className="page-header">Font Theme</h1>
      <ul className="radio-group">
        <li>
          <label>
            <figure>
              <img src="/svg/sans-serif.svg" />
            </figure>
            <div className="theme-description">
              <h4>Inter</h4>
              <p>Default</p>
            </div>
            <input type="radio" name="theme" />
          </label>
        </li>
        <li>
          <label>
            <figure>
              <img src="/svg/sans-serif.svg" />
            </figure>
            <div className="theme-description">
              <h4>Sans-serif</h4>
              <p>Clean and modern, easy to read.</p>
            </div>
            <input type="radio" name="theme" />
          </label>
        </li>
        <li>
          <label>
            <figure>
              <img src="/svg/serif.svg" />
            </figure>
            <div className="theme-description">
              <h4>Serif</h4>
              <p>Classic and elegant for a timeless feel.</p>
            </div>
            <input type="radio" name="theme" />
          </label>
        </li>
        <li>
          <label>
            <figure>
              <img src="/svg/monospace.svg" />
            </figure>
            <div className="theme-description">
              <h4>Monospace</h4>
              <p>Code-like, great for a technical vibe.</p>
            </div>
            <input type="radio" name="theme" />
          </label>
        </li>
      </ul>
      <button className="font-theme-applyBtn">Apply Changes</button>
    </div>
  );
}
