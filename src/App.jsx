import { createContext, useEffect, useState } from "react";

import Header from "./components/Header";
import MobileMenu from "./components/MobileMenu";
import { getPage } from "./helper";

export const ScreenSize = createContext(null);
export default function App() {
  const [router, setRouter] = useState(location.hash.substring(1) || "/");
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("hashchange", () => {
      setRouter(location.hash.substring(1));
    });
    window.addEventListener("resize", () => {
      setScreenSize(window.innerWidth);
    });
    location.hash = "/";
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <ScreenSize.Provider value={screenSize}>
          {getPage(router)}
          <MobileMenu />
        </ScreenSize.Provider>
      </div>
    </>
  );
}
