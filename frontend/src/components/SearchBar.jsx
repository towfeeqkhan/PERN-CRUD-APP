import { Search } from "lucide-react";

function SearchBar({ search, setSearch }) {
  return (
    <div className="relative">
      <Search
        size={15}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
      />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="w-full rounded-lg border border-slate-700 bg-slate-800/80 py-1.5 pl-9 pr-3 text-xs text-slate-300 outline-none transition-all focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 sm:w-44"
      />
    </div>
  );
}

export default SearchBar;
