import AllNotes from "./components/AllNotes";
import Archive from "./components/Archive";
import ColorTheme from "./components/ColorTheme";
import FontTheme from "./components/FontTheme";
import NewNote from "./components/NewNote";
import NotFound from "./components/NotFound";
import Note from "./components/Note";
import Search from "./components/Search";
import Settings from "./components/Settings";
import TagDetails from "./components/TagDetails";
import Tags from "./components/Tags";

const routers = [
  {
    url: "/",
    component: <AllNotes />,
  },
  {
    url: "/note",
    component: <Note />,
  },
  {
    url: "/tags",
    component: <Tags />,
  },
  {
    url: "/tag-details",
    component: <TagDetails />,
  },
  {
    url: "/archive",
    component: <Archive />,
  },
  {
    url: "/search",
    component: <Search />,
  },
  {
    url: "/settings",
    component: <Settings />,
  },
  {
    url: "/color-theme",
    component: <ColorTheme />,
  },
  {
    url: "/font-theme",
    component: <FontTheme />,
  },
  {
    url: "/new-note",
    component: <NewNote />,
  },
];

export function getPage(url) {
  return routers.findLast((router) => "/" + (url.split("/")?.[1] || "") === router.url)?.component || <NotFound />;
}
