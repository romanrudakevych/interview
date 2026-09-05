import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiReactrouter,
  SiNextdotjs,
  SiRedux,
  SiGit,
  SiDocker,
  SiKubernetes,
  SiWebpack,
} from "react-icons/si";
import { GitBranch, Network, Workflow } from "lucide-react";

// Maps each skill name to its icon component and a brand-ish color used for
// small accents (tag backgrounds, technology header icon, etc).
export const SKILL_META = {
  HTML: { icon: SiHtml5, color: "#E44D26" },
  CSS: { icon: SiCss, color: "#264DE4" },
  JavaScript: { icon: SiJavascript, color: "#F0DB4F" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  React: { icon: SiReact, color: "#61DAFB" },
  "React Router": { icon: SiReactrouter, color: "#CA4245" },
  "Next.js": { icon: SiNextdotjs, color: "#000000" },
  Redux: { icon: SiRedux, color: "#764ABC" },
  Git: { icon: SiGit, color: "#F05032" },
  Docker: { icon: SiDocker, color: "#2496ED" },
  Kubernetes: { icon: SiKubernetes, color: "#326CE5" },
  "CI/CD": { icon: Workflow, color: "#7C3AED" },
  Webpack: { icon: SiWebpack, color: "#8DD6F9" },
  Networks: { icon: Network, color: "#0EA5E9" },
};

export function SkillIcon({ skill, size = 16, ...props }) {
  const meta = SKILL_META[skill];
  const Icon = meta?.icon ?? GitBranch;
  return <Icon size={size} color={meta?.color} {...props} />;
}
