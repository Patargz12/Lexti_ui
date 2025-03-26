import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'


// Initialize theme from localStorage before rendering
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme') || 'system'
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  if (savedTheme === 'dark' || (savedTheme === 'system' && prefersDark)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Execute theme initialization
initializeTheme()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
