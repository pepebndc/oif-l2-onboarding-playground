import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Layers, 
  Settings, 
  ArrowRightLeft, 
  ChevronRight,
  Zap,
  Shield,
  Globe,
  ArrowRight,
  ArrowDown,
  User,
  Wallet,
  Clock,
  CheckCircle2,
  Link2,
  Sun,
  Moon,
  ExternalLink,
  Github
} from 'lucide-react'
import { useTheme } from '../App'

const features = [
  {
    icon: Zap,
    title: 'Fast Intent Bridging',
    description: 'Leverage OIF\'s intent-based architecture for near-instant cross-chain transfers with solver front-running.'
  },
  {
    icon: Shield,
    title: 'Trustless Settlement',
    description: 'Broadcaster oracles ensure decentralized verification without single points of failure.'
  },
  {
    icon: Globe,
    title: 'Hub Connectivity',
    description: 'Connect to any HUB chain for maximum liquidity access and protocol interoperability.'
  }
]

const cards = [
  {
    path: '/onboarding',
    icon: Layers,
    title: 'Onboard Your L2',
    description: 'Deploy contracts, configure solvers, and connect your chain to the OIF ecosystem.',
    cta: 'Start Onboarding'
  },
  {
    path: '/dashboard',
    icon: Settings,
    title: 'Solver Dashboard',
    description: 'Manage liquidity, monitor performance, and configure supported tokens.',
    cta: 'Open Dashboard'
  },
  {
    path: '/bridge',
    icon: ArrowRightLeft,
    title: 'Bridge Assets',
    description: 'Transfer tokens between chains using fast intent-based bridging.',
    cta: 'Start Bridging'
  }
]

// OpenZeppelin Logo Component
function OZLogo({ className = "w-8 h-8" }) {
  return (
    <img src="/logo-oz.svg" alt="OpenZeppelin" className={className} />
  )
}

