import AllNotes from "./components/AllNotes";
import Note from "./components/Note";

const routers = [
  {
    url: '/',
    component: <AllNotes />,
  },
  {
    url: '/note',
    component: <Note />,
  },
];

export function getPage(url) {
  return routers.findLast((router) => ("/" + (url.split("/")?.[1] || "")) === router.url)?.component || <h4>Not Found</h4>;
}