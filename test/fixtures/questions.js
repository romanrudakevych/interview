// Hand-written question fixtures.
//
// Never import src/data/questions.js here: it is 11 MB, Node-only, and the whole
// point of the generated split is that client code never sees it. These eight
// entries span every filter axis instead — two skills plus one multi-skill
// entry, all four difficulty buckets, ratings 1–5, one favorite, one learned.

// The shape QuestionsContext produces: the generated index fields plus the
// progress fields merged in from localStorage.
export function makeQuestion(overrides = {}) {
  return {
    id: 1,
    question: "Что такое замыкание?",
    skills: ["JavaScript"],
    keywords: ["closure"],
    difficulty: 5,
    rating: 3,
    status: "not_learned",
    favorite: false,
    learnedCount: 0,
    learnedGoal: 3,
    ...overrides,
  };
}

export const questions = [
  makeQuestion({
    id: 1,
    question: "What is a closure?",
    skills: ["JavaScript"],
    keywords: ["closure", "scope"],
    difficulty: 2, // bucket 1-3
    rating: 1,
  }),
  makeQuestion({
    id: 2,
    question: "What is the event loop?",
    skills: ["JavaScript"],
    keywords: ["async", "loop"],
    difficulty: 5, // bucket 4-6
    rating: 2,
  }),
  makeQuestion({
    id: 3,
    question: "What is a React hook?",
    skills: ["React"],
    keywords: ["hooks", "state"],
    difficulty: 7, // bucket 7-8
    rating: 3,
    favorite: true,
  }),
  makeQuestion({
    id: 4,
    question: "How does reconciliation work?",
    skills: ["React"],
    keywords: ["virtual dom"],
    difficulty: 10, // bucket 9-10
    rating: 5,
    // Learned: count has reached the goal.
    status: "learned",
    learnedCount: 3,
  }),
  // Tagged with two skills — the case that must match a filter on *either*.
  makeQuestion({
    id: 5,
    question: "How do you type a React component's props?",
    skills: ["React", "TypeScript"],
    keywords: ["props", "generics"],
    difficulty: 6,
    rating: 4,
  }),
  makeQuestion({
    id: 6,
    question: "What is a discriminated union?",
    skills: ["TypeScript"],
    keywords: ["union", "narrowing"],
    difficulty: 8,
    rating: 4,
    learnedCount: 1, // partially learned — canRepeat is true
  }),
  makeQuestion({
    id: 7,
    question: "What does `git rebase` do?",
    skills: ["Git"],
    keywords: ["rebase", "history"],
    difficulty: 4,
    rating: 5,
  }),
  // A skill nothing else uses, for the "chip only renders when matched" checks.
  makeQuestion({
    id: 8,
    question: "What is a Docker layer?",
    skills: ["Docker"],
    keywords: ["layers", "cache"],
    difficulty: 3,
    rating: 2,
  }),
];

export const bodies = {
  1: { shortAnswer: "A function plus its captured scope.", longAnswer: "Long form.", codeExample: "const f = () => 1;" },
  2: { shortAnswer: "The queue that drives async work.", longAnswer: "Long form.", codeExample: undefined },
};
