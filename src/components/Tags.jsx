import { TagsSvg } from "../Svg";

export default function Tags() {
  return (
    <div className="tags-container">
      <h1 className="page-header">Tags</h1>
      <div className="tags-list">
        {Array.from({ length: 10 }).map((_, index) => (
          <Tag key={index} />
        ))}
      </div>
    </div>
  );
}

function Tag() {
  return (
    <>
      <div className="tag" onClick={() => location.hash = "/tag-details"}>
        <TagsSvg />
        <p>HTML</p>
      </div>
      <hr />
    </>
  );
}
