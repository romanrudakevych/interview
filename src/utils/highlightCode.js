// Minimal multi-language tokenizer for the editor's highlight layer and for the
// answer code blocks in the Questions section.
//
// The output is injected with dangerouslySetInnerHTML, and one caller's input is
// user-typed code, so every non-tag character MUST be escaped. Each tokenizer
// escapes each token's text as it emits it and never passes raw input through.
// Highlighting accuracy is best-effort (regex + small scanners, not a parser);
// escaping is not.

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

/* ------------------------------------------------------------ JavaScript */

// One alternation, ordered so that comments and strings win over everything
// else — otherwise a keyword inside a string would get highlighted.
const TOKEN_RE = new RegExp(
  [
    "(\\/\\/[^\\n]*)", // line comment
    "(\\/\\*[\\s\\S]*?\\*\\/)", // block comment
    "(`(?:\\\\.|[^`\\\\])*`)", // template literal
    "(\"(?:\\\\.|[^\"\\\\\\n])*\")", // double-quoted string
    "('(?:\\\\.|[^'\\\\\\n])*')", // single-quoted string
    "(<\\/?[A-Za-z][\\w.:-]*(?=[\\s/>]))", // JSX tag open — no space after "<", so "a < b" is safe
    "(\\/?>)", // JSX tag close (only treated as one while inside a tag)
    "(\\b\\d+(?:\\.\\d+)?(?:e[+-]?\\d+)?\\b)", // number
    "([A-Za-z_$][A-Za-z0-9_$]*)", // identifier / keyword
  ].join("|"),
  "gi"
);

// At least one complete tag. Without this gate, `a<b && c>d` would read as a tag
// and everything after it would be highlighted as attributes — hence also the
// exclusion of the boolean operators from the attribute part.
const JSX_HINT = /<[A-Za-z][\w.:-]*(\s[^<>&|]*)?\/?>/;

export function highlightJs(code) {
  const jsx = JSX_HINT.test(code);
  let out = "";
  let lastIndex = 0;
  // Identifiers inside a JSX tag are attribute names — but not once we descend
  // into a `{…}` expression, where they are ordinary JS again.
  let inTag = false;
  let braceDepth = 0;

  for (const match of code.matchAll(TOKEN_RE)) {
    const [text, lineComment, blockComment, template, dq, sq, tagOpen, tagClose, number, word] =
      match;

    // Everything between tokens (punctuation, whitespace) is escaped verbatim.
    const gap = code.slice(lastIndex, match.index);
    out += escapeHtml(gap);
    lastIndex = match.index + text.length;

    if (inTag) {
      for (const ch of gap) {
        if (ch === "{") braceDepth += 1;
        else if (ch === "}") braceDepth = Math.max(0, braceDepth - 1);
      }
    }

    if (lineComment || blockComment) out += span("comment", text);
    else if (template || dq || sq) out += span("string", text);
    else if (tagOpen) {
      if (jsx) {
        inTag = true;
        braceDepth = 0;
        out += span("tag", text);
      } else {
        out += escapeHtml(text);
      }
    } else if (tagClose) {
      if (jsx && inTag && braceDepth === 0) {
        inTag = false;
        out += span("tag", text);
      } else {
        out += escapeHtml(text);
      }
    } else if (number) out += span("number", text);
    else if (word && KEYWORDS.has(word)) out += span("keyword", text);
    else if (word && LITERALS.has(word)) out += span("literal", text);
    else if (word && inTag && braceDepth === 0) out += span("attr", text);
    else out += escapeHtml(text);
  }

  out += escapeHtml(code.slice(lastIndex));
  return out;
}

/* ------------------------------------------------------------------- CSS */

const CSS_RE = new RegExp(
  [
    "(\\/\\*[\\s\\S]*?\\*\\/)", // comment
    "(\"(?:\\\\.|[^\"\\\\])*\"|'(?:\\\\.|[^'\\\\])*')", // string
    "(@[\\w-]+|!important)", // at-rule / !important
    "([{}])", // block delimiters — drive the depth counter
    "([-\\w]+)(?=\\s*:)", // property name (only meaningful inside a block)
    "(#[0-9a-fA-F]{3,8}\\b|\\b\\d+(?:\\.\\d+)?[a-z%]*)", // color / number with unit
  ].join("|"),
  "g"
);

// Outside a block, whatever sits between tokens is the selector.
function emitCssGap(text, depth) {
  if (depth > 0) return escapeHtml(text);
  const core = text.trim();
  if (!core) return escapeHtml(text);
  const start = text.indexOf(core);
  return (
    escapeHtml(text.slice(0, start)) +
    span("selector", core) +
    escapeHtml(text.slice(start + core.length))
  );
}

export function highlightCss(code) {
  let out = "";
  let lastIndex = 0;
  let depth = 0;

  for (const match of code.matchAll(CSS_RE)) {
    const [text, comment, string, atRule, brace, property, number] = match;

    out += emitCssGap(code.slice(lastIndex, match.index), depth);
    lastIndex = match.index + text.length;

    if (comment) out += span("comment", text);
    else if (string) out += span("string", text);
    else if (atRule) out += span("keyword", text);
    else if (brace) {
      depth = brace === "{" ? depth + 1 : Math.max(0, depth - 1);
      out += escapeHtml(text);
    } else if (property) {
      // Outside a block the same shape is a selector: the `a` of `a:hover`.
      out += span(depth > 0 ? "property" : "selector", text);
    }
    else if (number) out += span("number", text);
    else out += escapeHtml(text);
  }

  out += emitCssGap(code.slice(lastIndex), depth);
  return out;
}

