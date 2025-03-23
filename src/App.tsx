import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from './components/ui/ThemeProvider'
import './App.css'

function App() {
  // Check for saved theme preference or use system default
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'system'
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (savedTheme === 'system' && prefersDark)) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  return (
    <ThemeProvider defaultTheme="system">
      <Outlet />
    </ThemeProvider>
  )
}

export default App
