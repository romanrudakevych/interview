import { describe, expect, it } from "vitest";
import { unescapeTokens } from "../../test/helpers/unescapeTokens.js";
import {
  detectLanguage,
  highlightCode,
  highlightCss,
  highlightJs,
  highlightMarkup,
} from "./highlightCode.js";

// The security property. These inputs are the ones that would break out of the
// <code dangerouslySetInnerHTML> if any tokenizer ever concatenated raw source.
const HOSTILE = [
  '<script>alert(1)</script>',
  '<img src=x onerror="alert(1)">',
  'const a = "</span><script>alert(1)</script>";',
  "// <script>alert(1)</script>",
  "/* </span> */",
  "a && b < c > d",
  "const html = `<div>${x}</div>`;",
  "x = 5 & 3;",
  "&amp;",
  "&lt;script&gt;",
  "<style>body{color:red}</style>",
  ".a::after { content: '</span>'; }",
  "<!-- </span> -->",
  "<!DOCTYPE html>",
  "<<<>>>",
  "{{{}}}",
  "'unterminated",
  '"unterminated',
  "`unterminated",
  "/* unterminated",
  "<div attr='unterminated>",
];

describe("escaping (the load-bearing property)", () => {
  describe.each([
    ["highlightJs", highlightJs],
    ["highlightCss", highlightCss],
    ["highlightMarkup", highlightMarkup],
  ])("%s", (_name, fn) => {
    it.each(HOSTILE)("emits no markup beyond its own token spans for %j", (input) => {
      const out = fn(input);

      // Only ever token spans — no other tag may appear in the output.
      const tags = out.match(/<[^>]*>/g) ?? [];
      for (const tag of tags) {
        expect(tag).toMatch(/^(<span class="tok tok--[a-z]+">|<\/span>)$/);
      }

      // Strip the spans and nothing bracket-like may be left: every "<" and ">"
      // from the input must have become an entity, and every "&" must open one.
      // (Note the weaker-looking property this replaces: text like `onerror=`
      // surviving verbatim is harmless once its brackets are escaped.)
      const text = out.replace(/<span class="tok tok--[a-z]+">|<\/span>/g, "");
      expect(text).not.toContain("<");
      expect(text).not.toContain(">");
      expect(text.replace(/&(amp|lt|gt);/g, "")).not.toContain("&");
    });

    it.each(HOSTILE)("round-trips %j byte-for-byte", (input) => {
      expect(unescapeTokens(fn(input))).toBe(input);
    });
  });

  it("escapes the three entities and nothing else", () => {
    // Quotes are deliberately not escaped: the output is element text, never an
    // attribute value.
    expect(highlightCode("&", "text")).toBe("&amp;");
    expect(highlightCode("<", "text")).toBe("&lt;");
    expect(highlightCode(">", "text")).toBe("&gt;");
    expect(highlightCode(`"'`, "text")).toBe(`"'`);
  });
});

describe("highlightJs", () => {
  it("marks keywords, literals, numbers, strings and comments", () => {
    const out = highlightJs("const x = 42; // null\nlet s = 'a';");
    expect(out).toContain('<span class="tok tok--keyword">const</span>');
    expect(out).toContain('<span class="tok tok--number">42</span>');
    expect(out).toContain('<span class="tok tok--comment">// null</span>');
    expect(out).toContain(`<span class="tok tok--string">'a'</span>`);
  });

  it("does not highlight a keyword inside a string or comment", () => {
    // The alternation is ordered so strings and comments win.
    expect(highlightJs(`"const"`)).toBe(`<span class="tok tok--string">"const"</span>`);
    expect(highlightJs("// const")).toBe('<span class="tok tok--comment">// const</span>');
  });

  it("marks literals separately from keywords", () => {
    const out = highlightJs("true null undefined NaN");
    expect(out.match(/tok--literal/g)).toHaveLength(4);
    expect(out).not.toContain("tok--keyword");
  });

  it("treats JSX tags as tags and their attributes as attrs", () => {
    const out = highlightJs("<Foo bar={1} />");
    expect(out).toContain('<span class="tok tok--tag">&lt;Foo</span>');
    expect(out).toContain('<span class="tok tok--attr">bar</span>');
  });

  it("does not read a comparison as a JSX tag (the JSX_HINT gate)", () => {
    // Without the gate, everything after "<b" would be highlighted as attrs.
    const out = highlightJs("if (a<b && c>d) return 1;");
    expect(out).not.toContain("tok--tag");
    expect(out).not.toContain("tok--attr");
    expect(unescapeTokens(out)).toBe("if (a<b && c>d) return 1;");
  });

  it("requires no space after < for a tag, so 'a < b' stays a comparison", () => {
    expect(highlightJs("<div /> a < b")).not.toContain('tok--tag">&lt; ');
  });

  it("treats identifiers inside a JSX expression as JS again, not attributes", () => {
    const out = highlightJs("<Foo bar={const}>text</Foo>");
    // `const` sits inside {…}, so it is a keyword rather than an attribute name.
    expect(out).toContain('<span class="tok tok--keyword">const</span>');
  });

  it("leaves an empty string empty", () => {
    expect(highlightJs("")).toBe("");
  });
});

