// Minimal JS tokenizer for the editor's highlight layer.
//
// The output is injected with dangerouslySetInnerHTML, and the input is
// user-typed code, so every non-tag character MUST be escaped. The tokenizer
// escapes each token's text as it emits it and never passes raw input through.
// Highlighting accuracy is best-effort (regex, not a parser); escaping is not.

const KEYWORDS = new Set([
  "async", "await", "break", "case", "catch", "class", "const", "continue",
  "debugger", "default", "delete", "do", "else", "export", "extends", "finally",
  "for", "function", "if", "import", "in", "instanceof", "let", "new", "of",
  "return", "static", "super", "switch", "this", "throw", "try", "typeof", "var",
  "void", "while", "with", "yield",
]);

const LITERALS = new Set(["true", "false", "null", "undefined", "NaN", "Infinity"]);

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function span(cls, text) {
  return `<span class="tok tok--${cls}">${escapeHtml(text)}</span>`;
}

// One alternation, ordered so that comments and strings win over everything
// else — otherwise a keyword inside a string would get highlighted.
const TOKEN_RE = new RegExp(
  [
    "(\\/\\/[^\\n]*)", // line comment
    "(\\/\\*[\\s\\S]*?\\*\\/)", // block comment
    "(`(?:\\\\.|[^`\\\\])*`)", // template literal
    "(\"(?:\\\\.|[^\"\\\\\\n])*\")", // double-quoted string
    "('(?:\\\\.|[^'\\\\\\n])*')", // single-quoted string
    "(\\b\\d+(?:\\.\\d+)?(?:e[+-]?\\d+)?\\b)", // number
    "([A-Za-z_$][A-Za-z0-9_$]*)", // identifier / keyword
  ].join("|"),
  "gi"
);

export function highlightJs(code) {
  let out = "";
  let lastIndex = 0;

  for (const match of code.matchAll(TOKEN_RE)) {
    const [text, lineComment, blockComment, template, dq, sq, number, word] = match;

    // Everything between tokens (punctuation, whitespace) is escaped verbatim.
    out += escapeHtml(code.slice(lastIndex, match.index));
    lastIndex = match.index + text.length;

    if (lineComment || blockComment) out += span("comment", text);
    else if (template || dq || sq) out += span("string", text);
    else if (number) out += span("number", text);
    else if (word && KEYWORDS.has(word)) out += span("keyword", text);
    else if (word && LITERALS.has(word)) out += span("literal", text);
    else out += escapeHtml(text);
  }

  out += escapeHtml(code.slice(lastIndex));
  return out;
}
