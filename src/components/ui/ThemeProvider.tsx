import { createContext, useContext, useEffect, useState } from 'react';
import React from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

// Helper function to get the initial theme
const getInitialTheme = (defaultTheme: Theme): Theme => {
  // Check localStorage
  const storedTheme = localStorage.getItem('theme') as Theme;
  if (storedTheme) {
    return storedTheme;
  }
  // If no stored theme, return default
  return defaultTheme;
};

// Helper function to apply theme to document
const applyThemeToDocument = (theme: Theme) => {
  const root = window.document.documentElement;
  
  // Remove existing theme classes
  root.classList.remove('light', 'dark');
  
  // Apply the appropriate theme
  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    root.classList.add(systemTheme);
  } else {
    root.classList.add(theme);
  }
  

};

export function ThemeProvider({
  children,
  defaultTheme = 'system',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme(defaultTheme));
  
  // Apply theme whenever it changes
  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'system') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = () => {
      console.log('System theme changed, applying new theme');
      applyThemeToDocument('system');
    };
    
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [theme]);

  // Initialize theme on mount
  useEffect(() => {
   
    applyThemeToDocument(theme);
  }, []);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      console.log('Setting new theme:', newTheme);
      localStorage.setItem('theme', newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
    
  return context;
}; 