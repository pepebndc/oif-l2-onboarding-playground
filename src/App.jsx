import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { 
  Layers, 
  Settings, 
  ArrowRightLeft, 
  Menu, 
  X,
  Sun,
  Moon,
  ExternalLink
} from 'lucide-react'
import { useState, useEffect, createContext, useContext } from 'react'
import NewNetworkOnboarding from './pages/NewNetworkOnboarding'
import SolverDashboard from './pages/SolverDashboard'
import UserBridge from './pages/UserBridge'
import Landing from './pages/Landing'

// Theme Context
const ThemeContext = createContext()

export function useTheme() {
  return useContext(ThemeContext)
}

const navItems = [
  { path: '/onboarding', label: 'Onboard Network', icon: Layers },
  { path: '/dashboard', label: 'Solver Dashboard', icon: Settings },
  { path: '/bridge', label: 'Bridge', icon: ArrowRightLeft },
]

// OpenZeppelin Logo Component
function OZLogo({ className = "w-8 h-8" }) {
  return (
    <img src="/logo-oz.svg" alt="OpenZeppelin" className={className} />
  )
}

function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { isDark, toggleTheme } = useTheme()
  
  if (location.pathname === '/') return null

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 oz-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <OZLogo className="w-8 h-8" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-tight" style={{ color: 'var(--oz-text)' }}>
                OIF Tooling
              </span>
              <span className="text-xs font-medium" style={{ color: 'var(--oz-text-muted)' }}>
                OpenZeppelin
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-oz-blue/10 text-oz-blue'
                      : 'hover:bg-black/5 dark:hover:bg-white/5'
                  }`
                }
                style={({ isActive }) => ({
                  color: isActive ? 'var(--oz-blue)' : 'var(--oz-text-muted)'
                })}
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/5"
              style={{ color: 'var(--oz-text-muted)' }}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            {/* Docs link */}
            <a 
              href="https://docs.openzeppelin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/5"
              style={{ color: 'var(--oz-text-muted)' }}
            >
              Docs
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Connect Wallet Button */}
            <button className="oz-btn-primary">
              Connect Wallet
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-all"
              style={{ color: 'var(--oz-text-muted)' }}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              className="p-2 rounded-lg"
              style={{ color: 'var(--oz-text-muted)' }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden" style={{ borderTop: '1px solid var(--oz-border)' }}>
          <div className="px-4 py-3 space-y-1" style={{ background: 'var(--oz-surface)' }}>
            {navItems.map(({ path, label, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-oz-blue/10 text-oz-blue'
                      : ''
                  }`
                }
                style={({ isActive }) => ({
                  color: isActive ? 'var(--oz-blue)' : 'var(--oz-text-muted)'
                })}
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
            <button className="w-full mt-3 oz-btn-primary">
              Connect Wallet
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('oz-theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    // Update document class and localStorage
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('oz-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => setIsDark(prev => !prev)

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className="min-h-screen" style={{ background: 'var(--oz-bg)' }}>
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/onboarding" element={<NewNetworkOnboarding />} />
            <Route path="/dashboard" element={<SolverDashboard />} />
            <Route path="/bridge" element={<UserBridge />} />
          </Routes>
        </main>
      </div>
    </ThemeContext.Provider>
  )
}
