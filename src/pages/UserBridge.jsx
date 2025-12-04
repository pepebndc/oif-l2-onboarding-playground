import { useState } from 'react'
import { 
  ArrowRightLeft, 
  ChevronDown,
  ArrowDown,
  Clock,
  Zap,
  Shield,
  CheckCircle2,
  Loader2,
  RefreshCw
} from 'lucide-react'

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
  const [bridgeSuccess, setBridgeSuccess] = useState(false)

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
    setTimeout(() => {
      setIsBridging(false)
      setBridgeSuccess(true)
      setTimeout(() => {
        setBridgeSuccess(false)
        setAmount('')
        setQuote(null)
      }, 3000)
    }, 2500)
  }

  const SelectDropdown = ({ options, selected, onSelect, show, onToggle, label }) => (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center justify-between gap-2 w-full px-4 py-3 rounded-xl bg-oz-darker border border-oz-border hover:border-oz-blue/50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          {selected.icon && <span className="text-lg">{selected.icon}</span>}
          <div>
            <div className="text-xs text-oz-text">{label}</div>
            <div className="font-medium">{selected.name || selected.symbol}</div>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-oz-text transition-transform ${show ? 'rotate-180' : ''}`} />
      </button>
      
      {show && (
        <div className="absolute top-full left-0 right-0 mt-2 p-2 rounded-xl bg-oz-card border border-oz-border shadow-xl z-20 max-h-64 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                onSelect(option)
                onToggle()
              }}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left transition-colors ${
                (selected.id === option.id) 
                  ? 'bg-oz-blue/10 text-oz-blue' 
                  : 'hover:bg-oz-darker'
              }`}
            >
              {option.icon && <span className="text-lg">{option.icon}</span>}
              <div className="flex-1">
                <div className="font-medium">{option.name}</div>
                {option.symbol && <div className="text-xs text-oz-text">{option.symbol}</div>}
                {option.balance && <div className="text-xs text-oz-text">Balance: {option.balance}</div>}
              </div>
              {selected.id === option.id && <CheckCircle2 className="w-4 h-4 text-oz-blue" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-lg mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-oz-border bg-oz-card/50 mb-6">
            <ArrowRightLeft className="w-4 h-4 text-oz-blue" />
            <span className="text-sm text-oz-text">Fast Intent Bridge</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Bridge Assets</h1>
          <p className="text-oz-text">Transfer tokens between chains using OIF intent-based bridging.</p>
        </div>

        {/* Bridge Card */}
        <div className="rounded-2xl bg-oz-card border border-oz-border p-6 mb-8">
          {/* From Section */}
          <div className="mb-2">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-oz-text">From</span>
              <span className="text-xs text-oz-text">
                Balance: <span className="text-white">{fromToken.balance} {fromToken.symbol}</span>
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
              <div className="w-32">
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
                className="w-full px-4 py-4 rounded-xl bg-oz-darker border border-oz-border focus:border-oz-blue transition-colors text-2xl font-medium"
              />
              <button
                onClick={() => setAmount(fromToken.balance)}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg bg-oz-blue/10 text-oz-blue text-xs font-medium hover:bg-oz-blue/20 transition-colors"
              >
                MAX
              </button>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center -my-2 relative z-10">
            <button
              onClick={swapChains}
              className="w-10 h-10 rounded-xl bg-oz-card border border-oz-border hover:border-oz-blue/50 flex items-center justify-center transition-all hover:rotate-180 duration-300"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>

          {/* To Section */}
          <div className="mt-2">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-oz-text">To</span>
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
              <div className="w-32">
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
                className="w-full px-4 py-4 rounded-xl bg-oz-darker/50 border border-oz-border text-2xl font-medium text-oz-text cursor-not-allowed"
              />
              {isQuoting && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <Loader2 className="w-5 h-5 animate-spin text-oz-blue" />
                </div>
              )}
            </div>
          </div>

          {/* Quote Details */}
          {quote && (
            <div className="mt-6 p-4 rounded-xl bg-oz-darker border border-oz-border animate-fade-in">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Quote Details</span>
                <button 
                  onClick={getQuote}
                  className="flex items-center gap-1.5 text-xs text-oz-blue hover:underline"
                >
                  <RefreshCw className="w-3 h-3" />
                  Refresh
                </button>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-oz-text">Route</span>
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-oz-blue" />
                    {quote.route}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-oz-text">Fee</span>
                  <span>{quote.fee} {fromToken.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-oz-text">Estimated Time</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    {quote.estimatedTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-oz-text">You Receive</span>
                  <span className="font-medium text-emerald-400">
                    {quote.outputAmount} {toToken.symbol}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6">
            {!quote ? (
              <button
                onClick={getQuote}
                disabled={!amount || parseFloat(amount) <= 0 || isQuoting}
                className="w-full py-4 rounded-xl bg-oz-blue hover:bg-oz-blue/90 disabled:bg-oz-blue/30 disabled:cursor-not-allowed text-white font-semibold transition-all flex items-center justify-center gap-2"
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
            ) : bridgeSuccess ? (
              <div className="w-full py-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-semibold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Bridge Initiated Successfully!
              </div>
            ) : (
              <button
                onClick={executeBridge}
                disabled={isBridging}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-oz-blue to-oz-purple hover:opacity-90 disabled:opacity-50 text-white font-semibold transition-all flex items-center justify-center gap-2 glow-blue"
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
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center gap-6 text-xs text-oz-text">
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-oz-blue" />
            <span>Secured by Broadcaster</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>OIF Powered</span>
          </div>
        </div>
      </div>
    </div>
  )
}
