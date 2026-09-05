// Renders text where `backtick` segments become inline <code>, e.g.
// "Тег `<link>` підключає..." -> Тег <code>&lt;link&gt;</code> підключає...
export function FormattedText({ text }) {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("`") && part.endsWith("`") ? (
          <code className="inline-code" key={i}>
            {part.slice(1, -1)}
          </code>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
