import { AddSvg } from "../Svg";

export default function AllNotes() {
  return (
    <main>
      <h1 className="page-header">All Notes</h1>
      <ul className="notes-list">
        {/* {Array.from({ length: 5 }).map((_, i) => ( <Note key={i} /> ))} */}
        <EmptyState />
      </ul>
      <button className="add-note-btn" onClick={() => (location.hash = "/new-note")}>
        <AddSvg />
      </button>
    </main>
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
  return <p className="emptyState">You don’t have any notes yet. Start a new note to capture your thoughts and ideas.</p>;
}
