import { AddSvg } from "../Svg";

export default function Archive() {
  return (
    <div className="archive-container">
      <h1 className="page-header">Archived Notes</h1>
      <p className="page-description">All your archived notes are stored here. You can restore or delete them anytime.</p>
      <ul className="notes-list">
        {/* {Array.from({ length: 5 }).map((_, i) => ( <Note key={i} /> ))} */}
        <EmptyState />
      </ul>
      <button className="add-note-btn" onClick={() => (location.hash = "/new-note")}>
        <AddSvg />
      </button>
    </div>
  );
}

function Note() {
  return (
    <>
      <li onClick={() => (location.hash = "/note/1")}>
        <h3>React Performance Optimization</h3>
        <div className="note-tags">
          <span className="note-tag">Dev</span>
          <span className="note-tag">React</span>
        </div>
        <span className="note-date">29 Oct 2024</span>
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
