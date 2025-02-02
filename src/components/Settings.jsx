import { LockSvg, SunSvg, TextFieldsSvg } from "../Svg";

export default function Settings() {
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
