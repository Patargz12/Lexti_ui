import { useTheme } from './ThemeProvider';


// Helper function to check theme status
// const debugTheme = () => {
//   const html = document.documentElement;
//   const hasDarkClass = html.classList.contains('dark');
//   const hasLightClass = html.classList.contains('light');
//   const storedTheme = localStorage.getItem('theme');
//   const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
//   console.log({
//     'HTML classList': Array.from(html.classList),
//     'Has dark class': hasDarkClass, 
//     'Has light class': hasLightClass,
//     'localStorage theme': storedTheme,
//     'System prefers dark': systemPrefersDark,
//     'Body background': window.getComputedStyle(document.body).backgroundColor
//   });
// };

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  

  
  // Toggle between light and dark modes
  const toggleTheme = () => {
    console.log("Current theme:", theme);
    
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    console.log("Switching to:", newTheme);
    
    // Update theme in localStorage directly too
    localStorage.setItem('theme', newTheme);
    
    // Apply the theme to the document
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
    
    // Update state
    setTheme(newTheme);
    
    console.log("Applied theme:", newTheme, "Dark class exists:", document.documentElement.classList.contains('dark'));
    // Run debug after toggle
    setTimeout(debugTheme, 100);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        // Sun icon for dark mode
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-yellow-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
          />
        </svg>
      ) : (
        // Moon icon for light mode
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-indigo-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
          />
        </svg>
      )}
    </button>
  );
} 