import { useEffect, useState } from "react";
import { loadQuestionBody, peekQuestionBody } from "../utils/questionBodies.js";

/**
 * Loads a question's answer body on demand.
 *
 * Pass `null` to skip loading entirely — that is how collapsed cards and
 * unrevealed interview questions stay inert. When the body's chunk is already
 * in memory it is returned on the first render, so expanding a second card in
 * the same id range shows no loading state at all.
 */
export function useQuestionBody(id) {
  // Already-cached bodies and the null case are derived during render, so the
  // effect below only ever handles the genuinely async path.
  const cached = id == null ? null : peekQuestionBody(id);

  // Results are tagged with the id they belong to. That way a result left over
  // from a previous id is simply ignored on render — no state reset needed, and
  // therefore no setState inside the effect for the synchronous cases.
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Nothing to fetch: no id, or the chunk is already in memory.
    if (id == null || peekQuestionBody(id)) return;

    let active = true;
    loadQuestionBody(id)
      .then((body) => {
        if (active) setResult({ id, body, error: null });
      })
      .catch((error) => {
        if (active) setResult({ id, body: null, error });
      });

    // Guards against a fetch landing after unmount or after `id` moved on.
    return () => {
      active = false;
    };
  }, [id]);

  const forThisId = result?.id === id ? result : null;
  const body = cached ?? forThisId?.body ?? null;
  const error = forThisId?.error ?? null;

  return { body, error, loading: id != null && body === null && error === null };
}
