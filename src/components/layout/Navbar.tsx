import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Button } from '../common/Button';

const navItems = [
  { label: 'Search', path: '/search' },
  { label: 'History', path: '/history' },
  { label: 'Documents', path: '/documents' },
  { label: 'Research Paths', path: '/research' },
  { label: 'Chat', path: '/chat' },
];

interface NavbarProps {
  activeNavItem?: string; // Optional prop to highlight a specific nav item
}

export function Navbar({ activeNavItem }: NavbarProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  // Determine if an item is active based on either the activeNavItem prop or the current path
  const isActive = (item: { label: string; path: string }) => {
    if (activeNavItem) {
      return item.label === activeNavItem;
    }
    return currentPath === item.path;
  };

  return (
    <nav className="flex fixed top-0 w-full justify-between items-center px-8 mx-4 py-5 dark:border-gray-700 bg-white dark:bg-gray-900 z-10">
      <div className="flex items-center space-x-2">
      {/* {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
              isActive(item)
                ? 'text-primary-500 bg-gray-100 dark:text-primary-400 dark:bg-gray-800'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {item.label}
          </Link>
        ))} */}
      </div>

      <div className="flex items-center space-x-4 mr-12">
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