import { ArchiveSvg, BackArrowSvg, TagsSvg, TimeSvg, TrashSvg } from "../Svg";

const defaultNote = `Key performance optimization techniques:

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
      <form>
        <input type="text" className="note-title" name="title" placeholder={"Enter Title..."} />
        <table className="note-metadata-table">
          <tbody>
            <tr>
              <td>
                <label>
                  <TagsSvg /> Tags
                </label>
              </td>
              <td>
                <textarea type="text" name="tags" placeholder="Add tags separated by commas (e.g. Work, Planning)"></textarea>
              </td>
            </tr>
            <tr>
              <td>
                <label>
                  <TimeSvg /> Last edited
                </label>
              </td>
              <td>
                <input type="text" name="lastEdited" defaultValue={"Not yet saved"} disabled />
              </td>
            </tr>
          </tbody>
        </table>
        <hr />
        <textarea className="note-textarea" rows={25} defaultValue={defaultNote}></textarea>
      </form>
    </div>
  );
}
