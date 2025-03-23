import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'

export function RootLayout() {
 
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col">
      <Navbar />
      <main className="flex-1 mt-16">
        <Outlet />
      </main>
    
    </div>
  )
}

export default RootLayout 