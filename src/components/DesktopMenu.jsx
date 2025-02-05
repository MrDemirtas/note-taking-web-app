import { ArchiveSvg, HomeSvg, RightArrow, TagsSvg } from "../Svg";

import Header from "./Header";
import { NoteData } from "../App";
import { useContext } from "react";

export default function DesktopMenu() {
  const { noteData } = useContext(NoteData);
  const route = location.hash.substring(1).split("/")[1] || "/";
  const tags = new Set(
    noteData
      .map((note) => note.tags.map((tag) => tag))
      .join(",")
      .split(",")
      .filter((tag) => tag !== "")
  );

  return (
    <div className="desktop-menu-container">
      <Header />
      <nav className="desktop-menu">
        <ul>
          <li className={route === "/" ? "active" : ""}>
            <a href="#/">
              <div>
                <HomeSvg />
                All Notes
              </div>
              {route === "/" && <RightArrow />}
            </a>
          </li>
          <li className={route === "archive" ? "active" : ""}>
            <a href="#/archive">
              <div>
                <ArchiveSvg />
                Archived Notes
              </div>
              {route === "archive" && <RightArrow />}
            </a>
          </li>
        </ul>
      </nav>
      <hr />
      <div className="desktop-menu-tags">
        <h2>Tags</h2>
        <ul>
          {Array.from(tags).map((tag) => (
            <li key={tag} className={location.hash.substring(1) === `/tag-details/${tag}` ? "active" : ""} onClick={() => (location.hash = `/tag-details/${tag}`)}>
              <div>
                <TagsSvg />
                {tag}
              </div>
              {location.hash.substring(1) === `/tag-details/${tag}` && <RightArrow />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
