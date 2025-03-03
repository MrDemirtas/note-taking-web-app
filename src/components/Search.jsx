import { NoteData, ScreenSize } from "../App";
import { useContext, useEffect, useState } from "react";

import { AddSvg } from "../Svg";

export default function Search() {
  const { noteData } = useContext(NoteData);
  const screenSize = useContext(ScreenSize);
  if (screenSize >= 1440) {
    location.hash = "/";
  }
  
  const [text, setText] = useState("");
  const [filterData, setFilterData] = useState([...noteData]);

  useEffect(() => {
    setFilterData(noteData.filter((note) => note.title.toLowerCase().includes(text.toLowerCase()) || note.note.toLowerCase().includes(text.toLowerCase()) || note.tags.map((tag) => tag.toLowerCase().includes(text.toLowerCase())).includes(true)));
  }, [text]);

  return (
    <div className="search-container">
      <h1 className="page-header">Search</h1>
      <input type="text" placeholder="Search..." value={text} onChange={(e) => setText(e.target.value)} />
      {text && <p className="page-description">All notes matching ”{text}” are displayed below.</p>}
      <ul className="notes-list">{filterData.length > 0 ? filterData.map((note) => <Note key={note.id} {...note} />) : <EmptyState />}</ul>
      <button className="add-note-btn" onClick={() => (location.hash = "/new-note")}>
        <AddSvg />
      </button>
    </div>
  );
}

function Note({ id, title, tags, lastEdited }) {
  return (
    <>
      <li onClick={() => (location.hash = `/note/${id}`)}>
        <h3>{title}</h3>
        <div className="note-tags">
          {tags.map((tag) => (
            <span key={tag} className="note-tag">
              {tag}
            </span>
          ))}
        </div>
        <span className="note-date">{lastEdited}</span>
      </li>
      <hr />
    </>
  );
}

function EmptyState() {
  return (
    <p className="emptyState">
      No notes match your search. Try a different keyword or <a href="#/new-note">create a new note.</a>
    </p>
  );
}
