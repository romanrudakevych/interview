/**
 * The inverse of what src/utils/highlightCode.js emits: drops the token spans
 * and decodes the three entities it escapes.
 *
 * Every tokenizer escapes each token's text as it emits it and never
 * concatenates raw source, so the only raw markup in the output is the spans
 * themselves — which is what makes this a total inverse and therefore a usable
 * round-trip oracle.
 *
 * Decoding order mirrors escapeHtml's encoding order in reverse: &lt;/&gt;
 * before &amp;, or an input of "&amp;lt;" would come back as "<".
 */
export function unescapeTokens(html) {
  return html
    .replace(/<span class="tok tok--[a-z]+">/g, "")
    .replace(/<\/span>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}
