import { Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterClick?: () => void;
}

export function SearchBar({ onSearch, onFilterClick }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex gap-2">
      <div className="flex-1 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search dog-friendly places..."
          className="w-full h-12 pl-12 pr-4 rounded-xl bg-card border border-border shadow-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>
      <button
        type="button"
        onClick={onFilterClick}
        className="w-12 h-12 rounded-xl bg-card border border-border shadow-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
      >
        <SlidersHorizontal className="w-5 h-5" />
      </button>
    </form>
  );
}
