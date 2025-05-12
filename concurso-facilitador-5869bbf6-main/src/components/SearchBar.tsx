
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch?: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // Optional: real-time search as the user types
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto relative">
      <div className="relative flex items-center">
        <Input
          type="text"
          placeholder="Busque por cargo, órgão ou local..."
          className="w-full pl-10 pr-20 py-6 h-14 rounded-full border-input shadow-soft text-foreground"
          value={searchTerm}
          onChange={handleChange}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Button
          type="submit"
          variant="default"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-1"
        >
          Buscar
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
