import { BackArrowSvg, TagsSvg, TimeSvg } from "../Svg";
import { useContext, useRef, useState } from "react";

import { NoteData } from "../App";

export default function NewNote() {
  const formRef = useRef(null);
  const {noteData, setNoteData} = useContext(NoteData);
  const [tagsText, setTagsText] = useState("");

  function handleSubmit(e) {
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    const id = crypto.randomUUID();
    const newNoteObj = {
      id,
      title: formObj.title,
      tags: tagsText
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
      isArchived: false,
      lastEdited: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      note: formObj.note
    };
    setNoteData([newNoteObj, ...noteData]);
    location.hash = `/note/${id}`
  }

  return (
    <div className="new-note-container">
      <div className="new-note-header">
        <button className="backBtn" onClick={() => history.back()}>
          <BackArrowSvg />
          Go Back
        </button>
        <div className="new-note-interactions">
          <button className="note-cancelBtn" onClick={() => history.back()}>Cancel</button>
          <button className="note-saveBtn" onClick={() => formRef.current.requestSubmit()}>
            Save Note
          </button>
        </div>
      </div>
      <hr />
      <form ref={formRef} autoComplete="off" method="dialog" onSubmit={handleSubmit}>
        <input required type="text" className="note-title" name="title" placeholder={"Enter Title..."} />
        <table className="note-metadata-table">
          <tbody>
            <tr>
              <td>
                <label>
                  <TagsSvg /> Tags
                </label>
              </td>
              <td>
                <input type="text" name="tags" placeholder="e.g. Work, Planning" value={tagsText} onChange={(e) => setTagsText(e.target.value)} />
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
        <textarea required className="note-textarea" name="note" rows={25} placeholder={"Start typing your note here..."}></textarea>
      </form>
    </div>
  );
}
