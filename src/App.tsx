import { ThemeProvider } from './components/ui/ThemeProvider'
import { Router } from '@/routes/router'
import { ThemeDebug } from './components/ui/ThemeDebug'
import './App.css'

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Router />
      {/* <ThemeDebug /> */}
    </ThemeProvider>
  )
}

export default App
