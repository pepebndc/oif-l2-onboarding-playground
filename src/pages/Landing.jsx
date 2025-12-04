import { Link } from 'react-router-dom'
import { 
  Layers, 
  Settings, 
  ArrowRightLeft, 
  ChevronRight,
  Zap,
  Shield,
  Globe,
  ArrowRight
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

export default function Landing() {
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

      {/* Cards Section */}
      <section className="py-20">
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

      {/* Architecture Preview */}
      <section className="py-20 border-t border-oz-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-oz-text max-w-2xl mx-auto">
              The OIF architecture connects your L2 to a HUB chain, enabling fast bridging 
              through solver front-running and canonical bridge settlement.
            </p>
          </div>

          {/* Architecture Diagram */}
          <div className="relative p-8 rounded-2xl bg-oz-card border border-oz-border">
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              {/* Source Chain */}
              <div className="text-center">
                <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-oz-blue/10 to-oz-blue/5 border border-oz-blue/20 flex flex-col items-center justify-center p-4 mb-3">
                  <Globe className="w-8 md:w-12 h-8 md:h-12 text-oz-blue mb-2" />
                  <span className="text-xs md:text-sm font-medium">Other Chain</span>
                </div>
                <p className="text-xs text-oz-text hidden md:block">Third-party intents</p>
              </div>

              {/* HUB */}
              <div className="text-center">
                <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-oz-purple/20 to-oz-purple/10 border border-oz-purple/30 flex flex-col items-center justify-center p-4 mb-3 gradient-border">
                  <Shield className="w-8 md:w-12 h-8 md:h-12 text-oz-accent mb-2" />
                  <span className="text-xs md:text-sm font-semibold">HUB Chain</span>
                </div>
                <p className="text-xs text-oz-text hidden md:block">Settlement & routing</p>
              </div>

              {/* New L2 */}
              <div className="text-center">
                <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 flex flex-col items-center justify-center p-4 mb-3">
                  <Layers className="w-8 md:w-12 h-8 md:h-12 text-emerald-400 mb-2" />
                  <span className="text-xs md:text-sm font-medium">Your L2</span>
                </div>
                <p className="text-xs text-oz-text hidden md:block">Fast Fill Router</p>
              </div>
            </div>

            {/* Connection Lines */}
            <div className="absolute top-1/2 left-1/3 right-1/3 h-px bg-gradient-to-r from-oz-blue/50 via-oz-purple/50 to-emerald-500/50 -translate-y-4" />
            
            {/* Arrow indicators */}
            <div className="flex justify-center gap-2 mt-6 text-oz-text text-xs">
              <span className="flex items-center gap-1">
                <ArrowRightLeft className="w-3 h-3" /> Fast intent bridging
              </span>
            </div>
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
    </div>
  )
}

