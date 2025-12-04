import { useState, useEffect, useCallback } from 'react'
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

// Confetti component
function Confetti({ active }) {
  const [particles, setParticles] = useState([])
  
  useEffect(() => {
    if (active) {
      const colors = ['#4E5EE4', '#63D2F9', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6']
      const newParticles = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 4 + Math.random() * 8,
        rotation: Math.random() * 360,
      }))
      setParticles(newParticles)
      
      const timer = setTimeout(() => setParticles([]), 4000)
      return () => clearTimeout(timer)
    }
  }, [active])
  
  if (!active || particles.length === 0) return null
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti"
          style={{
            left: `${p.x}%`,
            top: '-20px',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            transform: `rotate(${p.rotation}deg)`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
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
      <Confetti active={showConfetti} />
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
        <div className="oz-card p-6 mb-8">
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
            <span>Secured by Broadcaster</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-emerald-500" />
            <span>OIF Powered</span>
          </div>
        </div>
      </div>
    </div>
  )
}
