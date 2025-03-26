import { useState } from 'react';
import { Button } from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const toSearch = () => {
    navigate('/search');
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
    console.log(`Searching for: ${searchTerm}`);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search legal documents..."
            className="w-full px-4 py-3 pl-10 pr-4 border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </form>
      
      <div className="flex justify-center space-x-4 mt-5">
        <Button 
          variant="default" 
          size="md"
          onClick={toSearch}
        >
        
          Lexi Search
          
        </Button>
        <Button 
          variant="primary" 
          size="md" 
          className=" border-gray-800 hover:bg-gray-900"
          onClick={() => onSearch && onSearch(`AI:${searchTerm}`)}
        >
          Ask Lexibean
        </Button>
      </div>
    </div>
  );
} 