import { useRef } from "react";
import { highlightJs } from "../utils/highlightCode.js";

// A transparent <textarea> layered over a highlighted <pre>, plus a line-number
// gutter. The two layers must keep identical font, size, line-height, padding
// and border-box sizing (see .code-editor__* in index.css) or the caret drifts
// away from the rendered text.
export function CodeEditor({ value, onChange }) {
  const highlightRef = useRef(null);
  const gutterRef = useRef(null);

  // The textarea is the only scrollable layer; the other two follow it.
  function handleScroll(e) {
    const { scrollTop, scrollLeft } = e.currentTarget;
    if (highlightRef.current) {
      highlightRef.current.scrollTop = scrollTop;
      highlightRef.current.scrollLeft = scrollLeft;
    }
    if (gutterRef.current) gutterRef.current.scrollTop = scrollTop;
  }

  function handleKeyDown(e) {
    if (e.key !== "Tab") return;
    e.preventDefault();
    const { selectionStart, selectionEnd } = e.currentTarget;
    const next = value.slice(0, selectionStart) + "  " + value.slice(selectionEnd);
    onChange(next);
    // Restore the caret after React re-renders with the new value.
    requestAnimationFrame(() => {
      const el = e.target;
      el.selectionStart = el.selectionEnd = selectionStart + 2;
    });
  }

  const lineCount = value.split("\n").length;

  return (
    <div className="code-editor">
      <div className="code-editor__gutter" ref={gutterRef} aria-hidden="true">
        {Array.from({ length: lineCount }, (_, i) => (
          <div key={i + 1}>{i + 1}</div>
        ))}
      </div>

      <div className="code-editor__area">
        <pre className="code-editor__highlight" ref={highlightRef} aria-hidden="true">
          {/* highlightJs escapes all user input — see its header comment */}
          <code dangerouslySetInnerHTML={{ __html: highlightJs(value) + "\n" }} />
        </pre>
        <textarea
          className="code-editor__input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          aria-label="Редактор кода"
        />
      </div>
    </div>
  );
}
