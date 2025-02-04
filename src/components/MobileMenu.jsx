import { ArchiveSvg, HomeSvg, SearchSvg, SettingsSvg, TagsSvg } from "../Svg";

import { ScreenSize } from "../App";
import { useContext } from "react";

export default function MobileMenu() {
  const screenSize = useContext(ScreenSize);
  const route = location.hash.substring(1).split("/")[1] || "/";
  return (
    <nav className="mobile-menu">
      <ul>
        <li>
          <div className={"nav-item" + (route === "/" ? " active" : "")}>
            <a href="#/">
              <HomeSvg />
              {screenSize >= 768 && <span>Home</span>}
            </a>
          </div>
        </li>
        <li>
          <div className={"nav-item" + (route === "search" ? " active" : "")}>
            <a href="#/search">
              <SearchSvg />
              {screenSize >= 768 && <span>Search</span>}
            </a>
          </div>
        </li>
        <li>
          <div className={"nav-item" + (route === "archive" ? " active" : "")}>
            <a href="#/archive">
              <ArchiveSvg />
              {screenSize >= 768 && <span>Archive</span>}
            </a>
          </div>
        </li>
        <li>
          <div className={"nav-item" + (route === "tags" ? " active" : "")}>
            <a href="#/tags">
              <TagsSvg />
              {screenSize >= 768 && <span>Tags</span>}
            </a>
          </div>
        </li>
        <li>
          <div className={"nav-item" + (route === "settings" ? " active" : "")}>
            <a href="#/settings">
              <SettingsSvg />
              {screenSize >= 768 && <span>Settings</span>}
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
}
