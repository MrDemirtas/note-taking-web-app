import { AddSvg } from "../Svg";

export default function Search() {
  return (
    <div className="search-container">
      <h1 className="page-header">Search</h1>
      <input type="text" placeholder="Search..." />
      <p className="page-description">All notes matching ”Dev” are displayed below.</p>
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
  return <p className="emptyState">No notes match your search. Try a different keyword or <a href="#/new-note">create a new note.</a></p>;
}