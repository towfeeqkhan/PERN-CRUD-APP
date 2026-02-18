import { ListTodo } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import api from "./api/todoApi";
import AddTodoForm from "./components/AddTodoForm";
import EmptyState from "./components/EmptyState";
import FilterBar from "./components/FilterBar";
import SearchBar from "./components/SearchBar";
import SkeletonLoader from "./components/SkeletonLoader";
import TodoItem from "./components/TodoItem";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await api.getAll();
      setTodos(data);
    } catch {
      toast.error("Failed to load todos");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const trimmed = newTodo.trim();
    if (!trimmed) {
      toast.error("Please enter a todo");
      inputRef.current?.focus();
      return;
    }
    setAdding(true);
    try {
      const data = await api.create(trimmed);
      setTodos((prev) => [...prev, data.todo]);
      setNewTodo("");
      toast.success("Todo added!");
      inputRef.current?.focus();
    } catch {
      toast.error("Failed to add todo");
    } finally {
      setAdding(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      const data = await api.toggle(id);
      setTodos((prev) => prev.map((t) => (t.id === id ? data.todo : t)));
      toast.success(
        data.todo.completed ? "Marked as done!" : "Marked as active",
        { icon: data.todo.completed ? "✅" : "🔄" },
      );
    } catch {
      toast.error("Failed to update todo");
    }
  };

  const handleUpdate = async (id, description, completed) => {
    try {
      const data = await api.update(id, description, completed);
      setTodos((prev) => prev.map((t) => (t.id === id ? data.todo : t)));
      toast.success("Todo updated!");
    } catch {
      toast.error("Failed to update todo");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
      toast.success("Todo deleted", { icon: "🗑️" });
    } catch {
      toast.error("Failed to delete todo");
    }
  };

  const filteredTodos = todos.filter((t) => {
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "active"
          ? !t.completed
          : t.completed;
    const matchesSearch = t.description
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const counts = {
    all: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-8 sm:py-16">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
          style: {
            borderRadius: "12px",
            background: "#1e293b",
            color: "#e2e8f0",
            fontSize: "14px",
            fontWeight: "500",
            padding: "12px 16px",
            border: "1px solid #334155",
          },
          success: {
            style: {
              background: "#064e3b",
              color: "#d1fae5",
              border: "1px solid #065f46",
            },
          },
          error: {
            style: {
              background: "#7f1d1d",
              color: "#fecaca",
              border: "1px solid #991b1b",
            },
          },
        }}
      />

      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center justify-center rounded-2xl bg-indigo-500/10 p-3 ring-1 ring-indigo-500/20">
            <ListTodo size={32} className="text-indigo-400" strokeWidth={1.8} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-100">
            My Todos
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Stay organized, stay productive
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 shadow-2xl shadow-black/30 backdrop-blur-sm">
          <AddTodoForm
            inputRef={inputRef}
            newTodo={newTodo}
            setNewTodo={setNewTodo}
            adding={adding}
            onSubmit={handleAdd}
          />

          {/* Toolbar */}
          <div className="flex flex-col gap-3 border-b border-slate-700/50 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
            <FilterBar filter={filter} setFilter={setFilter} counts={counts} />
            <SearchBar search={search} setSearch={setSearch} />
          </div>

          {/* Todo list */}
          <div className="max-h-[calc(100vh-380px)] min-h-[200px] overflow-y-auto p-4">
            {loading ? (
              <SkeletonLoader />
            ) : filteredTodos.length === 0 ? (
              <EmptyState filter={filter} />
            ) : (
              <div className="space-y-2">
                {filteredTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {!loading && todos.length > 0 && (
            <div className="flex items-center justify-between border-t border-slate-700/50 px-5 py-3">
              <p className="text-xs text-slate-500">
                {counts.active} {counts.active === 1 ? "task" : "tasks"}{" "}
                remaining
              </p>
              <p className="text-xs text-slate-500">
                {counts.completed} completed
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
