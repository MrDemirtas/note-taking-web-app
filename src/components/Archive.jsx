export default function Archive() {
  return (
    <div className="archive-container">
      <h1 className="page-header">Archived Notes</h1>
      <p className="page-description">All your archived notes are stored here. You can restore or delete them anytime.</p>
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
