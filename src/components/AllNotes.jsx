import { AddSvg, ArchiveSvg, RestoreSvg, SettingsSvg, StatusSvg, TagsSvg, TimeSvg, TrashSvg } from "../Svg";
import { NoteData, Router, ScreenSize } from "../App";
import { useContext, useEffect, useRef, useState } from "react";

import DesktopHeader from "./DesktopHeader";
import { toast } from "react-toastify";

export default function AllNotes() {
  const { noteData, setNoteData } = useContext(NoteData);
  const screenSize = useContext(ScreenSize);

  return <>{screenSize >= 1440 ? <AllNotesDesktop noteData={noteData} setNoteData={setNoteData} /> : <AllNotesMobile noteData={noteData} />}</>;
}

function AllNotesMobile({ noteData }) {
  const id = location.hash.substring(1);
  const note = noteData.find((note) => note.id === id);
  if (note) {
    location.hash = `/note/${note.id}`;
  }
  return (
    <main>
      <h1 className="page-header">All Notes</h1>
      <ul className="notes-list">{noteData.length > 0 ? noteData.map((note) => <Note key={note.id} {...note} />) : <EmptyState />}</ul>
      <button className="add-note-btn" onClick={() => (location.hash = "/new-note")}>
        <AddSvg />
      </button>
    </main>
  );
}

