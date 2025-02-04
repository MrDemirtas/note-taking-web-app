import { BackArrowSvg } from "../Svg";
import { FontFamily } from "../App";
import { useContext } from "react";

export default function FontTheme() {
  const { fontFamily, setFontFamily } = useContext(FontFamily);
  
  function handleSubmit(e) {
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    setFontFamily(formObj.fontFamily);
  }

  return (
    <div className="font-theme-container">
      <button className="backBtn" onClick={() => (location.hash = "/settings")}>
        <BackArrowSvg />
        Settings
      </button>
      <h1 className="page-header">Font Theme</h1>
      <form method="dialog" onSubmit={handleSubmit}>
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
              <input type="radio" name="fontFamily" value={"Inter"} defaultChecked={fontFamily === "Inter"} />
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
              <input type="radio" name="fontFamily" value={"sans-serif"} defaultChecked={fontFamily === "sans-serif"} />
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
              <input type="radio" name="fontFamily" value={"serif"} defaultChecked={fontFamily === "serif"} />
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
              <input type="radio" name="fontFamily" value={"monospace"} defaultChecked={fontFamily === "monospace"} />
            </label>
          </li>
        </ul>
        <button className="font-theme-applyBtn">Apply Changes</button>
      </form>
    </div>
  );
}
