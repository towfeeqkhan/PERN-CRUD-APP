import { Check, Circle, CircleCheckBig, Pencil, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.description);
  const [isDeleting, setIsDeleting] = useState(false);
  const editRef = useRef(null);

  useEffect(() => {
    if (isEditing && editRef.current) editRef.current.focus();
  }, [isEditing]);

  const handleSave = () => {
    const trimmed = editText.trim();
    if (!trimmed) {
      toast.error("Todo cannot be empty");
      return;
    }
    if (trimmed === todo.description) {
      setIsEditing(false);
      return;
    }
    onUpdate(todo.id, trimmed, todo.completed);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setEditText(todo.description);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(todo.id), 250);
  };

  return (
    <div
      className={`group flex items-center gap-3 rounded-xl border px-4 py-3.5 transition-all duration-200 hover:shadow-md hover:shadow-black/10 ${
        isDeleting ? "animate-fade-out" : "animate-fade-in-up"
      } ${
        todo.completed
          ? "border-emerald-500/20 bg-emerald-500/5"
          : "border-slate-700/50 bg-slate-800/60 hover:border-indigo-500/30"
      }`}
    >
      {/* Toggle */}
      <button
        onClick={() => onToggle(todo.id)}
        className="shrink-0 transition-transform duration-200 hover:scale-110 focus:outline-none"
        aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
      >
        {todo.completed ? (
          <CircleCheckBig
            size={22}
            className="animate-checkmark text-emerald-400"
          />
        ) : (
          <Circle
            size={22}
            className="text-slate-500 transition-colors hover:text-indigo-400"
          />
        )}
      </button>

      {/* Content */}
      {isEditing ? (
        <input
          ref={editRef}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className="flex-1 rounded-lg border border-indigo-500/40 bg-slate-700 px-3 py-1.5 text-sm text-slate-100 outline-none ring-2 ring-indigo-500/30 transition-all"
        />
      ) : (
        <span
          onDoubleClick={() => {
            if (!todo.completed) setIsEditing(true);
          }}
          className={`flex-1 text-sm leading-relaxed transition-all duration-200 ${
            todo.completed
              ? "text-slate-500 line-through"
              : "cursor-pointer text-slate-200"
          }`}
          title={!todo.completed ? "Double-click to edit" : undefined}
        >
          {todo.description}
        </span>
      )}

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="rounded-lg p-1.5 text-emerald-400 transition-colors hover:bg-emerald-500/10 hover:text-emerald-300"
              aria-label="Save"
            >
              <Check size={16} />
            </button>
            <button
              onClick={() => {
                setEditText(todo.description);
                setIsEditing(false);
              }}
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-700 hover:text-slate-200"
              aria-label="Cancel"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <>
            {!todo.completed && (
              <button
                onClick={() => setIsEditing(true)}
                className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-indigo-500/10 hover:text-indigo-400"
                aria-label="Edit"
              >
                <Pencil size={15} />
              </button>
            )}
            <button
              onClick={handleDelete}
              className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
              aria-label="Delete"
            >
              <Trash2 size={15} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoItem;
