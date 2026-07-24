import { useState, type FormEvent } from "react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

const SearchBar = ({ onSearch, loading }: SearchBarProps) => {
  const [input, setInput] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (input.trim()) onSearch(input.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Buscar cidade..."
        className="flex-1 px-4 py-2.5 rounded-xl glass text-white text-sm placeholder:text-surface-500 outline-none focus:border-brand-500/50 transition-colors"
      />
      <button
        type="submit"
        disabled={loading || !input.trim()}
        className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-40 text-white text-sm font-medium transition-all duration-200 shadow-lg shadow-brand-600/20"
      >
        {loading ? "..." : "Buscar"}
      </button>
    </form>
  );
};

export default SearchBar;
