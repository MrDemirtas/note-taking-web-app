import { AddSvg, TagsSvg } from "../Svg";
import { NoteData, ScreenSize } from "../App";

import { useContext } from "react";

export default function Tags() {
  const { noteData } = useContext(NoteData);
  const screenSize = useContext(ScreenSize);
  if (screenSize  >= 1440) {
    location.hash = "/";
  }
  
  const tags = new Set(
    noteData
      .map((note) => note.tags.map((tag) => tag))
      .join(",")
      .split(",")
      .filter(tag => tag !== "")
  );

  return (
    <div className="tags-container">
      <h1 className="page-header">Tags</h1>
      <div className="tags-list">
        {Array.from(tags).map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </div>
      <button className="add-note-btn" onClick={() => (location.hash = "/new-note")}>
        <AddSvg />
      </button>
    </div>
  );
}

function Tag({ tag }) {
  return (
    <>
      <div className="tag" onClick={() => (location.hash = `/tag-details/${tag}`)}>
        <TagsSvg />
        <p>{tag}</p>
      </div>
      <hr />
    </>
  );
}
