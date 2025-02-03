import { createContext, useEffect, useState } from "react";

import Header from "./components/Header";
import MobileMenu from "./components/MobileMenu";
import { getPage } from "./helper";

const defaultData = [
  {
    id: 1,
    title: "My first note",
    tags: ["Dev", "React", "TypeScript"],
    isArchived: true,
    lastEdited: "26 Oct 2024",
    note: "Lorem ipsum dolor sit amet",
  },
  {
    id: 2,
    title: "Frontend Tips",
    tags: ["JavaScript", "CSS", "Next.js"],
    isArchived: false,
    lastEdited: "10 Jan 2025",
    note: "Always use semantic HTML for better accessibility.",
  },
  {
    id: 3,
    title: "Backend Basics",
    tags: ["Node.js", "Express", "API"],
    isArchived: false,
    lastEdited: "15 Dec 2024",
    note: "Middleware functions are essential for handling requests.",
  },
  {
    id: 4,
    title: "State Management",
    tags: ["React", "Redux", "Zustand"],
    isArchived: true,
    lastEdited: "22 Nov 2024",
    note: "Use Zustand for lightweight state management in React.",
  },
  {
    id: 5,
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
export default function App() {
  const [router, setRouter] = useState(location.hash.substring(1) || "/");
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [noteData, setNoteData] = useState(localStorage.noteData ? JSON.parse(localStorage.noteData) : [...defaultData]);
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
      <Header />
      <div className="container">
        <NoteData.Provider value={{ noteData, setNoteData }}>
          <ScreenSize.Provider value={screenSize}>
            {getPage(router)}
            <MobileMenu />
          </ScreenSize.Provider>
        </NoteData.Provider>
      </div>
    </Router.Provider>
  );
}
