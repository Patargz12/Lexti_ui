import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Button } from '../common/Button';
import { Logo } from '../common/Logo';
import { LexibeanBanner, LexibeanLogo } from '@/assets';  

interface SearchNavbarProps {
  onSearch?: (query: string) => void;
  
}

export function SearchNavbar({ onSearch, }: SearchNavbarProps) {


  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };


  return (
    <nav className="flex fixed top-0 w-full justify-between items-center px-4 py-3 border-b dark:border-gray-700 bg-white dark:bg-gray-900 z-10">
      <div className="flex items-center mr-4">
        <Link to="/">
          <img src = {LexibeanLogo} className = "h-14 w-auto" />
        </Link>
        <div className="flex-1 w-full md:w-96 lg:w-[32rem] xl:w-[34rem] mx-6">
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
              className="w-full px-4 py-2 pl-10 pr-4 border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </form>
      </div>
      </div>

      
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <Button size="sm">
          Log In
        </Button>
        <Button size="sm">
          Sign Up
        </Button>
      </div>
    </nav>
  );
} 