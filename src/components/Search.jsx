export default function Search() {
  return (
    <div className="search-container">
      <h1 className="page-header">Search</h1>
      <input type="text" placeholder="Search..." />
      <p className="page-description">All notes matching ”Dev” are displayed below.</p>
      <ul className="notes-list">
        <li onClick={() => (location.hash = "/note/1")}>
          <h3>React Performance Optimization</h3>
          <div className="note-tags">
            <span className="note-tag">Dev</span>
            <span className="note-tag">React</span>
          </div>
          <span className="note-date">29 Oct 2024</span>
        </li>
        <hr />
        <li>
          <h3>React Performance Optimization</h3>
          <div className="note-tags">
            <span className="note-tag">Dev</span>
            <span className="note-tag">React</span>
          </div>
          <span className="note-date">29 Oct 2024</span>
        </li>
        <hr />
        <li>
          <h3>React Performance Optimization</h3>
          <div className="note-tags">
            <span className="note-tag">Dev</span>
            <span className="note-tag">React</span>
          </div>
          <span className="note-date">29 Oct 2024</span>
        </li>
      </ul>
    </div>
  );
}