describe("highlightCss", () => {
  it("distinguishes a selector from a property with the same shape", () => {
    const out = highlightCss("a:hover { color: red; }");
    // `a` outside the block is a selector; `color` inside it is a property.
    expect(out).toContain('<span class="tok tok--selector">a</span>');
    expect(out).toContain('<span class="tok tok--property">color</span>');
  });

  it("marks at-rules, comments, strings, colors and numbers", () => {
    const out = highlightCss("@media print { /* c */ .a { width: 10px; color: #fff; content: 'x'; } }");
    expect(out).toContain('<span class="tok tok--keyword">@media</span>');
    expect(out).toContain('<span class="tok tok--comment">/* c */</span>');
    expect(out).toContain('<span class="tok tok--number">10px</span>');
    expect(out).toContain('<span class="tok tok--number">#fff</span>');
    expect(out).toContain(`<span class="tok tok--string">'x'</span>`);
  });

  it("recovers from an unbalanced closing brace rather than going negative", () => {
    expect(() => highlightCss("} } a { color: red }")).not.toThrow();
  });
});

describe("highlightMarkup", () => {
  it("marks tags, attributes and values", () => {
    const out = highlightMarkup('<a href="/x" disabled>text</a>');
    expect(out).toContain('<span class="tok tok--tag">&lt;a</span>');
    expect(out).toContain('<span class="tok tok--attr">href</span>');
    expect(out).toContain('<span class="tok tok--string">"/x"</span>');
    expect(out).toContain('<span class="tok tok--attr">disabled</span>');
  });

  it("hands a <script> body to the JS tokenizer", () => {
    const out = highlightMarkup("<script>const x = 1;</script>");
    expect(out).toContain('<span class="tok tok--keyword">const</span>');
    expect(out).toContain('<span class="tok tok--number">1</span>');
  });

  it("hands a <style> body to the CSS tokenizer", () => {
    const out = highlightMarkup("<style>.a { color: red; }</style>");
    expect(out).toContain('<span class="tok tok--property">color</span>');
  });

  it("marks comments and doctypes", () => {
    expect(highlightMarkup("<!-- hi -->")).toContain('tok--comment">&lt;!-- hi --&gt;');
    expect(highlightMarkup("<!DOCTYPE html>")).toContain('tok--keyword">&lt;!DOCTYPE html&gt;');
  });

  it("keeps a bare < that starts no tag", () => {
    expect(unescapeTokens(highlightMarkup("1 < 2"))).toBe("1 < 2");
  });

  it("handles a self-closing tag's trailing slash as part of the bracket", () => {
    const out = highlightMarkup("<br />");
    expect(out).toContain('<span class="tok tok--tag">/&gt;</span>');
  });
});

describe("detectLanguage", () => {
  it.each([
    ["", "text"],
    ["<div>x</div>", "html"],
    ["  <div/>", "html"],
    [".a { color: red; }", "css"],
    ["a:hover { text-decoration: underline; }", "css"],
    ["const x = 1;", "js"],
    ["function f() {}", "js"],
    ["x => x + 1", "js"],
  ])("detects %j as %s", (code, expected) => {
    expect(detectLanguage(code)).toBe(expected);
  });

  it("does not mistake a JS object literal for CSS", () => {
    // The parens exclusion in looksLikeCss exists for exactly this shape.
    expect(detectLanguage("fetch(url, { method: 'GET' });")).toBe("js");
  });

  it("prefers JS when a CSS-ish block contains JS keywords", () => {
    expect(detectLanguage("const styles = { a: 'b' };")).toBe("js");
  });
});

describe("highlightCode dispatch", () => {
  it("routes each explicit language to its tokenizer", () => {
    expect(highlightCode("<a>", "html")).toContain("tok--tag");
    expect(highlightCode(".a{color:red}", "css")).toContain("tok--property");
    expect(highlightCode("const x", "js")).toContain("tok--keyword");
  });

  it("emits no token spans at all for language=text", () => {
    // The opt-out used for a task's Вход/Выход prose, which is not source.
    const out = highlightCode("const x = 1; .a { color: red }", "text");
    expect(out).not.toContain("<span");
  });

  it("defaults to auto-detection", () => {
    expect(highlightCode("<a>")).toBe(highlightCode("<a>", "html"));
  });
});
