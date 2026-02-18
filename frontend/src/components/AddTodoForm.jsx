import { Loader2, Plus } from "lucide-react";

function AddTodoForm({ inputRef, newTodo, setNewTodo, adding, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="border-b border-slate-700/50 p-5">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-slate-200 placeholder-slate-500 outline-none transition-all duration-200 focus:border-indigo-500/50 focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/20"
          disabled={adding}
        />
        <button
          type="submit"
          disabled={adding}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {adding ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Plus size={18} strokeWidth={2.5} />
          )}
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>
    </form>
  );
}

export default AddTodoForm;
