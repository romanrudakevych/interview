import { useCallback } from "react";
import { useQuestions } from "../context/QuestionsContext.jsx";

// Single source of truth for the Learn / Repeat / Favorite behaviour so the
// question card menu and the details page never drift apart.
export function useQuestionActions() {
  const { updateProgress } = useQuestions();

  const learn = useCallback(
    (id) => {
      updateProgress(id, (current) => ({
        ...current,
        learnedCount: Math.min(current.learnedCount + 1, current.learnedGoal),
      }));
    },
    [updateProgress]
  );

  const repeat = useCallback(
    (id) => {
      updateProgress(id, (current) => ({
        ...current,
        learnedCount: 0,
      }));
    },
    [updateProgress]
  );

  const toggleFavorite = useCallback(
    (id) => {
      updateProgress(id, (current) => ({
        ...current,
        favorite: !current.favorite,
      }));
    },
    [updateProgress]
  );

  const canRepeat = useCallback((question) => question.learnedCount > 0, []);

  return { learn, repeat, toggleFavorite, canRepeat };
}
