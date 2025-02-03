import { AddSvg, BackArrowSvg } from "../Svg";

export default function TagDetails(params) {
  return (
    <div className="tag-details-container">
      <button className="backBtn" onClick={() => (location.hash = "/tags")}>
        <BackArrowSvg />
        Go Back
      </button>
      <h1 className="tag-title">
        <span>Notes Tagged:</span> Dev
      </h1>
      <p className="page-description">All notes with the ”Dev” tag are shown here.</p>
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
      <button className="add-note-btn" onClick={() => (location.hash = "/new-note")}>
        <AddSvg />
      </button>
    </div>
  );
}
