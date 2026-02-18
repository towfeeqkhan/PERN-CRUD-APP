import { ClipboardList } from "lucide-react";

function EmptyState({ filter }) {
  const messages = {
    all: "No todos yet. Add one above!",
    active: "No active todos. You're all caught up!",
    completed: "No completed todos yet.",
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 text-slate-500">
      <ClipboardList
        size={56}
        strokeWidth={1.2}
        className="mb-4 text-indigo-400/40"
      />
      <p className="text-lg font-medium text-slate-400">{messages[filter]}</p>
      <p className="mt-1 text-sm text-slate-500">
        {filter === "all"
          ? "Your tasks will appear here"
          : "Try a different filter"}
      </p>
    </div>
  );
}

export default EmptyState;
