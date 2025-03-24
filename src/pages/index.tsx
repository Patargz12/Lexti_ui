import { SearchBar } from '@/components/common/SearchBar';
import { LexibeanBanner } from '@/assets';
import { Navbar } from '@/components/layout/Navbar';

interface SplashPageProps {
  activeLink: string;
}

export function MainPage({ activeLink }: SplashPageProps) {
  return (
   <>
    <Navbar activeNavItem={activeLink} />

<div className="flex flex-col items-center justify-center min-h-[100vh] bg-white dark:bg-gray-900 py-16 px-4">
  <div className="">
    <img src = {LexibeanBanner} className = "h-32 w-auto" />
  </div>
  
  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
    Your Legal Search Engine
  </p>
  
  <SearchBar />
</div>
   </>
  );
} 