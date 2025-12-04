import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { 
  ArrowRightLeft, 
  ChevronDown,
  ArrowDown,
  Clock,
  Zap,
  Shield,
  CheckCircle2,
  Loader2,
  RefreshCw,
  Send,
  Radio,
  Wallet
} from 'lucide-react'

// OpenZeppelin Logo Component
function OZLogo({ className = "w-4 h-4" }) {
  return (
    <img src="/logo-oz.svg" alt="OpenZeppelin" className={className} />
  )
}

// Physics-based Confetti with collision detection
function Confetti({ active, cardRef }) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animationRef = useRef(null)
  
  useEffect(() => {
    if (!active) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      particlesRef.current = []
      return
    }
    
    const colors = ['#4E5EE4', '#63D2F9', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#fbbf24', '#34d399', '#a78bfa', '#f472b6', '#60a5fa', '#fcd34d']
    
    // Initialize particles
    particlesRef.current = Array.from({ length: 250 }, () => ({
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * 200,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 2 + 2,
      size: 6 + Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      type: Math.random(),
      opacity: 1,
      bounced: false,
    }))
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    const gravity = 0.15
    const friction = 0.99
    const bounceDamping = 0.6
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Get card bounds if available
      let cardBounds = null
      if (cardRef?.current) {
        const rect = cardRef.current.getBoundingClientRect()
        cardBounds = {
          left: rect.left - 10,
          right: rect.right + 10,
          top: rect.top - 10,
          bottom: rect.bottom + 10,
        }
      }
      
      let activeParticles = 0
      
      particlesRef.current.forEach((p) => {
        if (p.opacity <= 0) return
        activeParticles++
        
        // Apply gravity
        p.vy += gravity
        
        // Apply friction
        p.vx *= friction
        
        // Update position
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotationSpeed
        
        // Collision with card
        if (cardBounds && !p.bounced) {
          const nextY = p.y + p.vy
          const nextX = p.x + p.vx
          
          // Check if particle is approaching the card
          if (nextX > cardBounds.left && nextX < cardBounds.right) {
            // Hit top of card
            if (p.y < cardBounds.top && nextY >= cardBounds.top - p.size) {
              p.y = cardBounds.top - p.size
              p.vy = -p.vy * bounceDamping
              p.vx += (Math.random() - 0.5) * 8 // Add horizontal scatter
              p.bounced = true
            }
          }
          
          // Side collisions
          if (p.y > cardBounds.top && p.y < cardBounds.bottom) {
            // Hit left side
            if (p.x > cardBounds.left - p.size && p.x < cardBounds.left + 20 && p.vx > 0) {
              p.vx = -Math.abs(p.vx) * bounceDamping - 2
              p.bounced = true
            }
            // Hit right side
            if (p.x < cardBounds.right + p.size && p.x > cardBounds.right - 20 && p.vx < 0) {
              p.vx = Math.abs(p.vx) * bounceDamping + 2
              p.bounced = true
            }
          }
        }
        
        // Fade out when below viewport
        if (p.y > window.innerHeight - 100) {
          p.opacity -= 0.02
        }
        
        // Draw particle
        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = p.size / 2
        
        if (p.type < 0.3) {
          // Circle
          ctx.beginPath()
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
          ctx.fill()
        } else if (p.type < 0.7) {
          // Square
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
        } else {
          // Streamer/ribbon
          ctx.fillRect(-p.size * 0.2, -p.size * 0.75, p.size * 0.4, p.size * 1.5)
        }
        
        ctx.restore()
      })
      
      // Continue animation if particles are active
      if (activeParticles > 0) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }
    
    animate()
    
    // Cleanup after 8 seconds
    const timer = setTimeout(() => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      particlesRef.current = []
    }, 8000)
    
    return () => {
      clearTimeout(timer)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [active, cardRef])
  
  if (!active) return null
  
  return createPortal(
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 99999,
      }}
    />,
    document.body
  )
}

// Bridge status steps
const bridgeSteps = [
  { id: 'submitted', label: 'Intent Submitted', icon: Send, description: 'Your intent has been submitted to the network' },
  { id: 'broadcasted', label: 'Intent Broadcasted', icon: Radio, description: 'Solvers are competing to fill your intent' },
  { id: 'filled', label: 'Funds Received', icon: Wallet, description: 'Your funds have arrived!' },
]

const chains = [
  { id: 'my-l2', name: 'My L2', icon: '◆', color: 'emerald' },
  { id: 'base', name: 'Base', icon: '●', color: 'blue' },
  { id: 'arbitrum', name: 'Arbitrum', icon: '◈', color: 'blue' },
  { id: 'optimism', name: 'Optimism', icon: '◯', color: 'red' },
  { id: 'ethereum', name: 'Ethereum', icon: '⟠', color: 'purple' },
  { id: 'zksync', name: 'zkSync Era', icon: '◇', color: 'purple' },
]

