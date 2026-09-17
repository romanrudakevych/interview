import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { SkillIcon } from "../utils/skillIcons.jsx";

function hostOf(url) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function ResourceCard({ resource }) {
  // Thumbnails are hot-linked from the upstream CDN; a dead one would otherwise
  // leave a broken-image icon, so fall back to the initial-letter tile.
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = resource.image && !imageFailed;

  return (
    <article className="resource-card">
      <div className="resource-card__thumb">
        {showImage ? (
          <img src={resource.image} alt="" loading="lazy" onError={() => setImageFailed(true)} />
        ) : (
          <span className="resource-card__thumb-fallback">{resource.name.slice(0, 1)}</span>
        )}
      </div>

      <div className="resource-card__body">
        <div className="resource-card__head">
          <a
            className="resource-card__host"
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {hostOf(resource.url)}
          </a>
          <span className="resource-type">{resource.type}</span>
        </div>

        <h3 className="resource-card__title">
          <a href={resource.url} target="_blank" rel="noopener noreferrer">
            {/* Icon inside the text flow, not a flex child — on a title that
                wraps, a flex icon would land alone on the last line. */}
            {resource.name} <ExternalLink size={13} />
          </a>
        </h3>

        <p className="resource-card__text">{resource.description}</p>

        {resource.skills.length > 0 && (
          <div className="resource-card__tags">
            {resource.skills.map((skill) => (
              <span key={skill} className="skill-tag skill-tag--static">
                <SkillIcon skill={skill} size={13} />
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
