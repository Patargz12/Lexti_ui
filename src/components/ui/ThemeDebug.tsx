import { useTheme } from './ThemeProvider';
import { useEffect, useState } from 'react';

interface DebugInfo {
  'HTML classes': string;
  'Has dark class': boolean;
  'Has light class': boolean;
  'Current theme state': string;
  'localStorage theme': string | null;
  'System prefers dark': boolean;
  'Body background': string;
}

export function ThemeDebug() {
  const { theme, setTheme } = useTheme();
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({
    'HTML classes': '',
    'Has dark class': false,
    'Has light class': false,
    'Current theme state': '',
    'localStorage theme': null,
    'System prefers dark': false,
    'Body background': ''
  });
  
  const updateDebugInfo = () => {
    const html = document.documentElement;
    const hasDarkClass = html.classList.contains('dark');
    const hasLightClass = html.classList.contains('light');
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const bgColor = window.getComputedStyle(document.body).backgroundColor;
    
    setDebugInfo({
      'HTML classes': Array.from(html.classList).join(', '),
      'Has dark class': hasDarkClass, 
      'Has light class': hasLightClass,
      'Current theme state': theme,
      'localStorage theme': storedTheme,
      'System prefers dark': systemPrefersDark,
      'Body background': bgColor
    });
  };
  
  // Update debug info on mount and when theme changes
  useEffect(() => {
    updateDebugInfo();
    
    // Also update on a timer to catch external changes
    const interval = setInterval(updateDebugInfo, 1000);
    return () => clearInterval(interval);
  }, [theme]);
  
  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 text-xs max-w-xs">
      <h3 className="font-bold mb-2">Theme Debug</h3>
      
      <div className="space-y-1">
        {Object.entries(debugInfo).map(([key, value]) => (
          <div key={key} className="flex justify-between">
            <span className="font-medium">{key}:</span>
            <span className="ml-2">{typeof value === 'boolean' ? value.toString() : value}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 space-y-2">
        <button 
          onClick={() => setTheme('light')}
          className="block w-full px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded"
        >
          Force Light
        </button>
        <button 
          onClick={() => setTheme('dark')}
          className="block w-full px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded"
        >
          Force Dark
        </button>
        <button 
          onClick={() => {
            localStorage.removeItem('theme');
            window.location.reload();
          }}
          className="block w-full px-3 py-1 text-xs bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded"
        >
          Reset & Reload
        </button>
      </div>
    </div>
  );
} 