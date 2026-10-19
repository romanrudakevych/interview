import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SKILLS } from "../data/skills.js";
import { SKILL_META, SkillIcon } from "./skillIcons.jsx";

describe("SKILL_META", () => {
  it("covers every skill in SKILLS", () => {
    // A skill with no entry renders the generic fallback, which looks like a
    // bug rather than a design choice — so this is the thing to catch when a
    // 15th skill is added.
    const missing = SKILLS.filter((skill) => !SKILL_META[skill]);
    expect(missing).toEqual([]);
  });

  it("has no entries for skills that no longer exist", () => {
    expect(Object.keys(SKILL_META).filter((k) => !SKILLS.includes(k))).toEqual([]);
  });

  it("gives every entry an icon component and a color", () => {
    for (const [skill, meta] of Object.entries(SKILL_META)) {
      // lucide-react icons are memo/forwardRef objects, react-icons are plain
      // functions — both are renderable, which the per-skill tests below prove.
      expect(meta.icon, skill).toBeTruthy();
      expect(["function", "object"], skill).toContain(typeof meta.icon);
      expect(meta.color, skill).toMatch(/^#[0-9a-fA-F]{6}$/);
    }
  });
});

describe("SkillIcon", () => {
  it.each(SKILLS)("renders an svg for %s", (skill) => {
    const { container } = render(<SkillIcon skill={skill} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("falls back to a generic icon for an unknown skill instead of throwing", () => {
    // Task languages are passed through here too, so this path is live: a task
    // tagged with a language that is not a skill still needs an icon.
    const { container } = render(<SkillIcon skill="Fortran" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("lucide-git-branch");
    // No brand colour to borrow, so it inherits the surrounding text colour.
    expect(svg).toHaveAttribute("stroke", "currentColor");
  });

  it("falls back when no skill is given at all", () => {
    const { container } = render(<SkillIcon />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("applies the skill's brand colour", () => {
    // The two icon libraries express it differently — react-icons as `color`,
    // lucide as `stroke` — so both mappings are worth pinning.
    const { container: brand } = render(<SkillIcon skill="React" />);
    expect(brand.querySelector("svg")).toHaveAttribute("color", SKILL_META.React.color);

    const { container: lucide } = render(<SkillIcon skill="CI/CD" />);
    expect(lucide.querySelector("svg")).toHaveAttribute("stroke", SKILL_META["CI/CD"].color);
  });

  it("defaults to size 16 and honours an override", () => {
    const { container: small } = render(<SkillIcon skill="React" />);
    expect(small.querySelector("svg")).toHaveAttribute("height", "16");

    const { container: big } = render(<SkillIcon skill="React" size={36} />);
    expect(big.querySelector("svg")).toHaveAttribute("height", "36");
  });

  it("passes extra props through, which is how TaskCard labels its languages", () => {
    // react-icons turns `title` into a <title> child (an accessible name);
    // lucide passes it through as an attribute.
    const { container: brand } = render(<SkillIcon skill="JavaScript" title="JavaScript" />);
    expect(brand.querySelector("svg title")).toHaveTextContent("JavaScript");

    const { container: lucide } = render(<SkillIcon skill="Networks" title="Networks" />);
    expect(lucide.querySelector("svg")).toHaveAttribute("title", "Networks");
  });
});
