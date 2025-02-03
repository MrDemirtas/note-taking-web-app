import { ArchiveSvg, BackArrowSvg, RestoreSvg, StatusSvg, TagsSvg, TimeSvg, TrashSvg } from "../Svg";
import { NoteData, Router } from "../App";
import { useContext, useEffect, useRef, useState } from "react";

export default function Note() {
  const formRef = useRef(null);
  const dialogRef = useRef(null);
  const { noteData, setNoteData } = useContext(NoteData);
  const router = useContext(Router);
  const id = location.hash.split("/").at(-1);
  const [currentNote, setCurrentNote] = useState(noteData.find((note) => note.id === parseInt(id)));
  if (!currentNote) {
    location.hash = "/not-found";
    return;
  }
  const [tagsText, setTagsText] = useState(currentNote.tags.join(", "));

  useEffect(() => {
    setCurrentNote(noteData.find((note) => note.id === parseInt(id)));
  }, [router]);

  function handleOnSubmit() {
    currentNote.tags = tagsText
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");
    currentNote.lastEdited = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    noteData[noteData.findIndex((note) => note.id === parseInt(id))] = currentNote;
    setNoteData([...noteData]);
  }

  function handleTagsChange(e) {
    if (e.target.value.at(-1) === "," || e.target.value.at(-1) === " ") {
      setTagsText(e.target.value);
    } else {
      const tags = e.target.value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
      setTagsText(tags.join(", "));
    }
  }

  function handleDelete() {
    setNoteData(noteData.filter((note) => note.id !== parseInt(id)));
    location.hash = "/";
  }

  return (
    <div className="note-container">
      <DeleteModal dialogRef={dialogRef} handleDelete={handleDelete} />
      <div className="note-header">
        <button onClick={() => (location.hash = "/")}>
          <BackArrowSvg />
          Go Back
        </button>
        <div className="note-header-interactions">
          <button onClick={() => dialogRef.current.showModal()}>
            <TrashSvg />
          </button>
          {currentNote.isArchived ? (
            <button onClick={() => setCurrentNote({ ...currentNote, isArchived: false })}>
              <RestoreSvg />
            </button>
          ) : (
            <button onClick={() => setCurrentNote({ ...currentNote, isArchived: true })}>
              <ArchiveSvg />
            </button>
          )}
          <button className="note-cancelBtn">Cancel</button>
          <button className="note-saveBtn" onClick={handleOnSubmit}>
            Save Note
          </button>
        </div>
      </div>
      <hr />
      <form ref={formRef} method="dialog" autoComplete="off">
        <input required type="text" className="note-title" placeholder={"Enter Title..."} value={currentNote.title} onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })} />
        <table className="note-metadata-table">
          <tbody>
            <tr>
              <td>
                <label>
                  <TagsSvg /> Tags
                </label>
              </td>
              <td>
                <input type="text" placeholder="e.g. Work, Planning" value={tagsText} onChange={handleTagsChange} />
              </td>
            </tr>
            {currentNote.isArchived && (
              <tr>
                <td>
                  <label>
                    <StatusSvg /> Status
                  </label>
                </td>
                <td>
                  <label>Archived</label>
                </td>
              </tr>
            )}
            <tr>
              <td>
                <label>
                  <TimeSvg /> Last edited
                </label>
              </td>
              <td>
                <input type="text" value={currentNote.lastEdited || "Not yet saved"} disabled />
              </td>
            </tr>
          </tbody>
        </table>
        <hr />
        <textarea required className="note-textarea" rows={28} value={currentNote.note} onChange={(e) => setCurrentNote({ ...currentNote, note: e.target.value })}></textarea>
      </form>
    </div>
  );
}

function DeleteModal({ dialogRef, handleDelete }) {
  return (
    <dialog ref={dialogRef}>
      <div className="dialog-contents">
        <figure>
          <TrashSvg />
        </figure>
        <div className="dialog-texts">
          <h2>Delete Note</h2>
          <p>Are you sure you want to permanently delete this note? This action cannot be undone.</p>
        </div>
      </div>
      <hr />
      <div className="dialog-btns">
        <button className="cancelBtn" onClick={() => dialogRef.current.close()}>Cancel</button>
        <button className="deleteBtn" onClick={handleDelete}>Delete Note</button>
      </div>
    </dialog>
  );
}
