import { BackArrowSvg, TagsSvg, TimeSvg } from "../Svg";

export default function NewNote() {
  return (
    <div className="new-note-container">
      <div className="new-note-header">
        <div className="backBtn">
          <BackArrowSvg />
          Go Back
        </div>
        <div className="new-note-interactions">
          <button className="note-cancelBtn">Cancel</button>
          <button className="note-saveBtn">Save Note</button>
        </div>
      </div>
      <hr />
      <form>
        <input type="text" className="note-title" name="title" placeholder={"Enter Title..."} />
        <table className="note-metadata-table">
          <tbody>
            <tr>
              <td>
                <label>
                  <TagsSvg /> Tags
                </label>
              </td>
              <td>
                <textarea type="text" name="tags" placeholder="Add tags separated by commas (e.g. Work, Planning)"></textarea>
              </td>
            </tr>
            <tr>
              <td>
                <label>
                  <TimeSvg /> Last edited
                </label>
              </td>
              <td>
                <input type="text" name="lastEdited" defaultValue={"Not yet saved"} disabled />
              </td>
            </tr>
          </tbody>
        </table>
        <hr />
        <textarea className="note-textarea" rows={25} placeholder={"Start typing your note here..."}></textarea>
      </form>
    </div>
  );
}