function Note({ id, title, tags, lastEdited }) {
  return (
    <>
      <li onClick={() => (location.hash = `/note/${id}`)}>
        <h3>{title}</h3>
        <div className="note-tags">
          {tags.map((tag) => (
            <span className="note-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <span className="note-date">{lastEdited}</span>
      </li>
      <hr />
    </>
  );
}

function EmptyState() {
  return <p className="emptyState">You don’t have any notes yet. Start a new note to capture your thoughts and ideas.</p>;
}

function AllNotesDesktop({ noteData, setNoteData }) {
  const archiveDialogRef = useRef(null);
  const deleteDialogRef = useRef(null);
  const router = useContext(Router);
  const [selectedNote, setSelectedNote] = useState(noteData.find((note) => note.id === location.hash.substring(1)) || null);
  const [currentContent, setCurrentContent] = useState(<NewNoteDesktop setSelectedNote={setSelectedNote} />);
  const [filterText, setFilterText] = useState("");
  const [filterData, setFilterData] = useState([...noteData]);

  useEffect(() => {
    setFilterData(noteData.filter((note) => note.title.toLowerCase().includes(filterText.trim().toLowerCase()) || note.note.toLowerCase().includes(filterText.trim().toLowerCase()) || note.tags.map((tag) => tag.toLowerCase().includes(filterText.trim().toLowerCase())).includes(true)));
  }, [filterText, noteData]);

  useEffect(() => {
    setSelectedNote(noteData.find((note) => note.id === location.hash.substring(1).split("/").at(-1)) || null);
  }, [router]);

  useEffect(() => {
    if (selectedNote) {
      setCurrentContent(<NoteDesktop note={selectedNote} noteData={noteData} setNoteData={setNoteData} setCurrentContent={setCurrentContent} setSelectedNote={setSelectedNote} />);
      location.hash = `${selectedNote.id}`;
    } else {
      setCurrentContent(<NewNoteDesktop setSelectedNote={setSelectedNote} />);
      location.hash = "/";
    }
  }, [selectedNote]);

  function handleDelete() {
    setNoteData(noteData.filter((note) => note.id !== selectedNote.id));
    setSelectedNote(null);
    deleteDialogRef.current.close();
    toast.success("Note deleted successfully.");
  }

  function handleArchive(status) {
    selectedNote.isArchived = status;
    setNoteData([...noteData]);
    setSelectedNote({ ...selectedNote });
    archiveDialogRef.current.close();
    toast.success(status ? "Note archived." : "Note restored from archive.");
  }

  return (
    <main>
      <DesktopHeader title="All Notes" filterText={filterText} setFilterText={setFilterText} />
      <div className="page-container-desktop">
        <div className="page-left">
          <button onClick={() => setSelectedNote(null)}>+ Create New Note</button>
          <ul className="notes-list">
            {filterData.length > 0 ? (
              filterData.map((note) => (
                <li className={selectedNote?.id === note.id ? "active" : ""} key={note.id} onClick={() => setSelectedNote(note)}>
                  <h3>{note.title}</h3>
                  <div className="note-tags">
                    {note.tags.map((tag) => (
                      <span className="note-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="note-date">{note.lastEdited}</span>
                </li>
              ))
            ) : (
              <EmptyState />
            )}
          </ul>
        </div>
        <div className="page-contents">{currentContent}</div>
        <div className="page-right">
          {selectedNote && (
            <div className="note-actions">
              {selectedNote.isArchived ? (
                <button onClick={() => handleArchive(false)}>
                  <RestoreSvg />
                  Restore Note
                </button>
              ) : (
                <button onClick={() => archiveDialogRef.current.showModal()}>
                  <ArchiveSvg />
                  Archive Note
                </button>
              )}
              <button onClick={() => deleteDialogRef.current.showModal()}>
                <TrashSvg />
                Delete Note
              </button>
            </div>
          )}
        </div>
      </div>
      <DeleteModal deleteDialogRef={deleteDialogRef} handleDelete={handleDelete} />
      <ArchiveModal archiveDialogRef={archiveDialogRef} handleArchive={handleArchive} />
    </main>
  );
}

function NewNoteDesktop({ setSelectedNote }) {
  const [tagsText, setTagsText] = useState("");
  const { noteData, setNoteData } = useContext(NoteData);

  function handleOnSubmit(e) {
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
      note: formObj.note,
    };
    setNoteData([newNoteObj, ...noteData]);
    setSelectedNote(newNoteObj);
    toast.success("Note created successfully!");
  }
  return (
    <form method="dialog" onSubmit={handleOnSubmit} className="new-note-form-desktop" autoComplete="off">
      <input required className="new-note-form-title" name="title" type="text" placeholder="Enter a title…" />
      <table className="note-metadata-table">
        <tbody>
          <tr>
            <td>
              <label>
                <TagsSvg />
                Tags
              </label>
            </td>
            <td>
              <input type="text" name="tags" placeholder="Add tags separated by commas (e.g. Work, Planning)" value={tagsText} onChange={(e) => setTagsText(e.target.value)} />
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <TimeSvg />
                Last edited
              </label>
            </td>
            <td>
              <input type="text" name="lastEdited" disabled value={"Not yet saved"} />
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
      <textarea required className="note-textarea desktop" name="note" placeholder="Start typing your note here…" />
      <hr />
      <div className="new-note-form-btn-group">
        <button type="submit" className="note-saveBtnDesktop">
          Create Note
        </button>
        <button type="button" className="note-cancelBtnDesktop">
          Cancel
        </button>
      </div>
    </form>
  );
}

function NoteDesktop({ note, noteData, setNoteData, setCurrentContent, setSelectedNote }) {
  const [currentNote, setCurrentNote] = useState(note);
  const [tagsText, setTagsText] = useState(currentNote.tags.join(", "));

  useEffect(() => {
    setCurrentNote(note);
    setTagsText(note.tags.join(", "));
  }, [note]);

  function handleOnSubmit(e) {
    const newNoteObj = {
      id: currentNote.id,
      title: currentNote.title,
      tags: tagsText
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
      isArchived: false,
      lastEdited: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      note: currentNote.note,
    };
    const noteIndex = noteData.findIndex((x) => x.id === currentNote.id);
    noteData[noteIndex] = newNoteObj;
    setNoteData([...noteData]);
    setCurrentContent(<NoteDesktop note={newNoteObj} noteData={noteData} setNoteData={setNoteData} setCurrentContent={setCurrentContent} />);
    toast.success("Note saved successfully!");
  }

  return (
    <form method="dialog" onSubmit={handleOnSubmit} className="new-note-form-desktop">
      <input required className="new-note-form-title" type="text" placeholder="Enter a title…" value={currentNote.title} onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })} />
      <table className="note-metadata-table">
        <tbody>
          <tr>
            <td>
              <label>
                <TagsSvg />
                Tags
              </label>
            </td>
            <td>
              <input type="text" placeholder="Add tags separated by commas (e.g. Work, Planning)" value={tagsText} onChange={(e) => setTagsText(e.target.value)} />
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
                <TimeSvg />
                Last edited
              </label>
            </td>
            <td>
              <input type="text" disabled value={currentNote.lastEdited} />
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
      <textarea required className="note-textarea" rows={40} placeholder="Start typing your note here…" value={currentNote.note} onChange={(e) => setCurrentNote({ ...currentNote, note: e.target.value })} />
      <hr />
      <div className="new-note-form-btn-group">
        <button type="submit" disabled={currentNote.title === note.title && tagsText === note.tags.join(", ") && currentNote.note === note.note} className="note-saveBtnDesktop">
          Save Note
        </button>
        <button type="button" className="note-cancelBtnDesktop" onClick={() => setSelectedNote(null)}>
          Cancel
        </button>
      </div>
    </form>
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