// Animated Flow Diagram Component for Inflows
function InflowDiagram() {
  const { isDark } = useTheme()
  
  return (
    <div className="oz-card p-6">
      {/* Title */}
      <div className="flex items-center gap-2 mb-6">
        <div className="p-1.5 rounded-lg" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
          <ArrowDown className="w-4 h-4" style={{ color: 'var(--oz-success)' }} />
        </div>
        <h3 className="text-lg font-semibold" style={{ color: 'var(--oz-text)' }}>Inflows to Your L2</h3>
        <span className="ml-auto text-xs px-2.5 py-1 rounded-full font-medium" 
          style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--oz-success)' }}>
          Fast Fill
        </span>
      </div>

      {/* Flow Diagram */}
      <div className="relative">
        {/* Nodes */}
        <div className="grid grid-cols-5 gap-1 md:gap-3 relative z-10">
          {/* User */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-2"
              style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
              <User className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
            </div>
            <span className="text-[10px] md:text-xs font-medium" style={{ color: 'var(--oz-text-muted)' }}>User</span>
          </div>

          {/* Third Party */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-2"
              style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px dashed rgba(245, 158, 11, 0.3)' }}>
              <Link2 className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
            </div>
            <span className="text-[10px] md:text-xs font-medium text-amber-500">3rd Party</span>
          </div>

          {/* HUB Chain */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-2"
              style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-indigo-500" />
            </div>
            <span className="text-[10px] md:text-xs font-medium" style={{ color: 'var(--oz-text-muted)' }}>HUB</span>
          </div>

          {/* Solver */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-2 relative"
              style={{ background: 'var(--oz-blue-light)', border: '1px solid rgba(78, 94, 228, 0.2)' }}>
              <Zap className="w-5 h-5 md:w-6 md:h-6" style={{ color: 'var(--oz-blue)' }} />
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: 'var(--oz-success)' }}>
                <span className="text-[8px] font-bold text-white">⚡</span>
              </div>
            </div>
            <span className="text-[10px] md:text-xs font-medium" style={{ color: 'var(--oz-text-muted)' }}>Solver</span>
          </div>

          {/* Your L2 */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-2"
              style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <Layers className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" />
            </div>
            <span className="text-[10px] md:text-xs font-medium" style={{ color: 'var(--oz-text-muted)' }}>Your L2</span>
          </div>
        </div>

        {/* Animated Flow Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ top: '28px' }}>
          <defs>
            <linearGradient id="flowGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
              <stop offset="20%" stopColor="#f59e0b" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          
          <line x1="10%" y1="28" x2="90%" y2="28" stroke="url(#flowGradient1)" strokeWidth="2" strokeDasharray="4 4" className="opacity-30" />
        </svg>

        {/* Animated Tokens */}
        <div className="absolute top-5 left-[10%] right-[10%] h-8 overflow-hidden">
          <div className="absolute animate-flow-fast">
            <div className="w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: 'var(--oz-success)', boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)' }}>
              <span className="text-[10px] font-bold text-white">$</span>
            </div>
          </div>
          
          <div className="absolute animate-flow-slow" style={{ animationDelay: '2s' }}>
            <div className="w-5 h-5 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: 'var(--oz-blue)', boxShadow: '0 0 15px rgba(78, 94, 228, 0.4)' }}>
              <span className="text-[8px] font-bold text-white">$</span>
            </div>
          </div>

          <div className="absolute animate-flow-fast" style={{ animationDelay: '4s' }}>
            <div className="w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: 'var(--oz-success)', boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)' }}>
              <span className="text-[10px] font-bold text-white">$</span>
            </div>
          </div>
        </div>

        {/* Flow Description */}
        <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--oz-border)' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="flex items-start gap-2 p-3 rounded-lg"
              style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.1)' }}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
                <Link2 className="w-3 h-3 text-amber-500" />
              </div>
              <div>
                <span className="font-medium text-amber-600 dark:text-amber-400">3rd Party Bridge</span>
                <p style={{ color: 'var(--oz-text-muted)' }} className="mt-0.5">User bridges via external protocol to HUB</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-lg"
              style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                <Zap className="w-3 h-3 text-emerald-500" />
              </div>
              <div>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">Solver Fast Fills</span>
                <p style={{ color: 'var(--oz-text-muted)' }} className="mt-0.5">Instant liquidity via Fast Fill Router</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-lg"
              style={{ background: 'var(--oz-blue-light)' }}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: 'rgba(99, 102, 241, 0.1)' }}>
                <Shield className="w-3 h-3 text-indigo-500" />
              </div>
              <div>
                <span className="font-medium" style={{ color: 'var(--oz-text)' }}>Settlement</span>
                <p style={{ color: 'var(--oz-text-muted)' }} className="mt-0.5">Canonical bridge refunds solver</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Animated Flow Diagram Component for Outflows
