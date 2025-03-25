import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RootLayout } from '@/layouts/RootLayout';
import { Home } from '@/pages/Home';
import { MainPage } from '@/pages/';

export function Router() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
} 