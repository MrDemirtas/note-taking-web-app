import { SettingsSvg } from "../Svg";

export default function DesktopHeader({ title, filterText = "", setFilterText, tag = "", isSettings = false }) {
  return (
    <div className="page-header-desktop">
      {tag ? (
        <h1 className="tag-title">
          <span>Notes Tagged:</span> {tag}
        </h1>
      ) : filterText.trim() === "" ? (
        <h1>{title}</h1>
      ) : (
        <h1 className="tag-title">
          <span>Showing results for:</span> {filterText}
        </h1>
      )}
      <div className="page-header-desktop-right">
        {!isSettings && <input type="text" placeholder="Search by title, content, or tags…" value={filterText} onChange={(e) => setFilterText(e.target.value)} />}
        <button onClick={() => (location.hash = "/settings")}>
          <SettingsSvg />
        </button>
      </div>
    </div>
  );
}
