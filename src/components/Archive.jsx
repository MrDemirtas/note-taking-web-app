import { AddSvg } from "../Svg";
import { NoteData } from "../App";
import { useContext } from "react";

export default function Archive() {
  const { noteData } = useContext(NoteData);
  const archiveNotes = noteData.filter((note) => note.isArchived);
  
  return (
    <div className="archive-container">
      <h1 className="page-header">Archived Notes</h1>
      <p className="page-description">All your archived notes are stored here. You can restore or delete them anytime.</p>
      <ul className="notes-list">{archiveNotes.length > 0 ? archiveNotes.map((note) => <Note key={note.id} {...note} />) : <EmptyState />}</ul>
      <button className="add-note-btn" onClick={() => (location.hash = "/new-note")}>
        <AddSvg />
      </button>
    </div>
  );
}

function Note({id, title, tags, lastEdited }) {
  return (
    <>
      <li onClick={() => (location.hash =`/note/${id}`)}>
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
      No notes have been archived yet. Move notes here for safekeeping, or <a href="#/new-note">create a new note.</a>
    </p>
  );
}
