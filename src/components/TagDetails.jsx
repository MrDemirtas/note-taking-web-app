import { AddSvg, BackArrowSvg } from "../Svg";
import { NoteData, Router } from "../App";
import { useContext, useEffect, useState } from "react";

export default function TagDetails() {
  const router = useContext(Router);
  const { noteData } = useContext(NoteData);
  const [tag, setTag] = useState(decodeURI(location.hash.substring(1).split("/").at(-1)));
  const [filterData, setFilterData] = useState(noteData.filter((note) => note.tags.includes(tag)));

  useEffect(() => {
    setTag(decodeURI(location.hash.substring(1).split("/").at(-1)));
  }, [router]);

  useEffect(() => {
    setFilterData(noteData.filter((note) => note.tags.includes(tag)));
  }, [tag]);

  return (
    <div className="tag-details-container">
      <button className="backBtn" onClick={() => (location.hash = "/tags")}>
        <BackArrowSvg />
        Go Back
      </button>
      <h1 className="tag-title">
        <span>Notes Tagged:</span> {tag}
      </h1>
      <p className="page-description">All notes with the ”{tag}” tag are shown here.</p>
      <ul className="notes-list">
        {filterData.map(note => <Note key={note.id} {...note} />)}
      </ul>
      <button className="add-note-btn" onClick={() => (location.hash = "/new-note")}>
        <AddSvg />
      </button>
    </div>
  );
}

function Note({id, title, tags, lastEdited}) {
  return (
    <>
      <li onClick={() => (location.hash = `/note/${id}`)}>
        <h3>{title}</h3>
        <div className="note-tags">
          {tags.map(tag => <span key={tag} className="note-tag">{tag}</span>)}
        </div>
        <span className="note-date">{lastEdited}</span>
      </li>
      <hr />
    </>
  );
}
