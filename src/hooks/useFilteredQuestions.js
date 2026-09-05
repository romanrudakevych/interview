import { useMemo } from "react";
import { useQuestions } from "../context/QuestionsContext.jsx";

function matchesDifficulty(difficulty, ranges) {
  if (ranges.length === 0) return true;
  return ranges.some((range) => {
    const [min, max] = range.split("-").map(Number);
    return difficulty >= min && difficulty <= max;
  });
}

function matchesQuery(question, query) {
  if (!query.trim()) return true;
  const q = query.trim().toLowerCase();
  const inText = question.question.toLowerCase().includes(q);
  const inKeywords = question.keywords.some((k) => k.toLowerCase().includes(q));
  return inText || inKeywords;
}

export function filterQuestions(questions, filters) {
  return questions.filter((question) => {
    if (!matchesQuery(question, filters.query)) return false;

    if (filters.skills.length > 0 && !question.skills.some((s) => filters.skills.includes(s))) {
      return false;
    }

    if (!matchesDifficulty(question.difficulty, filters.difficultyRanges)) return false;

    if (filters.ratings.length > 0 && !filters.ratings.includes(question.rating)) return false;

    if (filters.status === "learned" && question.status !== "learned") return false;
    if (filters.status === "not_learned" && question.status !== "not_learned") return false;

    if (filters.favoriteOnly && !question.favorite) return false;

    return true;
  });
}

export function useFilteredQuestions() {
  const { questions, filters } = useQuestions();

  const filtered = useMemo(() => filterQuestions(questions, filters), [questions, filters]);

  return filtered;
}
