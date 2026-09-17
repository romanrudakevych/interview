import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { highlightCode } from "../utils/highlightCode.js";

export function CodeBlock({ code, language = "auto" }) {
  const [copied, setCopied] = useState(false);
  const html = useMemo(() => highlightCode(code, language), [code, language]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard API unavailable — silently ignore
    }
  }

  return (
    <div className="code-block">
      <button className="code-block__copy" onClick={handleCopy} type="button">
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Copied" : "Copy"}
      </button>
      <pre>
        {/* highlightCode escapes every character it emits — see its header comment.
            Copy still writes the raw `code` prop, so copied text stays plain. */}
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </div>
  );
}