function OutflowDiagram() {
  return (
    <div className="oz-card p-6">
      {/* Title */}
      <div className="flex items-center gap-2 mb-6">
        <div className="p-1.5 rounded-lg" style={{ background: 'var(--oz-blue-light)' }}>
          <ArrowRight className="w-4 h-4" style={{ color: 'var(--oz-blue)' }} />
        </div>
        <h3 className="text-lg font-semibold" style={{ color: 'var(--oz-text)' }}>Outflows from Your L2</h3>
        <span className="ml-auto text-xs px-2.5 py-1 rounded-full font-medium"
          style={{ background: 'var(--oz-blue-light)', color: 'var(--oz-blue)' }}>
          OIF Intent
        </span>
      </div>

      {/* Flow Diagram */}
      <div className="relative">
        {/* Nodes */}
        <div className="grid grid-cols-5 gap-1 md:gap-3 relative z-10">
          {/* Your L2 */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-2"
              style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <Layers className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" />
            </div>
            <span className="text-[10px] md:text-xs font-medium" style={{ color: 'var(--oz-text-muted)' }}>Your L2</span>
          </div>

          {/* Solver */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-2"
              style={{ background: 'var(--oz-blue-light)', border: '1px solid rgba(78, 94, 228, 0.2)' }}>
              <Zap className="w-5 h-5 md:w-6 md:h-6" style={{ color: 'var(--oz-blue)' }} />
            </div>
            <span className="text-[10px] md:text-xs font-medium" style={{ color: 'var(--oz-text-muted)' }}>Solver</span>
          </div>

          {/* HUB Chain */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-2"
              style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-indigo-500" />
            </div>
            <span className="text-[10px] md:text-xs font-medium" style={{ color: 'var(--oz-text-muted)' }}>HUB</span>
          </div>

          {/* Third Party */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-2"
              style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px dashed rgba(245, 158, 11, 0.3)' }}>
              <Link2 className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
            </div>
            <span className="text-[10px] md:text-xs font-medium text-amber-500">3rd Party</span>
          </div>

          {/* Destination */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-2"
              style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
              <Globe className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
            </div>
            <span className="text-[10px] md:text-xs font-medium" style={{ color: 'var(--oz-text-muted)' }}>Any Chain</span>
          </div>
        </div>

        {/* Animated Flow Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ top: '28px' }}>
          <defs>
            <linearGradient id="flowGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#6366f1" stopOpacity="0.8" />
              <stop offset="80%" stopColor="#f59e0b" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          
          <line x1="10%" y1="28" x2="90%" y2="28" stroke="url(#flowGradient2)" strokeWidth="2" strokeDasharray="4 4" className="opacity-30" />
        </svg>

        {/* Animated Tokens */}
        <div className="absolute top-5 left-[10%] right-[10%] h-8 overflow-hidden">
          <div className="absolute animate-flow-outbound">
            <div className="w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: 'var(--oz-blue)', boxShadow: '0 0 20px rgba(78, 94, 228, 0.5)' }}>
              <span className="text-[10px] font-bold text-white">$</span>
            </div>
          </div>
          
          <div className="absolute animate-flow-outbound" style={{ animationDelay: '3s' }}>
            <div className="w-5 h-5 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: '#6366F1', boxShadow: '0 0 15px rgba(99, 102, 241, 0.4)' }}>
              <span className="text-[8px] font-bold text-white">$</span>
            </div>
          </div>

          <div className="absolute animate-flow-outbound" style={{ animationDelay: '6s' }}>
            <div className="w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: 'var(--oz-blue)', boxShadow: '0 0 20px rgba(78, 94, 228, 0.5)' }}>
              <span className="text-[10px] font-bold text-white">$</span>
            </div>
          </div>
        </div>

        {/* Flow Description */}
        <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--oz-border)' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="flex items-start gap-2 p-3 rounded-lg"
              style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                <Wallet className="w-3 h-3 text-emerald-500" />
              </div>
              <div>
                <span className="font-medium" style={{ color: 'var(--oz-text)' }}>Escrow & Fill</span>
                <p style={{ color: 'var(--oz-text-muted)' }} className="mt-0.5">User locks on L2, solver fills on HUB</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-lg"
              style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.1)' }}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
                <Link2 className="w-3 h-3 text-amber-500" />
              </div>
              <div>
                <span className="font-medium text-amber-600 dark:text-amber-400">3rd Party Route</span>
                <p style={{ color: 'var(--oz-text-muted)' }} className="mt-0.5">External protocol bridges to destination</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-lg"
              style={{ background: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: 'rgba(99, 102, 241, 0.1)' }}>
                <Shield className="w-3 h-3 text-indigo-500" />
              </div>
              <div>
                <span className="font-medium text-indigo-600 dark:text-indigo-400">Oracle Settlement</span>
                <p style={{ color: 'var(--oz-text-muted)' }} className="mt-0.5">Broadcaster verifies & releases</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Settlement Timeline Component
function SettlementTimeline() {
  return (
    <div className="oz-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-1.5 rounded-lg" style={{ background: 'rgba(99, 102, 241, 0.1)' }}>
          <Clock className="w-4 h-4 text-indigo-500" />
        </div>
        <h3 className="text-lg font-semibold" style={{ color: 'var(--oz-text)' }}>Settlement & Security</h3>
      </div>

      <div className="space-y-4">
        {/* Inflow Timeline */}
        <div className="relative pl-8">
          <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
            style={{ background: 'linear-gradient(to bottom, #10b981, var(--oz-blue), #6366f1)' }} />
          
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute -left-8 w-4 h-4 rounded-full bg-emerald-500" 
                style={{ boxShadow: '0 0 0 4px var(--oz-card)' }} />
              <div className="p-3 rounded-lg"
                style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">~15 seconds</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--oz-success)' }}>Fast Fill</span>
                </div>
                <p className="text-xs" style={{ color: 'var(--oz-text-muted)' }}>User receives funds via solver front-running</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-8 w-4 h-4 rounded-full"
                style={{ background: 'var(--oz-blue)', boxShadow: '0 0 0 4px var(--oz-card)' }} />
              <div className="p-3 rounded-lg" style={{ background: 'var(--oz-blue-light)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium" style={{ color: 'var(--oz-text)' }}>~10-30 minutes</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: 'var(--oz-blue-light)', color: 'var(--oz-blue)' }}>Canonical</span>
                </div>
                <p className="text-xs" style={{ color: 'var(--oz-text-muted)' }}>Canonical bridge completes, solver reimbursed</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-8 w-4 h-4 rounded-full bg-indigo-500"
                style={{ boxShadow: '0 0 0 4px var(--oz-card)' }} />
              <div className="p-3 rounded-lg"
                style={{ background: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Broadcaster Oracle</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
                <p className="text-xs" style={{ color: 'var(--oz-text-muted)' }}>Trustless verification via decentralized oracles</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Landing() {
  const [activeFlow, setActiveFlow] = useState('inflow')
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen" style={{ background: 'var(--oz-bg)' }}>
      {/* Header */}
      <header className="oz-glass fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <OZLogo className="w-8 h-8" />
              <div className="flex flex-col">
                <span className="font-semibold text-sm tracking-tight" style={{ color: 'var(--oz-text)' }}>
                  OIF Tooling
                </span>
                <span className="text-xs font-medium" style={{ color: 'var(--oz-text-muted)' }}>
                  OpenZeppelin
                </span>
              </div>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <a 
                href="https://github.com/OpenZeppelin"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                style={{ color: 'var(--oz-text-muted)' }}
              >
                <Github className="w-5 h-5" />
              </a>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                style={{ color: 'var(--oz-text-muted)' }}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <Link
                to="/onboarding"
                className="oz-btn-primary ml-2"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-30 dark:opacity-20"
            style={{ background: 'radial-gradient(ellipse at center, rgba(78, 94, 228, 0.15), transparent 70%)' }} />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          {/* Badge */}
          <div className="flex justify-center mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full oz-card">
              <span className="status-dot status-active" />
              <span className="text-sm font-medium" style={{ color: 'var(--oz-text-muted)' }}>Milestone 2 Preview</span>
            </div>
          </div>

          {/* Main Title */}
          <h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-center leading-tight mb-6 animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="gradient-text">L2 Onboarding</span>
            <br />
            <span style={{ color: 'var(--oz-text)' }}>Made Simple</span>
          </h1>

          {/* Subtitle */}
          <p 
            className="text-lg md:text-xl text-center max-w-2xl mx-auto mb-12 animate-fade-in"
            style={{ color: 'var(--oz-text-muted)', animationDelay: '0.3s' }}
          >
            Deploy OIF infrastructure on your chain in minutes. Enable fast intent-based 
            bridging powered by OpenZeppelin's security standards.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            <Link
              to="/onboarding"
              className="group flex items-center gap-2 oz-btn-primary px-8 py-3.5 text-base glow-blue"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/bridge"
              className="oz-btn-secondary flex items-center gap-2 px-8 py-3.5 text-base"
            >
              Try the Bridge
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20" style={{ borderTop: '1px solid var(--oz-border)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="oz-card p-6 animate-fade-in"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'var(--oz-blue-light)' }}>
                  <feature.icon className="w-6 h-6" style={{ color: 'var(--oz-blue)' }} />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--oz-text)' }}>{feature.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--oz-text-muted)' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Flow Diagrams */}
      <section className="py-20" style={{ borderTop: '1px solid var(--oz-border)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--oz-text)' }}>How Money Flows</h2>
            <p className="max-w-2xl mx-auto" style={{ color: 'var(--oz-text-muted)' }}>
              See how the OIF architecture enables fast bridging through solver front-running 
              and secure settlement via Broadcaster oracles.
            </p>
          </div>

          {/* Flow Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 rounded-xl oz-card">
              <button
                onClick={() => setActiveFlow('inflow')}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeFlow === 'inflow' 
                    ? 'shadow-sm' 
                    : ''
                }`}
                style={{
                  background: activeFlow === 'inflow' ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                  color: activeFlow === 'inflow' ? 'var(--oz-success)' : 'var(--oz-text-muted)',
                  border: activeFlow === 'inflow' ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid transparent'
                }}
              >
                <span className="flex items-center gap-2">
                  <ArrowDown className="w-4 h-4" />
                  Inflows to L2
                </span>
              </button>
              <button
                onClick={() => setActiveFlow('outflow')}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeFlow === 'outflow' 
                    ? 'shadow-sm' 
                    : ''
                }`}
                style={{
                  background: activeFlow === 'outflow' ? 'var(--oz-blue-light)' : 'transparent',
                  color: activeFlow === 'outflow' ? 'var(--oz-blue)' : 'var(--oz-text-muted)',
                  border: activeFlow === 'outflow' ? '1px solid rgba(78, 94, 228, 0.2)' : '1px solid transparent'
                }}
              >
                <span className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Outflows from L2
                </span>
              </button>
            </div>
          </div>

          {/* Flow Diagrams */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {activeFlow === 'inflow' ? <InflowDiagram /> : <OutflowDiagram />}
            </div>
            <div>
              <SettlementTimeline />
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-20" style={{ borderTop: '1px solid var(--oz-border)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-4" style={{ color: 'var(--oz-text)' }}>Choose Your Path</h2>
          <p className="text-center mb-12 max-w-xl mx-auto" style={{ color: 'var(--oz-text-muted)' }}>
            Whether you're onboarding a new chain, managing existing infrastructure, or bridging assets.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <Link
                key={card.path}
                to={card.path}
                className="group oz-card p-8 animate-fade-in"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: 'linear-gradient(135deg, var(--oz-blue-light), rgba(99, 102, 241, 0.1))' }}>
                  <card.icon className="w-7 h-7" style={{ color: 'var(--oz-blue)' }} />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--oz-text)' }}>{card.title}</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--oz-text-muted)' }}>{card.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all"
                  style={{ color: 'var(--oz-blue)' }}>
                  {card.cta}
                  <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8" style={{ borderTop: '1px solid var(--oz-border)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <OZLogo className="w-6 h-6" />
              <span className="text-sm font-medium" style={{ color: 'var(--oz-text-muted)' }}>
                OpenZeppelin OIF Tooling
              </span>
            </div>
            <div className="flex items-center gap-6">
              <a href="https://docs.openzeppelin.com" target="_blank" rel="noopener noreferrer"
                className="text-sm hover:underline" style={{ color: 'var(--oz-text-muted)' }}>
                Documentation
              </a>
              <a href="https://github.com/OpenZeppelin" target="_blank" rel="noopener noreferrer"
                className="text-sm hover:underline" style={{ color: 'var(--oz-text-muted)' }}>
                GitHub
              </a>
              <a href="https://openzeppelin.com" target="_blank" rel="noopener noreferrer"
                className="text-sm hover:underline" style={{ color: 'var(--oz-text-muted)' }}>
                openzeppelin.com
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* CSS Animations */}
      <style>{`
        @keyframes flowFast {
          0% {
            left: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }

        @keyframes flowSlow {
          0% {
            left: 0%;
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }

        @keyframes flowOutbound {
          0% {
            left: 0%;
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          92% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }

        .animate-flow-fast {
          animation: flowFast 3s ease-in-out infinite;
        }

        .animate-flow-slow {
          animation: flowSlow 5s ease-in-out infinite;
        }

        .animate-flow-outbound {
          animation: flowOutbound 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
