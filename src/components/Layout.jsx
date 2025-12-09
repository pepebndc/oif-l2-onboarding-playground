import { NavLink, useLocation } from 'react-router-dom'
import { 
  Layers, 
  Settings, 
  ArrowRightLeft,
  Sun,
  Moon,
  ExternalLink,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '../App'

// OpenZeppelin Logo Component
function OZLogo({ className = "w-8 h-8" }) {
  return (
    <img src="/logo-oz.svg" alt="OpenZeppelin" className={className} />
  )
}

const navItems = [
  { path: '/onboarding', label: 'Onboard Network', icon: Layers },
  { path: '/dashboard', label: 'Solver Dashboard', icon: Settings },
  { path: '/bridge', label: 'Bridge', icon: ArrowRightLeft },
]

const externalTools = [
  { href: 'https://docs.openintents.xyz', label: 'OIF Docs', icon: ExternalLink },
]

export default function Layout({ children }) {
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Don't show sidebar on landing page
  if (location.pathname === '/') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--oz-bg)' }}>
      {/* Sidebar - Desktop */}
      <aside 
        className="hidden md:flex flex-col w-64 flex-shrink-0 fixed inset-y-0 left-0 z-30"
        style={{ 
          background: 'var(--oz-card)', 
          borderRight: '1px solid var(--oz-border)' 
        }}
      >
        {/* Logo & Title */}
        <div className="p-4" style={{ borderBottom: '1px solid var(--oz-border)' }}>
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
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-3 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? ''
                      : 'hover:bg-black/5 dark:hover:bg-white/5'
                  }`
                }
                style={({ isActive }) => ({
                  background: isActive ? 'var(--oz-blue-light)' : 'transparent',
                  color: isActive ? 'var(--oz-blue)' : 'var(--oz-text-muted)'
                })}
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
          </div>

          {/* Tools Section */}
          <div className="mt-6">
            <div className="px-3 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--oz-text-muted)' }}>
                Resources
              </span>
            </div>
            <div className="space-y-1">
              {externalTools.map(({ href, label, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/5"
                  style={{ color: 'var(--oz-text-muted)' }}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-3" style={{ borderTop: '1px solid var(--oz-border)' }}>
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-xs" style={{ color: 'var(--oz-text-muted)' }}>
              v0.1.0 (Preview)
            </span>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/5"
              style={{ color: 'var(--oz-text-muted)' }}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div 
        className="md:hidden fixed top-0 left-0 right-0 z-40 oz-glass"
      >
        <div className="flex items-center justify-between px-4 h-14">
          <NavLink to="/" className="flex items-center gap-2">
            <OZLogo className="w-7 h-7" />
            <span className="font-semibold text-sm" style={{ color: 'var(--oz-text)' }}>OIF Tooling</span>
          </NavLink>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg"
              style={{ color: 'var(--oz-text-muted)' }}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg"
              style={{ color: 'var(--oz-text-muted)' }}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-30 pt-14" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div 
            className="h-full w-64 p-4 overflow-y-auto"
            style={{ background: 'var(--oz-card)' }}
          >
            {/* Navigation */}
            <div className="space-y-1">
              {navItems.map(({ path, label, icon: Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive ? '' : ''
                    }`
                  }
                  style={({ isActive }) => ({
                    background: isActive ? 'var(--oz-blue-light)' : 'transparent',
                    color: isActive ? 'var(--oz-blue)' : 'var(--oz-text-muted)'
                  })}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </NavLink>
              ))}
            </div>

            {/* Resources */}
            <div className="mt-6">
              <div className="px-3 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--oz-text-muted)' }}>
                  Resources
                </span>
              </div>
              <div className="space-y-1">
                {externalTools.map(({ href, label, icon: Icon }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium"
                    style={{ color: 'var(--oz-text-muted)' }}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64">
        {/* Mobile padding for fixed header */}
        <div className="md:hidden h-14" />
        {children}
      </main>
    </div>
  )
}

