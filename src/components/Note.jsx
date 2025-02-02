import { ArchiveSvg, BackArrowSvg, TagsSvg, TimeSvg, TrashSvg } from "../Svg";

const defaultNote = `
Key performance optimization techniques:

1. Code Splitting
- Use React.lazy() for route-based splitting
- Implement dynamic imports for heavy components

2.	Memoization
- useMemo for expensive calculations
- useCallback for function props
- React.memo for component optimization

3. Virtual List Implementation
- Use react-window for long lists
- Implement infinite scrolling

TODO: Benchmark current application and identify bottlenecks
`;

export default function Note() {
  return (
    <div className="note-container">
      <div className="note-header">
        <button onClick={() => (location.hash = "/")}>
          <BackArrowSvg />
          Go Back
        </button>
        <div className="note-header-interactions">
          <button>
            <TrashSvg />
          </button>
          <button>
            <ArchiveSvg />
          </button>
          <button className="note-cancelBtn">Cancel</button>
          <button className="note-saveBtn">Save Note</button>
        </div>
      </div>
      <hr />
      <div className="note-metadata">
        <h1>React Performance Optimization</h1>
        <table>
          <tbody>
            <tr>
              <td>
                <label>
                  <TagsSvg /> Tags
                </label>
              </td>
              <td>Dev, React</td>
            </tr>
            <tr>
              <td>
                <label>
                  <TimeSvg /> Last edited
                </label>
              </td>
              <td>29 Oct 2024</td>
            </tr>
          </tbody>
        </table>
        <hr />
      </div>
      <textarea rows={25} defaultValue={defaultNote}></textarea>
    </div>
  );
}
