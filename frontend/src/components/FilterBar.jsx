function FilterBar({ filter, setFilter, counts }) {
  const filters = [
    { key: "all", label: "All", count: counts.all },
    { key: "active", label: "Active", count: counts.active },
    { key: "completed", label: "Done", count: counts.completed },
  ];

  return (
    <div className="flex items-center gap-1 rounded-xl bg-slate-800/80 p-1">
      {filters.map((f) => (
        <button
          key={f.key}
          onClick={() => setFilter(f.key)}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
            filter === f.key
              ? "bg-slate-700 text-indigo-400 shadow-sm shadow-black/20"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          {f.label}
          <span
            className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none ${
              filter === f.key
                ? "bg-indigo-500/20 text-indigo-400"
                : "bg-slate-700/60 text-slate-500"
            }`}
          >
            {f.count}
          </span>
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
