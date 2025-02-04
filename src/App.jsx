import { createContext, useEffect, useState } from "react";

import DesktopMenu from "./components/DesktopMenu";
import Header from "./components/Header";
import MobileMenu from "./components/MobileMenu";
import { ToastContainer } from "react-toastify";
import { getPage } from "./helper";

const defaultData = [
  {
    id: crypto.randomUUID(),
    title: "My first note",
    tags: ["Dev", "React", "TypeScript"],
    isArchived: true,
    lastEdited: "26 Oct 2024",
    note: "Lorem ipsum dolor sit amet",
  },
  {
    id: crypto.randomUUID(),
    title: "Frontend Tips",
    tags: ["JavaScript", "CSS", "Next.js"],
    isArchived: false,
    lastEdited: "10 Jan 2025",
    note: "Always use semantic HTML for better accessibility.",
  },
  {
    id: crypto.randomUUID(),
    title: "Backend Basics",
    tags: ["Node.js", "Express", "API"],
    isArchived: false,
    lastEdited: "15 Dec 2024",
    note: "Middleware functions are essential for handling requests.",
  },
  {
    id: crypto.randomUUID(),
    title: "State Management",
    tags: ["React", "Redux", "Zustand"],
    isArchived: true,
    lastEdited: "22 Nov 2024",
    note: "Use Zustand for lightweight state management in React.",
  },
  {
    id: crypto.randomUUID(),
    title: "Performance Optimization",
    tags: ["Web", "Optimization", "Lighthouse"],
    isArchived: false,
    lastEdited: "05 Jan 2025",
    note: "Optimize images and use lazy loading for better performance.",
  },
];

export const NoteData = createContext(null);
export const ScreenSize = createContext(null);
export const Router = createContext(null);
export const FontFamily = createContext(null);
export default function App() {
  const [router, setRouter] = useState(location.hash.substring(1) || "/");
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [noteData, setNoteData] = useState(localStorage.noteData ? JSON.parse(localStorage.noteData) : [...defaultData]);
  const [fontFamily, setFontFamily] = useState("Inter");

  useEffect(() => {
    window.addEventListener("hashchange", () => {
      setRouter(location.hash.substring(1));
    });
    window.addEventListener("resize", () => {
      setScreenSize(window.innerWidth);
    });
  }, []);

  return (
    <Router.Provider value={router}>
      {screenSize < 1440 && <Header />}
      <div className="container" style={{ fontFamily }}>
        <NoteData.Provider value={{ noteData, setNoteData }}>
          <ScreenSize.Provider value={screenSize}>
            <FontFamily.Provider value={{fontFamily, setFontFamily}}>
              {screenSize >= 1440 ? <DesktopMenu /> : <MobileMenu />}
              {getPage(router)}
            </FontFamily.Provider>
          </ScreenSize.Provider>
        </NoteData.Provider>
      </div>
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        limit={5}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Router.Provider>
  );
}
