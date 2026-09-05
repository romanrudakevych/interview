import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical, ExternalLink, GraduationCap, RotateCcw, Heart } from "lucide-react";
import { useQuestionActions } from "../hooks/useQuestionActions.js";

export function QuestionCardMenu({ question }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { learn, repeat, toggleFavorite, canRepeat } = useQuestionActions();

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const repeatEnabled = canRepeat(question);

  return (
    <div className="card-menu" ref={menuRef}>
      <button
        type="button"
        className="card-menu__trigger"
        onClick={() => setOpen((o) => !o)}
        aria-label="Question actions"
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div className="card-menu__dropdown">
          <button
            type="button"
            className="card-menu__item"
            onClick={() => {
              setOpen(false);
              navigate(`/knowledge-base/questions/${question.id}`);
            }}
          >
            <ExternalLink size={15} />
            More
          </button>
          <button
            type="button"
            className="card-menu__item"
            onClick={() => {
              learn(question.id);
              setOpen(false);
            }}
          >
            <GraduationCap size={15} />
            Learn
          </button>
          <button
            type="button"
            className="card-menu__item"
            disabled={!repeatEnabled}
            onClick={() => {
              if (!repeatEnabled) return;
              repeat(question.id);
              setOpen(false);
            }}
          >
            <RotateCcw size={15} />
            Repeat
          </button>
          <button
            type="button"
            className="card-menu__item"
            onClick={() => {
              toggleFavorite(question.id);
              setOpen(false);
            }}
          >
            <Heart size={15} fill={question.favorite ? "currentColor" : "none"} />
            {question.favorite ? "Unfavorite" : "Favorite"}
          </button>
        </div>
      )}
    </div>
  );
}
