// The fixed list of skill tags, kept in its own module so that UI code can
// import it without pulling in the 11 MB question bank. `questions.js`
// re-exports it, so this stays the single source of truth.
export const SKILLS = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "React Router",
  "Next.js",
  "Redux",
  "Git",
  "Docker",
  "Kubernetes",
  "CI/CD",
  "Webpack",
  "Networks",
];
