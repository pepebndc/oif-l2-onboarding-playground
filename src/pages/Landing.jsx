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
  Link2
} from 'lucide-react'

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

// Animated Flow Diagram Component for Inflows
function InflowDiagram() {
  return (
    <div className="relative p-6 rounded-2xl bg-oz-card border border-oz-border overflow-hidden">
      {/* Title */}
      <div className="flex items-center gap-2 mb-6">
        <ArrowDown className="w-5 h-5 text-emerald-400" />
        <h3 className="text-lg font-semibold">Inflows to Your L2</h3>
        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 ml-auto">Fast Fill</span>
      </div>

      {/* Flow Diagram */}
      <div className="relative">
        {/* Nodes */}
        <div className="grid grid-cols-5 gap-1 md:gap-3 relative z-10">
          {/* User */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-2">
              <User className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
            </div>
            <span className="text-[10px] md:text-xs font-medium text-center">User</span>
          </div>

          {/* Third Party */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-500/10 border border-amber-500/30 border-dashed flex items-center justify-center mb-2">
              <Link2 className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />
            </div>
            <span className="text-[10px] md:text-xs font-medium text-center text-amber-400">3rd Party</span>
          </div>

          {/* HUB Chain */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-oz-purple/20 to-oz-purple/10 border border-oz-purple/30 flex items-center justify-center mb-2">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-oz-purple" />
            </div>
            <span className="text-[10px] md:text-xs font-medium text-center">HUB</span>
          </div>

          {/* Solver */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-oz-blue/20 to-oz-blue/10 border border-oz-blue/30 flex items-center justify-center mb-2 relative">
              <Zap className="w-5 h-5 md:w-6 md:h-6 text-oz-blue" />
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                <span className="text-[8px] font-bold text-white">⚡</span>
              </div>
            </div>
            <span className="text-[10px] md:text-xs font-medium text-center">Solver</span>
          </div>

          {/* Your L2 */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-2">
              <Layers className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
            </div>
            <span className="text-[10px] md:text-xs font-medium text-center">Your L2</span>
          </div>
        </div>

        {/* Animated Flow Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ top: '28px' }}>
          {/* Path definitions */}
          <defs>
            <linearGradient id="flowGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
              <stop offset="20%" stopColor="#f59e0b" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          
          {/* Main flow line */}
          <line x1="10%" y1="28" x2="90%" y2="28" stroke="url(#flowGradient1)" strokeWidth="2" strokeDasharray="4 4" className="opacity-30" />
        </svg>

        {/* Animated Tokens */}
        <div className="absolute top-5 left-[10%] right-[10%] h-8 overflow-hidden">
          {/* Token 1 - Fast path (Solver frontruns) */}
          <div className="absolute animate-flow-fast">
            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/50">
              <span className="text-[10px] font-bold text-white">$</span>
            </div>
          </div>
          
          {/* Token 2 - Regular path */}
          <div className="absolute animate-flow-slow" style={{ animationDelay: '2s' }}>
            <div className="w-5 h-5 rounded-full bg-oz-blue/80 flex items-center justify-center shadow-lg shadow-oz-blue/30">
              <span className="text-[8px] font-bold text-white">$</span>
            </div>
          </div>

          {/* Token 3 */}
          <div className="absolute animate-flow-fast" style={{ animationDelay: '4s' }}>
            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/50">
              <span className="text-[10px] font-bold text-white">$</span>
            </div>
          </div>
        </div>

        {/* Flow Description */}
        <div className="mt-8 pt-6 border-t border-oz-border/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/5 border border-amber-500/10">
              <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Link2 className="w-3 h-3 text-amber-400" />
              </div>
              <div>
                <span className="font-medium text-amber-400">3rd Party Bridge</span>
                <p className="text-oz-text mt-0.5">User bridges via external protocol to HUB</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Zap className="w-3 h-3 text-emerald-400" />
              </div>
              <div>
                <span className="font-medium text-emerald-400">Solver Fast Fills</span>
                <p className="text-oz-text mt-0.5">Instant liquidity via Fast Fill Router</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-lg bg-oz-darker/50">
              <div className="w-5 h-5 rounded-full bg-oz-purple/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Shield className="w-3 h-3 text-oz-purple" />
              </div>
              <div>
                <span className="font-medium text-white">Settlement</span>
                <p className="text-oz-text mt-0.5">Canonical bridge refunds solver</p>
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
    <div className="relative p-6 rounded-2xl bg-oz-card border border-oz-border overflow-hidden">
      {/* Title */}
      <div className="flex items-center gap-2 mb-6">
        <ArrowRight className="w-5 h-5 text-oz-blue" />
        <h3 className="text-lg font-semibold">Outflows from Your L2</h3>
        <span className="text-xs px-2 py-0.5 rounded-full bg-oz-blue/10 text-oz-blue ml-auto">OIF Intent</span>
      </div>

      {/* Flow Diagram */}
      <div className="relative">
        {/* Nodes */}
        <div className="grid grid-cols-5 gap-1 md:gap-3 relative z-10">
          {/* Your L2 */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-2">
              <Layers className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
            </div>
            <span className="text-[10px] md:text-xs font-medium text-center">Your L2</span>
          </div>

          {/* Solver */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-oz-blue/20 to-oz-blue/10 border border-oz-blue/30 flex items-center justify-center mb-2">
              <Zap className="w-5 h-5 md:w-6 md:h-6 text-oz-blue" />
            </div>
            <span className="text-[10px] md:text-xs font-medium text-center">Solver</span>
          </div>

          {/* HUB Chain */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-oz-purple/20 to-oz-purple/10 border border-oz-purple/30 flex items-center justify-center mb-2">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-oz-purple" />
            </div>
            <span className="text-[10px] md:text-xs font-medium text-center">HUB</span>
          </div>

          {/* Third Party */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-500/10 border border-amber-500/30 border-dashed flex items-center justify-center mb-2">
              <Link2 className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />
            </div>
            <span className="text-[10px] md:text-xs font-medium text-center text-amber-400">3rd Party</span>
          </div>

          {/* Destination */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-2">
              <Globe className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
            </div>
            <span className="text-[10px] md:text-xs font-medium text-center">Any Chain</span>
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
          {/* Token 1 */}
          <div className="absolute animate-flow-outbound">
            <div className="w-6 h-6 rounded-full bg-oz-blue flex items-center justify-center shadow-lg shadow-oz-blue/50">
              <span className="text-[10px] font-bold text-white">$</span>
            </div>
          </div>
          
          {/* Token 2 */}
          <div className="absolute animate-flow-outbound" style={{ animationDelay: '3s' }}>
            <div className="w-5 h-5 rounded-full bg-oz-purple/80 flex items-center justify-center shadow-lg shadow-oz-purple/30">
              <span className="text-[8px] font-bold text-white">$</span>
            </div>
          </div>

          {/* Token 3 */}
          <div className="absolute animate-flow-outbound" style={{ animationDelay: '6s' }}>
            <div className="w-6 h-6 rounded-full bg-oz-blue flex items-center justify-center shadow-lg shadow-oz-blue/50">
              <span className="text-[10px] font-bold text-white">$</span>
            </div>
          </div>
        </div>

        {/* Flow Description */}
        <div className="mt-8 pt-6 border-t border-oz-border/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="flex items-start gap-2 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Wallet className="w-3 h-3 text-emerald-400" />
              </div>
              <div>
                <span className="font-medium text-white">Escrow & Fill</span>
                <p className="text-oz-text mt-0.5">User locks on L2, solver fills on HUB</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/5 border border-amber-500/10">
              <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Link2 className="w-3 h-3 text-amber-400" />
              </div>
              <div>
                <span className="font-medium text-amber-400">3rd Party Route</span>
                <p className="text-oz-text mt-0.5">External protocol bridges to destination</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-lg bg-oz-purple/5 border border-oz-purple/10">
              <div className="w-5 h-5 rounded-full bg-oz-purple/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Shield className="w-3 h-3 text-oz-purple" />
              </div>
              <div>
                <span className="font-medium text-oz-purple">Oracle Settlement</span>
                <p className="text-oz-text mt-0.5">Broadcaster verifies & releases</p>
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
    <div className="p-6 rounded-2xl bg-oz-card border border-oz-border">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-oz-accent" />
        <h3 className="text-lg font-semibold">Settlement & Security</h3>
      </div>

      <div className="space-y-4">
        {/* Inflow Timeline */}
        <div className="relative pl-8">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500 via-oz-blue to-oz-purple" />
          
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute -left-8 w-4 h-4 rounded-full bg-emerald-500 border-4 border-oz-card" />
              <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-emerald-400">~15 seconds</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">Fast Fill</span>
                </div>
                <p className="text-xs text-oz-text">User receives funds via solver front-running</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-8 w-4 h-4 rounded-full bg-oz-blue border-4 border-oz-card" />
              <div className="p-3 rounded-lg bg-oz-darker/50">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">~10-30 minutes</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-oz-blue/20 text-oz-blue">Canonical</span>
                </div>
                <p className="text-xs text-oz-text">Canonical bridge completes, solver reimbursed</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-8 w-4 h-4 rounded-full bg-oz-purple border-4 border-oz-card" />
              <div className="p-3 rounded-lg bg-oz-purple/5 border border-oz-purple/10">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-oz-purple">Broadcaster Oracle</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-xs text-oz-text">Trustless verification via decentralized oracles</p>
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-oz-blue/5 blur-[100px]" />
          <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-oz-purple/5 blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          {/* Badge */}
          <div className="flex justify-center mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-oz-border bg-oz-card/50">
              <span className="status-dot status-active" />
              <span className="text-sm text-oz-text">Milestone 2 Preview</span>
            </div>
          </div>

          {/* Main Title */}
          <h1 
            className="text-5xl md:text-7xl font-bold text-center leading-tight mb-6 animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="gradient-text">L2 Onboarding</span>
            <br />
            <span className="text-white">Made Simple</span>
          </h1>

          {/* Subtitle */}
          <p 
            className="text-xl text-oz-text text-center max-w-2xl mx-auto mb-12 animate-fade-in"
            style={{ animationDelay: '0.3s' }}
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
              className="group flex items-center gap-2 px-8 py-3.5 rounded-xl bg-oz-blue hover:bg-oz-blue/90 text-white font-medium transition-all duration-200 glow-blue"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/bridge"
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl border border-oz-border hover:border-oz-blue/50 text-white font-medium transition-all duration-200"
            >
              Try the Bridge
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-oz-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="p-6 rounded-2xl bg-oz-card/30 border border-oz-border/50 animate-fade-in"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-oz-blue/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-oz-blue" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-oz-text text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Flow Diagrams */}
      <section className="py-20 border-t border-oz-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Money Flows</h2>
            <p className="text-oz-text max-w-2xl mx-auto">
              See how the OIF architecture enables fast bridging through solver front-running 
              and secure settlement via Broadcaster oracles.
            </p>
          </div>

          {/* Flow Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 rounded-xl bg-oz-darker border border-oz-border">
              <button
                onClick={() => setActiveFlow('inflow')}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeFlow === 'inflow' 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'text-oz-text hover:text-white'
                }`}
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
                    ? 'bg-oz-blue/20 text-oz-blue border border-oz-blue/30' 
                    : 'text-oz-text hover:text-white'
                }`}
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
      <section className="py-20 border-t border-oz-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Choose Your Path</h2>
          <p className="text-oz-text text-center mb-12 max-w-xl mx-auto">
            Whether you're onboarding a new chain, managing existing infrastructure, or bridging assets.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <Link
                key={card.path}
                to={card.path}
                className="group relative p-8 rounded-2xl bg-oz-card border border-oz-border hover:border-oz-blue/30 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-oz-blue/20 to-oz-purple/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <card.icon className="w-7 h-7 text-oz-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                <p className="text-oz-text text-sm leading-relaxed mb-6">{card.description}</p>
                <span className="inline-flex items-center gap-2 text-oz-blue text-sm font-medium group-hover:gap-3 transition-all">
                  {card.cta}
                  <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-oz-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-oz-blue" />
              <span className="text-sm text-oz-text">OIF L2 Onboarding Demo</span>
            </div>
            <p className="text-sm text-oz-text">
              Built with OpenZeppelin standards
            </p>
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
