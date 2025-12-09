import { Routes, Route } from 'react-router-dom'
import { useState, useEffect, createContext, useContext } from 'react'
import NewNetworkOnboarding from './pages/NewNetworkOnboarding'
import SolverDashboard from './pages/SolverDashboard'
import UserBridge from './pages/UserBridge'
import Landing from './pages/Landing'
import Layout from './components/Layout'

// Theme Context
const ThemeContext = createContext()

export function useTheme() {
  return useContext(ThemeContext)
}

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first, then default to light
    const saved = localStorage.getItem('oz-theme')
    if (saved) return saved === 'dark'
    return false
  })

  useEffect(() => {
    // Update document class and localStorage
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('oz-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => setIsDark(prev => !prev)

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/onboarding" element={<NewNetworkOnboarding />} />
          <Route path="/dashboard" element={<SolverDashboard />} />
          <Route path="/bridge" element={<UserBridge />} />
        </Routes>
      </Layout>
    </ThemeContext.Provider>
  )
}
