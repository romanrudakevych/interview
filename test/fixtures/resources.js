// Resource fixtures, in the shape scripts/import-resources.mjs generates.
// Ids are upstream UUIDs here, not array positions — the opposite of the
// questions/tasks rule, and the reason these are safe to hard-code.
export const resources = [
  {
    id: "aaaaaaaa-0000-0000-0000-000000000001",
    name: "MDN Web Docs",
    description: "Reference documentation for the web platform.",
    url: "https://developer.mozilla.org/en-US/",
    type: "Документация",
    skills: ["JavaScript", "HTML"],
    image: "https://cdn.example.com/mdn.png",
  },
  {
    id: "aaaaaaaa-0000-0000-0000-000000000002",
    name: "Flexbox Froggy",
    description: "A game for learning CSS flexbox.",
    url: "https://www.flexboxfroggy.com/",
    type: "Игра",
    skills: ["CSS"],
    image: null,
  },
  {
    id: "aaaaaaaa-0000-0000-0000-000000000003",
    name: "You Don't Know JS",
    description: "Book series on JavaScript internals.",
    url: "not a url",
    type: "Книга",
    skills: [],
    image: null,
  },
];
