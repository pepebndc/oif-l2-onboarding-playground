import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { 
  Layers, 
  Settings, 
  ArrowRightLeft, 
  Menu, 
  X,
  Shield
} from 'lucide-react'
import { useState } from 'react'
import NewNetworkOnboarding from './pages/NewNetworkOnboarding'
import SolverDashboard from './pages/SolverDashboard'
import UserBridge from './pages/UserBridge'
import Landing from './pages/Landing'

const navItems = [
  { path: '/onboarding', label: 'Onboard Network', icon: Layers },
  { path: '/dashboard', label: 'Solver Dashboard', icon: Settings },
  { path: '/bridge', label: 'Bridge', icon: ArrowRightLeft },
]

function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  
  if (location.pathname === '/') return null

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-oz-blue to-oz-accent flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg tracking-tight">
              OIF <span className="text-oz-text font-normal">L2 Onboarding</span>
            </span>
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
                      : 'text-oz-text hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
          </div>

          {/* Connect Wallet Button */}
          <div className="hidden md:block">
            <button className="px-4 py-2 rounded-lg bg-oz-blue hover:bg-oz-blue/90 text-white text-sm font-medium transition-all duration-200">
              Connect Wallet
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-oz-text hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden border-t border-oz-border">
          <div className="px-4 py-3 space-y-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-oz-blue/10 text-oz-blue'
                      : 'text-oz-text hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
            <button className="w-full mt-3 px-4 py-2.5 rounded-lg bg-oz-blue hover:bg-oz-blue/90 text-white text-sm font-medium">
              Connect Wallet
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default function App() {
  return (
    <div className="min-h-screen grid-pattern">
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
  )
}