const tokens = [
  { id: 'usdc', name: 'USD Coin', symbol: 'USDC', balance: '12,450.00' },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', balance: '4.25' },
  { id: 'usdt', name: 'Tether', symbol: 'USDT', balance: '8,320.50' },
  { id: 'wbtc', name: 'Wrapped Bitcoin', symbol: 'WBTC', balance: '0.125' },
]

export default function UserBridge() {
  const [fromChain, setFromChain] = useState(chains[0])
  const [toChain, setToChain] = useState(chains[1])
  const [fromToken, setFromToken] = useState(tokens[0])
  const [toToken, setToToken] = useState(tokens[0])
  const [amount, setAmount] = useState('')
  const [showFromChainSelect, setShowFromChainSelect] = useState(false)
  const [showToChainSelect, setShowToChainSelect] = useState(false)
  const [showFromTokenSelect, setShowFromTokenSelect] = useState(false)
  const [showToTokenSelect, setShowToTokenSelect] = useState(false)
  const [isQuoting, setIsQuoting] = useState(false)
  const [quote, setQuote] = useState(null)
  const [isBridging, setIsBridging] = useState(false)
  const [bridgeStatus, setBridgeStatus] = useState(null) // null, 'submitted', 'broadcasted', 'filled'
  const [showConfetti, setShowConfetti] = useState(false)
  const bridgeCardRef = useRef(null)

  const swapChains = () => {
    const temp = fromChain
    setFromChain(toChain)
    setToChain(temp)
    setQuote(null)
  }

  const getQuote = () => {
    if (!amount || parseFloat(amount) <= 0) return
    
    setIsQuoting(true)
    setTimeout(() => {
      const inputAmount = parseFloat(amount.replace(/,/g, ''))
      const fee = inputAmount * 0.0005 // 0.05% fee
      const outputAmount = inputAmount - fee
      
      setQuote({
        inputAmount: amount,
        outputAmount: outputAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        fee: fee.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 }),
        estimatedTime: '~15 seconds',
        route: fromChain.id === 'my-l2' || toChain.id === 'my-l2' 
          ? 'Direct (OIF Solver)' 
          : `${fromChain.name} → Base (HUB) → ${toChain.name}`,
        expiresIn: 60,
      })
      setIsQuoting(false)
    }, 1500)
  }

  const executeBridge = () => {
    setIsBridging(true)
    setBridgeStatus('submitted')
    
    // Step 1: Intent Submitted -> Broadcasted (after 1.5s)
    setTimeout(() => {
      setBridgeStatus('broadcasted')
      
      // Step 2: Broadcasted -> Filled (after another 2s)
      setTimeout(() => {
        setBridgeStatus('filled')
        setIsBridging(false)
        setShowConfetti(true)
        
        // Reset after celebration
        setTimeout(() => {
          setShowConfetti(false)
          setBridgeStatus(null)
          setAmount('')
          setQuote(null)
        }, 5000)
      }, 2000)
    }, 1500)
  }

  const resetBridge = useCallback(() => {
    setBridgeStatus(null)
    setIsBridging(false)
    setShowConfetti(false)
    setAmount('')
    setQuote(null)
  }, [])

  const SelectDropdown = ({ options, selected, onSelect, show, onToggle, label }) => (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center justify-between gap-2 w-full px-4 py-3 rounded-xl transition-colors text-left"
        style={{ 
          background: 'var(--oz-surface)', 
          border: '1px solid var(--oz-border)'
        }}
      >
        <div className="flex items-center gap-3">
          {selected.icon && <span className="text-lg">{selected.icon}</span>}
          <div>
            <div className="text-xs" style={{ color: 'var(--oz-text-muted)' }}>{label}</div>
            <div className="font-medium" style={{ color: 'var(--oz-text)' }}>{selected.name || selected.symbol}</div>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${show ? 'rotate-180' : ''}`} style={{ color: 'var(--oz-text-muted)' }} />
      </button>
      
      {show && (
        <div className="absolute top-full left-0 right-0 mt-2 p-2 rounded-xl shadow-xl z-20 max-h-64 overflow-y-auto"
          style={{ background: 'var(--oz-card)', border: '1px solid var(--oz-border)' }}>
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                onSelect(option)
                onToggle()
              }}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left transition-colors"
              style={{ 
                background: selected.id === option.id ? 'var(--oz-blue-light)' : 'transparent',
                color: selected.id === option.id ? 'var(--oz-blue)' : 'var(--oz-text)'
              }}
            >
              {option.icon && <span className="text-lg">{option.icon}</span>}
              <div className="flex-1">
                <div className="font-medium">{option.name}</div>
                {option.symbol && <div className="text-xs" style={{ color: 'var(--oz-text-muted)' }}>{option.symbol}</div>}
                {option.balance && <div className="text-xs" style={{ color: 'var(--oz-text-muted)' }}>Balance: {option.balance}</div>}
              </div>
              {selected.id === option.id && <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--oz-blue)' }} />}
            </button>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: 'var(--oz-bg)' }}>
      <Confetti active={showConfetti} cardRef={bridgeCardRef} />
      <div className="max-w-lg mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full oz-card mb-6">
            <ArrowRightLeft className="w-4 h-4" style={{ color: 'var(--oz-blue)' }} />
            <span className="text-sm" style={{ color: 'var(--oz-text-muted)' }}>Fast Intent Bridge</span>
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--oz-text)' }}>Bridge Assets</h1>
          <p style={{ color: 'var(--oz-text-muted)' }}>Transfer tokens between chains using OIF intent-based bridging.</p>
        </div>

        {/* Bridge Card */}
        <div ref={bridgeCardRef} className="oz-card p-6 mb-8">
          {/* From Section */}
          <div className="mb-2">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm" style={{ color: 'var(--oz-text-muted)' }}>From</span>
              <span className="text-xs" style={{ color: 'var(--oz-text-muted)' }}>
                Balance: <span style={{ color: 'var(--oz-text)' }}>{fromToken.balance} {fromToken.symbol}</span>
              </span>
            </div>
            
            <div className="flex gap-3 mb-3">
              <div className="flex-1">
                <SelectDropdown
                  options={chains}
                  selected={fromChain}
                  onSelect={(chain) => { setFromChain(chain); setQuote(null); }}
                  show={showFromChainSelect}
                  onToggle={() => setShowFromChainSelect(!showFromChainSelect)}
                  label="Network"
                />
              </div>
              <div className="w-40">
                <SelectDropdown
                  options={tokens}
                  selected={fromToken}
                  onSelect={(token) => { setFromToken(token); setQuote(null); }}
                  show={showFromTokenSelect}
                  onToggle={() => setShowFromTokenSelect(!showFromTokenSelect)}
                  label="Token"
                />
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                value={amount}
                onChange={(e) => { setAmount(e.target.value); setQuote(null); }}
                placeholder="0.00"
                className="oz-input w-full py-4 text-2xl font-medium"
              />
              <button
                onClick={() => setAmount(fromToken.balance)}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg text-xs font-medium transition-colors"
                style={{ background: 'var(--oz-blue-light)', color: 'var(--oz-blue)' }}
              >
                MAX
              </button>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center -my-2 relative z-10">
            <button
              onClick={swapChains}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:rotate-180 duration-300"
              style={{ background: 'var(--oz-card)', border: '1px solid var(--oz-border)', color: 'var(--oz-text)' }}
            >
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>

          {/* To Section */}
          <div className="mt-2">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm" style={{ color: 'var(--oz-text-muted)' }}>To</span>
            </div>
            
            <div className="flex gap-3 mb-3">
              <div className="flex-1">
                <SelectDropdown
                  options={chains}
                  selected={toChain}
                  onSelect={(chain) => { setToChain(chain); setQuote(null); }}
                  show={showToChainSelect}
                  onToggle={() => setShowToChainSelect(!showToChainSelect)}
                  label="Network"
                />
              </div>
              <div className="w-40">
                <SelectDropdown
                  options={tokens}
                  selected={toToken}
                  onSelect={(token) => { setToToken(token); setQuote(null); }}
                  show={showToTokenSelect}
                  onToggle={() => setShowToTokenSelect(!showToTokenSelect)}
                  label="Token"
                />
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                value={quote ? quote.outputAmount : ''}
                readOnly
                placeholder="0.00"
                className="oz-input w-full py-4 text-2xl font-medium cursor-not-allowed opacity-70"
              />
              {isQuoting && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <Loader2 className="w-5 h-5 animate-spin" style={{ color: 'var(--oz-blue)' }} />
                </div>
              )}
            </div>
          </div>

          {/* Quote Details */}
          {quote && (
            <div className="mt-6 p-4 rounded-xl animate-fade-in" style={{ background: 'var(--oz-surface)', border: '1px solid var(--oz-border)' }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium" style={{ color: 'var(--oz-text)' }}>Quote Details</span>
                <button 
                  onClick={getQuote}
                  className="flex items-center gap-1.5 text-xs hover:underline"
                  style={{ color: 'var(--oz-blue)' }}
                >
                  <RefreshCw className="w-3 h-3" />
                  Refresh
                </button>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: 'var(--oz-text-muted)' }}>Route</span>
                  <span className="flex items-center gap-1.5" style={{ color: 'var(--oz-text)' }}>
                    <Zap className="w-3 h-3" style={{ color: 'var(--oz-blue)' }} />
                    {quote.route}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--oz-text-muted)' }}>Fee</span>
                  <span style={{ color: 'var(--oz-text)' }}>{quote.fee} {fromToken.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--oz-text-muted)' }}>Estimated Time</span>
                  <span className="flex items-center gap-1.5" style={{ color: 'var(--oz-text)' }}>
                    <Clock className="w-3 h-3 text-emerald-500" />
                    {quote.estimatedTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--oz-text-muted)' }}>You Receive</span>
                  <span className="font-medium text-emerald-500">
                    {quote.outputAmount} {toToken.symbol}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Bridge Status Progress */}
          {bridgeStatus && (
            <div className="mt-6 p-4 rounded-xl animate-fade-in" style={{ background: 'var(--oz-surface)', border: '1px solid var(--oz-border)' }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium" style={{ color: 'var(--oz-text)' }}>Bridge Progress</span>
                {bridgeStatus === 'filled' && (
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-medium">
                    Complete!
                  </span>
                )}
              </div>
              
              <div className="space-y-3">
                {bridgeSteps.map((step, index) => {
                  const currentIndex = bridgeSteps.findIndex(s => s.id === bridgeStatus)
                  const isComplete = index < currentIndex || (index === currentIndex && bridgeStatus === 'filled')
                  const isCurrent = index === currentIndex && bridgeStatus !== 'filled'
                  const isPending = index > currentIndex
                  
                  return (
                    <div key={step.id} className="flex items-start gap-3">
                      {/* Status indicator */}
                      <div className="flex flex-col items-center">
                        <div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                            isComplete ? 'bg-emerald-500' : 
                            isCurrent ? 'bg-oz-blue animate-pulse' : 
                            'bg-transparent'
                          }`}
                          style={{ 
                            border: isPending ? '2px solid var(--oz-border)' : 'none',
                          }}
                        >
                          {isComplete ? (
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          ) : isCurrent ? (
                            <Loader2 className="w-4 h-4 text-white animate-spin" />
                          ) : (
                            <step.icon className="w-4 h-4" style={{ color: 'var(--oz-text-muted)' }} />
                          )}
                        </div>
                        {index < bridgeSteps.length - 1 && (
                          <div 
                            className="w-0.5 h-6 mt-1 transition-all duration-500"
                            style={{ 
                              background: isComplete ? '#10b981' : 'var(--oz-border)'
                            }}
                          />
                        )}
                      </div>
                      
                      {/* Step content */}
                      <div className="flex-1 pb-2">
                        <div 
                          className={`font-medium text-sm transition-colors ${
                            isComplete ? 'text-emerald-500' : 
                            isCurrent ? '' : ''
                          }`}
                          style={{ color: isComplete ? '#10b981' : isCurrent ? 'var(--oz-text)' : 'var(--oz-text-muted)' }}
                        >
                          {step.label}
                        </div>
                        <div className="text-xs mt-0.5" style={{ color: 'var(--oz-text-muted)' }}>
                          {step.description}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              {bridgeStatus === 'filled' && (
                <button
                  onClick={resetBridge}
                  className="w-full mt-4 oz-btn-secondary text-sm"
                >
                  Bridge More
                </button>
              )}
            </div>
          )}

          {/* Action Buttons */}
          {!bridgeStatus && (
            <div className="mt-6">
              {!quote ? (
                <button
                  onClick={getQuote}
                  disabled={!amount || parseFloat(amount) <= 0 || isQuoting}
                  className="w-full oz-btn-primary py-4 flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {isQuoting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Getting Quote...
                    </>
                  ) : (
                    'Get Quote'
                  )}
                </button>
              ) : (
                <button
                  onClick={executeBridge}
                  disabled={isBridging}
                  className="w-full py-4 rounded-xl text-white font-semibold transition-all flex items-center justify-center gap-2 glow-blue disabled:opacity-50"
                  style={{ background: 'linear-gradient(to right, var(--oz-blue), #6366f1)' }}
                >
                  {isBridging ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Bridging...
                    </>
                  ) : (
                    <>
                      <ArrowRightLeft className="w-5 h-5" />
                      Bridge {amount} {fromToken.symbol}
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center gap-6 text-xs" style={{ color: 'var(--oz-text-muted)' }}>
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4" style={{ color: 'var(--oz-blue)' }} />
            <span className="flex items-center gap-1">Secured by <OZLogo className="w-4 h-4" /></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-emerald-500" />
            <span>Powered by OIF</span>
          </div>
        </div>
      </div>
    </div>
  )
}
