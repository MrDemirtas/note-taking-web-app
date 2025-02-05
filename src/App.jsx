import { createContext, useEffect, useState } from "react";

import DesktopMenu from "./components/DesktopMenu";
import Header from "./components/Header";
import MobileMenu from "./components/MobileMenu";
import { ToastContainer } from "react-toastify";
import { getPage } from "./helper";

export function getSystemThemePref() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

document.body.className = localStorage.theme || getSystemThemePref();
export const NoteData = createContext(null);
export const ScreenSize = createContext(null);
export const Router = createContext(null);
export const FontFamily = createContext(null);
export default function App() {
  const [router, setRouter] = useState(location.hash.substring(1) || "/");
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [noteData, setNoteData] = useState(
    localStorage.noteData
      ? JSON.parse(localStorage.noteData)
      : [
          {
            id: crypto.randomUUID(),
            title: "Welcome to Notes",
            note: "This is a simple note-taking app made with React. You can create, edit, and delete notes. You can also search for notes and add tags to them.",
            tags: ["react", "notes", "app"],
            lastEdited: new Date().toLocaleString(),
            isArchived: false,
          },
        ]
  );
  const [fontFamily, setFontFamily] = useState(localStorage.fontFamily || "Inter");

  useEffect(() => {
    window.addEventListener("hashchange", () => {
      setRouter(location.hash.substring(1));
    });
    window.addEventListener("resize", () => {
      setScreenSize(window.innerWidth);
    });
  }, []);

  useEffect(() => {
    localStorage.noteData = JSON.stringify(noteData);
  }, [noteData]);

  useEffect(() => {
    localStorage.fontFamily = fontFamily;
  }, [fontFamily]);

  return (
    <Router.Provider value={router}>
      {screenSize < 1440 && <Header />}
      <div className="container" style={{ fontFamily }}>
        <NoteData.Provider value={{ noteData, setNoteData }}>
          <ScreenSize.Provider value={screenSize}>
            <FontFamily.Provider value={{ fontFamily, setFontFamily }}>
              {screenSize >= 1440 ? <DesktopMenu /> : <MobileMenu />}
              {getPage(router)}
            </FontFamily.Provider>
          </ScreenSize.Provider>
        </NoteData.Provider>
      </div>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick limit={5} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
    </Router.Provider>
  );
}
