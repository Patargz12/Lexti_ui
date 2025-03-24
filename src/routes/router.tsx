import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { RootLayout } from '@/layouts/RootLayout';
import { Home } from '@/pages/Home';
import { MainPage } from '@/pages/';

export function Router() {
  // Get the saved theme from localStorage or use system default
  const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | 'system' || 'system';
  
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme={savedTheme}>
        <Routes>
          <Route path="/" element={<MainPage activeLink="Chat" />} />
          <Route element={<RootLayout />}>
            <Route path="/search" element={<Home />} />
            <Route path="/history" element={<div>History Page</div>} />
            <Route path="/documents" element={<div>Documents Page</div>} />
            <Route path="/research" element={<div>Research Paths Page</div>} />
            <Route path="/chat" element={<div>Chat Page</div>} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
} 