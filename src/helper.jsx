import AllNotes from "./components/AllNotes";
import Archive from "./components/Archive";
import Note from "./components/Note";
import Search from "./components/Search";
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
];

export function getPage(url) {
  return routers.findLast((router) => "/" + (url.split("/")?.[1] || "") === router.url)?.component || <h4>Not Found</h4>;
}
