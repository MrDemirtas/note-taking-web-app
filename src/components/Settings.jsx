import { FontFamily, ScreenSize } from "../App";
import { LockSvg, MoonSvg, RightArrow, SunSvg, TextFieldsSvg } from "../Svg";
import { useContext, useEffect, useState } from "react";

import DesktopHeader from "./DesktopHeader";

export default function Settings() {
  const screenSize = useContext(ScreenSize);

  return screenSize >= 1440 ? <SettingsDesktop /> : <SettingsMobile />;
}

function SettingsMobile() {
  return (
    <div className="settings-container">
      <h1 className="page-header">Settings</h1>
      <ul>
        <li>
          <a href="#/color-theme">
            <SunSvg />
            Color Theme
          </a>
        </li>
        <li>
          <a href="#/font-theme">
            <TextFieldsSvg />
            Font Theme
          </a>
        </li>
      </ul>
    </div>
  );
}

function SettingsDesktop() {
  const [selectedPage, setSelectedPage] = useState(<ColorTheme />);

  return (
    <div className="settings-container-desktop">
      <DesktopHeader title="Settings" isSettings />
      <div className="settings-desktop-contents">
        <div className="settings-left-menu">
          <ul>
            <li className={selectedPage.type.name === "ColorTheme" ? "active" : ""} onClick={() => setSelectedPage(<ColorTheme />)}>
              <div>
                <SunSvg />
                Color Theme
              </div>
              {selectedPage.type.name === "ColorTheme" && <RightArrow />}
            </li>
            <li className={selectedPage.type.name === "FontTheme" ? "active" : ""} onClick={() => setSelectedPage(<FontTheme />)}>
              <div>
                <TextFieldsSvg />
                Font Theme
              </div>
              {selectedPage.type.name === "FontTheme" && <RightArrow />}
            </li>
          </ul>
        </div>
        <div className="settings-desktop-main">{selectedPage}</div>
      </div>
    </div>
  );
}

function getSystemThemePref() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function ColorTheme() {
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
    <>
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
    </>
  );
}

function FontTheme() {
  const { fontFamily, setFontFamily } = useContext(FontFamily);

  function handleSubmit(e) {
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    setFontFamily(formObj.fontFamily);
  }

  return (
    <>
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
    </>
  );
}
