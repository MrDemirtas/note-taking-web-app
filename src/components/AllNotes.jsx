import { AddSvg } from "../Svg";
import { NoteData } from "../App";
import { useContext } from "react";

export default function AllNotes() {
  const { noteData } = useContext(NoteData);
  return (
    <main>
      <h1 className="page-header">All Notes</h1>
      <ul className="notes-list">
        {noteData.length > 0 ? noteData.map((note) => (
          <Note key={note.id} {...note} />
        ))
        :
          <EmptyState />
        }
      </ul>
      <button className="add-note-btn" onClick={() => (location.hash = "/new-note")}>
        <AddSvg />
      </button>
    </main>
  );
}

function Note({id, title, tags, lastEdited }) {
  return (
    <>
      <li onClick={() => (location.hash = `/note/${id}`)}>
        <h3>{title}</h3>
        <div className="note-tags">
          {tags.map((tag) => (
            <span className="note-tag" key={tag}>{tag}</span>
          ))}
        </div>
        <span className="note-date">{lastEdited}</span>
      </li>
      <hr />
    </>
  );
}

function EmptyState() {
  return <p className="emptyState">You don’t have any notes yet. Start a new note to capture your thoughts and ideas.</p>;
}