/* ---------------------------------------------------------------- Markup */

// Index of the closing "}" that balances the "{" at `start`, or the end of the
// string when it is unbalanced.
function matchBrace(text, start) {
  let depth = 0;
  for (let i = start; i < text.length; i++) {
    if (text[i] === "{") depth += 1;
    else if (text[i] === "}" && --depth === 0) return i;
  }
  return text.length;
}

// The part of a tag after its name: attribute names, quoted values and JSX
// `{…}` expressions, which are handed back to the JS tokenizer.
function highlightAttrs(text) {
  let out = "";
  let i = 0;

  while (i < text.length) {
    const ch = text[i];

    if (ch === '"' || ch === "'") {
      const end = text.indexOf(ch, i + 1);
      const stop = end === -1 ? text.length : end + 1;
      out += span("string", text.slice(i, stop));
      i = stop;
      continue;
    }

    if (ch === "{") {
      const end = matchBrace(text, i);
      out += escapeHtml("{") + highlightJs(text.slice(i + 1, end)) + escapeHtml(text.slice(end, end + 1));
      i = end + 1;
      continue;
    }

    const name = /^[A-Za-z_@:$][\w:.$-]*/.exec(text.slice(i));
    if (name) {
      out += span("attr", name[0]);
      i += name[0].length;
      continue;
    }

    out += escapeHtml(ch);
    i += 1;
  }

  return out;
}

// End of the tag that starts at `start`: the first ">" that is not inside a
// quoted attribute value or a JSX expression.
function findTagEnd(text, start) {
  let quote = null;
  let depth = 0;

  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (quote) {
      if (ch === quote) quote = null;
    } else if (ch === '"' || ch === "'") quote = ch;
    else if (ch === "{") depth += 1;
    else if (ch === "}") depth = Math.max(0, depth - 1);
    else if (ch === ">" && depth === 0) return i;
  }

  return text.length;
}

export function highlightMarkup(code) {
  let out = "";
  let i = 0;

  while (i < code.length) {
    const lt = code.indexOf("<", i);
    if (lt === -1) {
      out += escapeHtml(code.slice(i));
      break;
    }

    out += escapeHtml(code.slice(i, lt));

    if (code.startsWith("<!--", lt)) {
      const end = code.indexOf("-->", lt);
      const stop = end === -1 ? code.length : end + 3;
      out += span("comment", code.slice(lt, stop));
      i = stop;
      continue;
    }

    if (/^<!\w/.test(code.slice(lt))) {
      const end = findTagEnd(code, lt);
      out += span("keyword", code.slice(lt, Math.min(end + 1, code.length)));
      i = end + 1;
      continue;
    }

    const name = /^<\/?[A-Za-z][\w.:-]*/.exec(code.slice(lt));
    if (!name) {
      out += escapeHtml("<");
      i = lt + 1;
      continue;
    }

    const attrsStart = lt + name[0].length;
    const end = findTagEnd(code, attrsStart);
    const closing = code.slice(end, end + 1) === ">";
    const tail = code.slice(attrsStart, end);
    // A trailing "/" belongs to the bracket, not to the attributes.
    const selfClosing = tail.endsWith("/");

    out += span("tag", name[0]);
    out += highlightAttrs(selfClosing ? tail.slice(0, -1) : tail);
    out += span("tag", (selfClosing ? "/" : "") + (closing ? ">" : ""));
    i = end + 1;

    // <script> and <style> bodies are not markup — hand them to the right
    // tokenizer so a full-page example stays readable throughout.
    const tagName = name[0].replace(/^<\/?/, "").toLowerCase();
    const opening = !name[0].startsWith("</");
    if (opening && !selfClosing && closing && (tagName === "script" || tagName === "style")) {
      const close = code.toLowerCase().indexOf(`</${tagName}`, i);
      const bodyEnd = close === -1 ? code.length : close;
      const body = code.slice(i, bodyEnd);
      out += tagName === "script" ? highlightJs(body) : highlightCss(body);
      i = bodyEnd;
    }
  }

  return out;
}

/* -------------------------------------------------------------- Dispatch */

function looksLikeCss(src) {
  if (/(\bfunction\b|=>|\bconst\b|\blet\b|\bvar\b|\bimport\b|\breturn\b|console\.)/.test(src)) {
    return false;
  }
  // A selector, then a brace, then a semicolon-terminated declaration. The
  // parens exclusion keeps JS object literals — `fetch(url, { method: 'GET' })`
  // — from matching.
  return /(^|\})\s*[^{}();]+\{[^{}]*[-\w]+\s*:[^{};]+;/.test(src);
}

export function detectLanguage(code) {
  const src = code.trim();
  if (!src) return "text";
  if (src.startsWith("<")) return "html";
  if (looksLikeCss(src)) return "css";
  return "js";
}

/**
 * `language` is "auto" | "js" | "html" | "css" | "text"; "text" escapes without
 * emitting any token spans.
 */
export function highlightCode(code, language = "auto") {
  const lang = language === "auto" ? detectLanguage(code) : language;
  if (lang === "html") return highlightMarkup(code);
  if (lang === "css") return highlightCss(code);
  if (lang === "js") return highlightJs(code);
  return escapeHtml(code);
}
