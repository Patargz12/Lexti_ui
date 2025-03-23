import React from 'react';
import { SearchBar } from '@/components/common/SearchBar';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';


interface SplashPageProps {
  activeLink: string;
}

export function SplashPage({ activeLink }: SplashPageProps) {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      {/* Use the standard Navbar */}
      <Navbar activeNavItem={activeLink} />
      
      {/* Main splash content */}
      <div className="flex flex-col items-center justify-center flex-1 py-16 px-4">
        <div className="mb-8">
          
        </div>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Your Legal Search Engine
        </p>
        
        <div className="w-full max-w-xl">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
    </div>
  );
} 