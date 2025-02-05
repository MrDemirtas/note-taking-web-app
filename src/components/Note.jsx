import { ArchiveSvg, BackArrowSvg, RestoreSvg, StatusSvg, TagsSvg, TimeSvg, TrashSvg } from "../Svg";
import { NoteData, Router, ScreenSize } from "../App";
import { useContext, useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";

export default function Note() {
  const formRef = useRef(null);
  const deleteDialogRef = useRef(null);
  const archiveDialogRef = useRef(null);
  const { noteData, setNoteData } = useContext(NoteData);
  const screenSize = useContext(ScreenSize);
  const router = useContext(Router);
  const id = location.hash.split("/").at(-1);
  const [currentNote, setCurrentNote] = useState(noteData.find((note) => note.id === id));
  if (!currentNote) {
    location.hash = "/not-found";
    return;
  }
  if (screenSize >= 1440) {
    if (location.hash.substring(1).split("/").at(-2) === "archive") {
      location.hash = `/archive/${id}`;
    }else{
      location.hash = id;
    }
  }
  const [tagsText, setTagsText] = useState(currentNote.tags.join(", "));

  useEffect(() => {
    setCurrentNote(noteData.find((note) => note.id === id));
  }, [router]);

  function handleOnSubmit() {
    currentNote.tags = tagsText
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");
    currentNote.lastEdited = new Date().toLocaleString();
    noteData[noteData.findIndex((note) => note.id === currentNote.id)] = currentNote;
    setNoteData([...noteData]);
    toast.success("Note updated.");
  }

  function handleDelete() {
    setNoteData(noteData.filter((note) => note.id !== id));
    location.hash = "/";
    toast.success("Note deleted.");
  }

  function handleCancel() {
    const originalNote = noteData.find((note) => note.id === id);
    setCurrentNote(originalNote);
    setTagsText(originalNote.tags.join(", "));
  }

  function handleArchive(status) {
    noteData[noteData.findIndex((note) => note.id === currentNote.id)].isArchived = status;
    setNoteData([...noteData]);
    archiveDialogRef.current.close();
    toast.success(status ? "Note archived." : "Note removed from archive.");
  }

  function handleBack() {
    if (location.hash.substring(1).split("/").includes("archive")) {
      location.hash = "/archive";
    }else if (location.hash.substring(1).split("/").includes("tag-details")) {
      location.hash = "/tag-details/" + location.hash.substring(1).split("/").at(-2);
    } else{
      location.hash = "/";
    }
  }

  return (
    <div className="note-container">
      <DeleteModal deleteDialogRef={deleteDialogRef} handleDelete={handleDelete} />
      <ArchiveModal archiveDialogRef={archiveDialogRef} handleArchive={handleArchive} />
      <div className="note-header">
        <button onClick={handleBack}>
          <BackArrowSvg />
          Go Back
        </button>
        <div className="note-header-interactions">
          <button onClick={() => deleteDialogRef.current.showModal()}>
            <TrashSvg />
          </button>
          {currentNote.isArchived ? (
            <button onClick={() => handleArchive(false)}>
              <RestoreSvg />
            </button>
          ) : (
            <button onClick={() => archiveDialogRef.current.showModal()}>
              <ArchiveSvg />
            </button>
          )}
          <button className="note-cancelBtn" onClick={handleCancel}>
            Cancel
          </button>
          <button className="note-saveBtn" onClick={() => formRef.current.requestSubmit()}>
            Save Note
          </button>
        </div>
      </div>
      <hr />
      <form ref={formRef} onSubmit={handleOnSubmit} method="dialog" autoComplete="off">
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
                <input type="text" placeholder="e.g. Work, Planning" value={tagsText} onChange={(e) => setTagsText(e.target.value)} />
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

function DeleteModal({ deleteDialogRef, handleDelete }) {
  return (
    <dialog ref={deleteDialogRef}>
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
        <button className="cancelBtn" onClick={() => deleteDialogRef.current.close()}>
          Cancel
        </button>
        <button className="deleteBtn" onClick={handleDelete}>
          Delete Note
        </button>
      </div>
    </dialog>
  );
}

function ArchiveModal({ archiveDialogRef, handleArchive }) {
  return (
    <dialog ref={archiveDialogRef}>
      <div className="dialog-contents">
        <figure>
          <ArchiveSvg />
        </figure>
        <div className="dialog-texts">
          <h2>Archive Note</h2>
          <p>Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime.</p>
        </div>
      </div>
      <hr />
      <div className="dialog-btns">
        <button className="cancelBtn" onClick={() => archiveDialogRef.current.close()}>
          Cancel
        </button>
        <button className="archiveBtn" onClick={() => handleArchive(true)}>
          Archive Note
        </button>
      </div>
    </dialog>
  );
}
