import { useState } from 'react'
import { 
  Settings, 
  Plus,
  Trash2,
  Wallet,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Copy,
  X,
  Search,
  Hash,
  ArrowRightLeft,
  Loader2,
  ArrowRight,
  Shield,
  Key,
  Coins,
  Sparkles,
  ChevronRight
} from 'lucide-react'

// Token sets include L1, HUB, and L2 addresses (solver only holds liquidity on HUB and L2)
const mockTokens = [
  {
    id: 1,
    name: 'USD Coin',
    symbol: 'USDC',
    l1Address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    hubChainAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    l2Address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
    l2Balance: 45230.50,
    hubChainBalance: 28150.00,
    status: 'active',
  },
  {
    id: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    l1Address: '0x0000000000000000000000000000000000000000',
    hubChainAddress: '0x4200000000000000000000000000000000000006',
    l2Address: '0x0000000000000000000000000000000000000000',
    l2Balance: 15.5,
    hubChainBalance: 8.2,
    status: 'active',
  },
  {
    id: 3,
    name: 'Wrapped Bitcoin',
    symbol: 'WBTC',
    l1Address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    hubChainAddress: '0x68f180fcCe6836688e9084f035309E29Bf0A2095',
    l2Address: '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6',
    l2Balance: 0.85,
    hubChainBalance: 0.42,
    status: 'low_liquidity',
  },
]

// Available tokens for configuration (common tokens with known HUB addresses)
const availableTokensForSetup = [
  { name: 'USD Coin', symbol: 'USDC', l1Address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', hubChainAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' },
  { name: 'Ethereum', symbol: 'ETH', l1Address: '0x0000000000000000000000000000000000000000', hubChainAddress: '0x4200000000000000000000000000000000000006' },
  { name: 'Tether USD', symbol: 'USDT', l1Address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', hubChainAddress: '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2' },
]

const stats = [
  { label: 'Total Volume (24h)', value: '$1.2M', change: '+12.5%', positive: true, icon: TrendingUp },
  { label: 'Intents (24h)', value: '156', change: '+23', positive: true, icon: Activity },
  { label: 'Total Intents', value: '12,847', change: '', icon: Hash },
]

// Format number with commas
const formatNumber = (num) => {
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function SolverDashboard() {
  // Auth state
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectedAddress, setConnectedAddress] = useState('')
  
  // New solver setup flow state
  const [isNewSolverFlow, setIsNewSolverFlow] = useState(false)
  const [setupStep, setSetupStep] = useState('tokens') // 'tokens', 'funding', 'complete'
  const [selectedTokensForSetup, setSelectedTokensForSetup] = useState([]) // { ...token, l2Address: '' }
  const [isVerifyingDeposits, setIsVerifyingDeposits] = useState(false)
  const [depositsVerified, setDepositsVerified] = useState(false)
  const [verifiedBalances, setVerifiedBalances] = useState([]) // balances after verification
  const [showAddCustomToken, setShowAddCustomToken] = useState(false)
  const [customToken, setCustomToken] = useState({ name: '', symbol: '', l1Address: '', hubChainAddress: '', l2Address: '' })
  
  // KMS address (provided by OZ)
  const kmsAddress = '0x9Fe46736679d2D9a65F0992F2272dE9f3c7fa6e0'
  
  // Dashboard state
  const [tokens, setTokens] = useState(mockTokens)
  const [showAddToken, setShowAddToken] = useState(false)
  const [selectedToken, setSelectedToken] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showWithdraw, setShowWithdraw] = useState(false)
  const [showRebalance, setShowRebalance] = useState(false)
  const [rebalanceToken, setRebalanceToken] = useState(null)
  const [isRebalancing, setIsRebalancing] = useState(false)
  const [withdrawData, setWithdrawData] = useState({
    token: '',
    amount: '',
    chain: 'l2',
    recipient: '',
  })
  const [rebalanceData, setRebalanceData] = useState({
    amount: '',
    direction: 'l2ToHub', // l2ToHub or hubToL2
  })
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [tokenToDelete, setTokenToDelete] = useState(null)
  const [newToken, setNewToken] = useState({
    name: '',
    symbol: '',
    l1Address: '',
    hubChainAddress: '',
    l2Address: '',
  })

  // Connect wallet handler (existing solver)
  const connectWallet = () => {
    setIsConnecting(true)
    setTimeout(() => {
      setIsConnecting(false)
      setIsConnected(true)
      setIsNewSolverFlow(false)
      setConnectedAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f2bD73')
    }, 1000)
  }

  // Connect wallet for new solver setup
  const connectWalletNewSolver = () => {
    setIsConnecting(true)
    setTimeout(() => {
      setIsConnecting(false)
      setIsConnected(true)
      setIsNewSolverFlow(true)
      setSetupStep('tokens')
      setConnectedAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f2bD73')
    }, 1000)
  }

  // Toggle token selection for setup
  const toggleTokenForSetup = (token) => {
    setSelectedTokensForSetup(prev => {
      const exists = prev.find(t => t.symbol === token.symbol)
      if (exists) {
        return prev.filter(t => t.symbol !== token.symbol)
      } else {
        // Add with empty L2 address that user needs to fill
        return [...prev, { ...token, l2Address: '' }]
      }
    })
  }

  // Update L2 address for a selected token
  const updateTokenL2Address = (symbol, l2Address) => {
    setSelectedTokensForSetup(prev => 
      prev.map(t => t.symbol === symbol ? { ...t, l2Address } : t)
    )
  }

  // Add custom token
  const addCustomToken = () => {
    if (customToken.name && customToken.symbol && customToken.hubChainAddress) {
      setSelectedTokensForSetup(prev => [...prev, { ...customToken, isCustom: true }])
      setCustomToken({ name: '', symbol: '', l1Address: '', hubChainAddress: '', l2Address: '' })
      setShowAddCustomToken(false)
    }
  }

  // Proceed to funding step
  const proceedToFunding = () => {
    setSetupStep('funding')
  }

  // Verify deposits
  const verifyDeposits = () => {
    setIsVerifyingDeposits(true)
    setTimeout(() => {
      // Generate mock balances for each token
      const balances = selectedTokensForSetup.map(token => ({
        ...token,
        hubBalance: token.symbol === 'ETH' ? (Math.random() * 10).toFixed(4) : (Math.random() * 50000).toFixed(2),
        l2Balance: token.symbol === 'ETH' ? (Math.random() * 5).toFixed(4) : (Math.random() * 25000).toFixed(2),
      }))
      setVerifiedBalances(balances)
      setIsVerifyingDeposits(false)
      setDepositsVerified(true)
    }, 2000)
  }

  // Complete setup and go to dashboard
  const completeSetup = () => {
    // Convert verified tokens to the format used by the dashboard
    const configuredTokens = verifiedBalances.map((token, index) => ({
      id: index + 1,
      name: token.name,
      symbol: token.symbol,
      l1Address: token.l1Address || '',
      hubChainAddress: token.hubChainAddress,
      l2Address: token.l2Address,
      l2Balance: parseFloat(token.l2Balance) || 0,
      hubChainBalance: parseFloat(token.hubBalance) || 0,
      status: 'active',
    }))
    setTokens(configuredTokens)
    resetSetupFlow()
  }

  // Reset setup flow state
  const resetSetupFlow = () => {
    setIsNewSolverFlow(false)
    setSetupStep('tokens')
    setSelectedTokensForSetup([])
    setDepositsVerified(false)
    setVerifiedBalances([])
    setShowAddCustomToken(false)
    setCustomToken({ name: '', symbol: '', l1Address: '', hubChainAddress: '', l2Address: '' })
  }

  const handleAddToken = () => {
    const token = {
      ...newToken,
      id: tokens.length + 1,
      l2Balance: 0,
      hubChainBalance: 0,
      status: 'active',
    }
    setTokens([...tokens, token])
    setShowAddToken(false)
    setNewToken({
      name: '',
      symbol: '',
      l1Address: '',
      hubChainAddress: '',
      l2Address: '',
    })
  }

  const handleDeleteToken = (token) => {
    setTokenToDelete(token)
    setShowDeleteConfirm(true)
  }

  const confirmDeleteToken = () => {
    if (tokenToDelete) {
      setTokens(tokens.filter(t => t.id !== tokenToDelete.id))
      setShowDeleteConfirm(false)
      setTokenToDelete(null)
    }
  }

  const openRebalanceModal = (token) => {
    setRebalanceToken(token)
    setRebalanceData({ amount: '', direction: 'l2ToHub' })
    setShowRebalance(true)
  }

  const executeRebalance = () => {
    if (!rebalanceToken || !rebalanceData.amount) return
    
    setIsRebalancing(true)
    setTimeout(() => {
      const amount = parseFloat(rebalanceData.amount) || 0
      setTokens(tokens.map(t => {
        if (t.id === rebalanceToken.id) {
          if (rebalanceData.direction === 'l2ToHub') {
            return {
              ...t,
              l2Balance: t.l2Balance - amount,
              hubChainBalance: t.hubChainBalance + amount,
            }
          } else {
            return {
              ...t,
              l2Balance: t.l2Balance + amount,
              hubChainBalance: t.hubChainBalance - amount,
            }
          }
        }
        return t
      }))
      setIsRebalancing(false)
      setShowRebalance(false)
      setRebalanceToken(null)
    }, 2000)
  }

  // Calculate preview balances
  const getPreviewBalances = () => {
    if (!rebalanceToken || !rebalanceData.amount) {
      return { l2: rebalanceToken?.l2Balance || 0, hub: rebalanceToken?.hubChainBalance || 0 }
    }
    const amount = parseFloat(rebalanceData.amount) || 0
    if (rebalanceData.direction === 'l2ToHub') {
      return {
        l2: rebalanceToken.l2Balance - amount,
        hub: rebalanceToken.hubChainBalance + amount,
      }
    } else {
      return {
        l2: rebalanceToken.l2Balance + amount,
        hub: rebalanceToken.hubChainBalance - amount,
      }
    }
  }

  const copyAddress = (address) => {
    navigator.clipboard.writeText(address)
  }

  // Login Screen with two options
  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-8" style={{ background: 'var(--oz-bg)' }}>
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-oz-blue to-oz-purple flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--oz-text)' }}>Solver Dashboard</h1>
            <p style={{ color: 'var(--oz-text-muted)' }}>Connect your wallet to access the solver management dashboard.</p>
          </div>

          <div className="oz-card p-6">
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'var(--oz-surface)', border: '1px solid var(--oz-border)' }}>
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="text-sm" style={{ color: 'var(--oz-text)' }}>View token balances and transactions</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'var(--oz-surface)', border: '1px solid var(--oz-border)' }}>
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="text-sm" style={{ color: 'var(--oz-text)' }}>Rebalance liquidity across chains</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'var(--oz-surface)', border: '1px solid var(--oz-border)' }}>
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="text-sm" style={{ color: 'var(--oz-text)' }}>Withdraw funds to external addresses</span>
              </div>
            </div>

            {/* Existing Solver - Connect Wallet */}
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-oz-blue to-oz-purple hover:opacity-90 disabled:opacity-70 text-white font-semibold transition-all flex items-center justify-center gap-3 mb-3"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="w-5 h-5" />
                  Connect Wallet
                </>
              )}
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" style={{ borderColor: 'var(--oz-border)' }}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2" style={{ background: 'var(--oz-card)', color: 'var(--oz-text-muted)' }}>or</span>
              </div>
            </div>

            {/* New Solver - Setup Flow */}
            <button
              onClick={connectWalletNewSolver}
              disabled={isConnecting}
              className="w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 oz-btn-secondary"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Setup New Solver
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-xs text-center mt-4" style={{ color: 'var(--oz-text-muted)' }}>
              Use "Setup New Solver" if your solver was recently approved by OpenZeppelin.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // New Solver Setup Flow - Token Configuration
  if (isNewSolverFlow && setupStep === 'tokens') {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--oz-bg)' }}>
        <div className="max-w-3xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-oz-blue to-oz-purple text-white text-sm font-semibold">1</div>
                <span className="text-sm font-medium" style={{ color: 'var(--oz-text)' }}>Token Sets</span>
              </div>
              <div className="w-12 h-0.5" style={{ background: 'var(--oz-border)' }}></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold" style={{ background: 'var(--oz-surface)', color: 'var(--oz-text-muted)', border: '1px solid var(--oz-border)' }}>2</div>
                <span className="text-sm" style={{ color: 'var(--oz-text-muted)' }}>Fund Solver</span>
              </div>
            </div>
          </div>

          <div className="oz-card p-8">
            {/* KMS Info Banner */}
            <div className="flex items-start gap-4 p-4 rounded-xl mb-8" 
              style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                <Key className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-1 text-emerald-600 dark:text-emerald-400">KMS Signer Ready</h4>
                <p className="text-sm mb-2" style={{ color: 'var(--oz-text-muted)' }}>
                  OpenZeppelin has set up a secure KMS signer for your solver.
                </p>
                <div className="flex items-center gap-2 p-2 rounded-lg" style={{ background: 'var(--oz-surface)' }}>
                  <code className="text-xs font-mono flex-1" style={{ color: 'var(--oz-text)' }}>{kmsAddress}</code>
                  <button onClick={() => copyAddress(kmsAddress)} className="p-1 hover:opacity-70 transition-opacity" style={{ color: 'var(--oz-text-muted)' }}>
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--oz-text)' }}>Configure Token Sets</h2>
            <p style={{ color: 'var(--oz-text-muted)' }} className="mb-6">
              Select tokens and provide their contract addresses on your L2 chain.
            </p>

            {/* Available Common Tokens */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--oz-text)' }}>Common Tokens</h3>
              <div className="flex flex-wrap gap-2">
                {availableTokensForSetup.map((token) => {
                  const isSelected = selectedTokensForSetup.find(t => t.symbol === token.symbol)
                  return (
                    <button
                      key={token.symbol}
                      onClick={() => toggleTokenForSetup(token)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg border transition-all"
                      style={{
                        background: isSelected ? 'var(--oz-blue-light)' : 'var(--oz-surface)',
                        borderColor: isSelected ? 'var(--oz-blue)' : 'var(--oz-border)'
                      }}
                    >
                      <div className="w-6 h-6 rounded-full flex items-center justify-center font-semibold text-xs" 
                        style={{ background: isSelected ? 'var(--oz-blue)' : 'var(--oz-bg)', color: isSelected ? 'white' : 'var(--oz-blue)' }}>
                        {token.symbol.slice(0, 2)}
                      </div>
                      <span className="text-sm font-medium" style={{ color: 'var(--oz-text)' }}>{token.symbol}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--oz-blue)' }} />}
                    </button>
                  )
                })}
                <button
                  onClick={() => setShowAddCustomToken(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border transition-all hover:border-oz-blue"
                  style={{ background: 'var(--oz-surface)', borderColor: 'var(--oz-border)' }}
                >
                  <Plus className="w-4 h-4" style={{ color: 'var(--oz-blue)' }} />
                  <span className="text-sm font-medium" style={{ color: 'var(--oz-text)' }}>Custom Token</span>
                </button>
              </div>
            </div>

            {/* Selected Tokens with L2 Address Input */}
            {selectedTokensForSetup.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--oz-text)' }}>
                  Configure L2 Addresses ({selectedTokensForSetup.length} tokens)
                </h3>
                <div className="space-y-3">
                  {selectedTokensForSetup.map((token) => (
                    <div 
                      key={token.symbol} 
                      className="p-4 rounded-xl"
                      style={{ background: 'var(--oz-surface)', border: '1px solid var(--oz-border)' }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm" 
                            style={{ background: 'var(--oz-blue-light)', color: 'var(--oz-blue)' }}>
                            {token.symbol.slice(0, 2)}
                          </div>
                          <div>
                            <div className="font-medium text-sm" style={{ color: 'var(--oz-text)' }}>{token.name}</div>
                            <div className="text-xs" style={{ color: 'var(--oz-text-muted)' }}>{token.symbol}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleTokenForSetup(token)}
                          className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs mb-1" style={{ color: 'var(--oz-text-muted)' }}>L1 Address</label>
                          <div className="flex items-center gap-2 p-2 rounded-lg" style={{ background: 'var(--oz-bg)', border: '1px solid var(--oz-border)' }}>
                            <code className="text-xs font-mono flex-1 truncate" style={{ color: 'var(--oz-text)' }}>
                              {token.l1Address || '—'}
                            </code>
                            {token.l1Address && (
                              <button onClick={() => copyAddress(token.l1Address)} className="p-1 hover:opacity-70" style={{ color: 'var(--oz-text-muted)' }}>
                                <Copy className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs mb-1" style={{ color: 'var(--oz-text-muted)' }}>HUB Chain Address</label>
                          <div className="flex items-center gap-2 p-2 rounded-lg" style={{ background: 'var(--oz-bg)', border: '1px solid var(--oz-border)' }}>
                            <code className="text-xs font-mono flex-1 truncate" style={{ color: 'var(--oz-text)' }}>
                              {token.hubChainAddress}
                            </code>
                            <button onClick={() => copyAddress(token.hubChainAddress)} className="p-1 hover:opacity-70" style={{ color: 'var(--oz-text-muted)' }}>
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs mb-1" style={{ color: 'var(--oz-text-muted)' }}>Your L2 Address *</label>
                          <input
                            type="text"
                            value={token.l2Address}
                            onChange={(e) => updateTokenL2Address(token.symbol, e.target.value)}
                            placeholder="0x..."
                            className="oz-input text-xs font-mono py-2"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add Custom Token Modal */}
            {showAddCustomToken && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm" style={{ background: 'rgba(0,0,0,0.5)' }}>
                <div className="w-full max-w-md rounded-2xl p-6 animate-fade-in" style={{ background: 'var(--oz-card)', border: '1px solid var(--oz-border)' }}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold" style={{ color: 'var(--oz-text)' }}>Add Custom Token</h3>
                    <button
                      onClick={() => setShowAddCustomToken(false)}
                      className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      style={{ color: 'var(--oz-text-muted)' }}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--oz-text)' }}>Token Name *</label>
                        <input
                          type="text"
                          value={customToken.name}
                          onChange={(e) => setCustomToken({ ...customToken, name: e.target.value })}
                          placeholder="e.g., My Token"
                          className="oz-input text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--oz-text)' }}>Symbol *</label>
                        <input
                          type="text"
                          value={customToken.symbol}
                          onChange={(e) => setCustomToken({ ...customToken, symbol: e.target.value.toUpperCase() })}
                          placeholder="e.g., MTK"
                          className="oz-input text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--oz-text)' }}>HUB Chain Address *</label>
                      <input
                        type="text"
                        value={customToken.hubChainAddress}
                        onChange={(e) => setCustomToken({ ...customToken, hubChainAddress: e.target.value })}
                        placeholder="0x..."
                        className="oz-input text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--oz-text)' }}>Your L2 Address *</label>
                      <input
                        type="text"
                        value={customToken.l2Address}
                        onChange={(e) => setCustomToken({ ...customToken, l2Address: e.target.value })}
                        placeholder="0x..."
                        className="oz-input text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--oz-text)' }}>L1 Address (Optional)</label>
                      <input
                        type="text"
                        value={customToken.l1Address}
                        onChange={(e) => setCustomToken({ ...customToken, l1Address: e.target.value })}
                        placeholder="0x..."
                        className="oz-input text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-6">
                    <button onClick={() => setShowAddCustomToken(false)} className="oz-btn-secondary flex-1">Cancel</button>
                    <button
                      onClick={addCustomToken}
                      disabled={!customToken.name || !customToken.symbol || !customToken.hubChainAddress || !customToken.l2Address}
                      className="oz-btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add Token
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Validation message */}
            {selectedTokensForSetup.length > 0 && selectedTokensForSetup.some(t => !t.l2Address) && (
              <div className="flex items-start gap-3 p-4 rounded-xl mb-6" 
                style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm" style={{ color: 'var(--oz-text-muted)' }}>
                  Please provide the L2 address for all selected tokens to continue.
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                onClick={() => { setIsConnected(false); resetSetupFlow(); }}
                className="oz-btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={proceedToFunding}
                disabled={selectedTokensForSetup.length === 0 || selectedTokensForSetup.some(t => !t.l2Address)}
                className="oz-btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Funding
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // New Solver Setup Flow - Funding
  if (isNewSolverFlow && setupStep === 'funding') {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--oz-bg)' }}>
        <div className="max-w-3xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold" 
                  style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
                <span className="text-sm" style={{ color: 'var(--oz-text-muted)' }}>Token Sets</span>
              </div>
              <div className="w-12 h-0.5 bg-emerald-500"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-oz-blue to-oz-purple text-white text-sm font-semibold">2</div>
                <span className="text-sm font-medium" style={{ color: 'var(--oz-text)' }}>Fund Solver</span>
              </div>
            </div>
          </div>

          <div className="oz-card p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'var(--oz-blue-light)' }}>
                <Coins className="w-6 h-6" style={{ color: 'var(--oz-blue)' }} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold" style={{ color: 'var(--oz-text)' }}>Fund Your Solver</h2>
                <p style={{ color: 'var(--oz-text-muted)' }}>Deposit tokens to the solver address on both HUB and L2 chains.</p>
              </div>
            </div>

            {/* Deposit Address */}
            <div className="p-4 rounded-xl mb-6" style={{ background: 'var(--oz-surface)', border: '1px solid var(--oz-border)' }}>
              <div className="text-sm mb-2" style={{ color: 'var(--oz-text-muted)' }}>Solver Deposit Address (same on all chains)</div>
              <div className="flex items-center gap-2">
                <code className="font-mono text-sm flex-1" style={{ color: 'var(--oz-text)' }}>{kmsAddress}</code>
                <button onClick={() => copyAddress(kmsAddress)} className="oz-btn-secondary px-3 py-1.5 text-sm flex items-center gap-2">
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </button>
              </div>
            </div>

            {/* Token Addresses per Network */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--oz-text)' }}>
                Token Addresses ({selectedTokensForSetup.length} tokens)
              </h3>
              <div className="space-y-4">
                {selectedTokensForSetup.map((token) => {
                  const verifiedToken = verifiedBalances.find(t => t.symbol === token.symbol)
                  return (
                    <div key={token.symbol} className="p-4 rounded-xl" 
                      style={{ background: 'var(--oz-surface)', border: '1px solid var(--oz-border)' }}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm" 
                          style={{ background: 'var(--oz-blue-light)', color: 'var(--oz-blue)' }}>
                          {token.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-medium text-sm" style={{ color: 'var(--oz-text)' }}>{token.name}</div>
                          <div className="text-xs" style={{ color: 'var(--oz-text-muted)' }}>{token.symbol}</div>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-3">
                        {/* L1 */}
                        <div className="p-3 rounded-lg" style={{ background: 'var(--oz-bg)', border: '1px solid var(--oz-border)' }}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium" style={{ color: 'var(--oz-text-muted)' }}>L1</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <code className="text-xs font-mono flex-1 truncate" style={{ color: 'var(--oz-text)' }}>
                              {token.l1Address || '—'}
                            </code>
                            {token.l1Address && (
                              <button onClick={() => copyAddress(token.l1Address)} className="p-1 hover:opacity-70" style={{ color: 'var(--oz-text-muted)' }}>
                                <Copy className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* HUB Chain */}
                        <div className="p-3 rounded-lg" style={{ background: 'var(--oz-bg)', border: '1px solid var(--oz-border)' }}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium" style={{ color: 'var(--oz-text-muted)' }}>HUB Chain</span>
                            {verifiedToken && (
                              <span className="text-xs font-mono font-medium text-emerald-500">
                                {verifiedToken.hubBalance} {token.symbol}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <code className="text-xs font-mono flex-1 truncate" style={{ color: 'var(--oz-text)' }}>
                              {token.hubChainAddress}
                            </code>
                            <button onClick={() => copyAddress(token.hubChainAddress)} className="p-1 hover:opacity-70" style={{ color: 'var(--oz-text-muted)' }}>
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* L2 Chain */}
                        <div className="p-3 rounded-lg" style={{ background: 'var(--oz-bg)', border: '1px solid var(--oz-border)' }}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium" style={{ color: 'var(--oz-text-muted)' }}>Your L2</span>
                            {verifiedToken && (
                              <span className="text-xs font-mono font-medium text-emerald-500">
                                {verifiedToken.l2Balance} {token.symbol}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <code className="text-xs font-mono flex-1 truncate" style={{ color: 'var(--oz-text)' }}>
                              {token.l2Address}
                            </code>
                            <button onClick={() => copyAddress(token.l2Address)} className="p-1 hover:opacity-70" style={{ color: 'var(--oz-text-muted)' }}>
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Instructions (show before verification) */}
            {!depositsVerified && (
              <div className="p-4 rounded-xl mb-6" style={{ background: 'var(--oz-blue-light)', border: '1px solid rgba(78, 94, 228, 0.1)' }}>
                <h4 className="font-medium mb-2" style={{ color: 'var(--oz-blue)' }}>Deposit Instructions</h4>
                <ol className="space-y-2 text-sm list-decimal list-inside" style={{ color: 'var(--oz-text-muted)' }}>
                  <li>Send initial liquidity for each token to the solver address: <code className="font-mono text-xs">{kmsAddress.slice(0, 10)}...</code></li>
                  <li>Deposit on both the HUB chain and your L2 chain for each token</li>
                  <li>Click "Verify Deposits" once you've completed the transfers</li>
                </ol>
              </div>
            )}

            {/* Verification Success */}
            {depositsVerified && (
              <div className="p-4 rounded-xl mb-6" 
                style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="font-medium text-emerald-600">Deposits verified successfully!</span>
                </div>
                <p className="text-sm" style={{ color: 'var(--oz-text-muted)' }}>
                  Your solver is funded and ready to go. Click "Launch Dashboard" to start managing your solver.
                </p>
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                onClick={() => { setSetupStep('tokens'); setDepositsVerified(false); setVerifiedBalances([]); }}
                className="oz-btn-secondary flex-1"
              >
                Back
              </button>
              {!depositsVerified ? (
                <button
                  onClick={verifyDeposits}
                  disabled={isVerifyingDeposits}
                  className="oz-btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  {isVerifyingDeposits ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Verify Deposits
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={completeSetup}
                  className="oz-btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Launch Dashboard
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--oz-bg)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Network Header - Prominent */}
        <div className="oz-card p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Network Name with Status */}
            <div>
              <div className="flex items-center gap-4 mb-3">
                <h1 className="text-4xl font-bold" style={{ color: 'var(--oz-text)' }}>My L2 Chain</h1>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-sm font-medium text-emerald-500">Active</span>
                </div>
              </div>
              <div className="flex items-center gap-2" style={{ color: 'var(--oz-text-muted)' }}>
                <span>Execution Address:</span>
                <code className="font-mono" style={{ color: 'var(--oz-text)' }}>0x742d...bD73</code>
                <button onClick={() => copyAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f2bD73')} className="hover:opacity-70 transition-opacity">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chain Info */}
            <div className="flex flex-wrap gap-4">
              <div className="px-6 py-4 rounded-xl min-w-[140px]" style={{ background: 'var(--oz-surface)', border: '1px solid var(--oz-border)' }}>
                <div className="text-xs mb-1 uppercase tracking-wide" style={{ color: 'var(--oz-text-muted)' }}>Parent (L1)</div>
                <div className="text-xl font-bold" style={{ color: 'var(--oz-text)' }}>Ethereum</div>
              </div>
              <div className="px-6 py-4 rounded-xl min-w-[140px]" style={{ background: 'var(--oz-surface)', border: '1px solid var(--oz-border)' }}>
                <div className="text-xs mb-1 uppercase tracking-wide" style={{ color: 'var(--oz-text-muted)' }}>HUB Chain</div>
                <div className="text-xl font-bold" style={{ color: 'var(--oz-text)' }}>Base</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="oz-card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm" style={{ color: 'var(--oz-text-muted)' }}>{stat.label}</span>
                <stat.icon className="w-4 h-4" style={{ color: 'var(--oz-blue)' }} />
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold" style={{ color: 'var(--oz-text)' }}>{stat.value}</span>
                {stat.change && (
                  <span className={`text-sm ${stat.positive ? 'text-emerald-500' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Tokens Section */}
        <div className="oz-card overflow-hidden">
          <div className="p-6" style={{ borderBottom: '1px solid var(--oz-border)' }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-xl font-semibold" style={{ color: 'var(--oz-text)' }}>Supported Token Sets</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--oz-text-muted)' }} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tokens..."
                    className="oz-input pl-10 w-48"
                  />
                </div>
                <button
                  onClick={() => setShowAddToken(true)}
                  className="oz-btn-primary flex items-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Token
                </button>
              </div>
            </div>
          </div>

          {/* Tokens Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--oz-border)' }}>
                  <th className="text-left text-sm font-medium px-6 py-4" style={{ color: 'var(--oz-text-muted)' }}>Token</th>
                  <th className="text-left text-sm font-medium px-6 py-4" style={{ color: 'var(--oz-text-muted)' }}>L2 Balance</th>
                  <th className="text-left text-sm font-medium px-6 py-4" style={{ color: 'var(--oz-text-muted)' }}>HUB Balance</th>
                  <th className="text-left text-sm font-medium px-6 py-4" style={{ color: 'var(--oz-text-muted)' }}>Status</th>
                  <th className="text-right text-sm font-medium px-6 py-4" style={{ color: 'var(--oz-text-muted)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tokens
                  .filter(t => 
                    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    t.symbol.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((token) => (
                  <tr key={token.id} className="hover:bg-black/5 dark:hover:bg-white/5" style={{ borderBottom: '1px solid var(--oz-border)' }}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm" style={{ background: 'var(--oz-blue-light)', color: 'var(--oz-blue)' }}>
                          {token.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-medium" style={{ color: 'var(--oz-text)' }}>{token.name}</div>
                          <div className="text-xs" style={{ color: 'var(--oz-text-muted)' }}>{token.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-mono" style={{ color: 'var(--oz-text)' }}>{formatNumber(token.l2Balance)}</div>
                      <div className="text-xs font-mono" style={{ color: 'var(--oz-text-muted)' }}>
                        {token.l2Address.slice(0, 6)}...{token.l2Address.slice(-4)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-mono" style={{ color: 'var(--oz-text)' }}>{formatNumber(token.hubChainBalance)}</div>
                      <div className="text-xs font-mono" style={{ color: 'var(--oz-text-muted)' }}>
                        {token.hubChainAddress.slice(0, 6)}...{token.hubChainAddress.slice(-4)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {token.status === 'active' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      )}
                      {token.status === 'low_liquidity' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-medium">
                          <AlertTriangle className="w-3 h-3" />
                          Low Liquidity
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openRebalanceModal(token)}
                          className="oz-btn-secondary flex items-center gap-1.5 px-3 py-1.5 text-sm"
                        >
                          <ArrowRightLeft className="w-3.5 h-3.5" />
                          Rebalance
                        </button>
                        <button
                          onClick={() => setSelectedToken(token)}
                          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                          style={{ color: 'var(--oz-text-muted)' }}
                        >
                          <Settings className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteToken(token)}
                          className="p-2 rounded-lg hover:bg-red-500/10 transition-colors text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Token Modal */}
        {showAddToken && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <div className="w-full max-w-lg rounded-2xl p-6 animate-fade-in" style={{ background: 'var(--oz-card)', border: '1px solid var(--oz-border)' }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold" style={{ color: 'var(--oz-text)' }}>Add New Token Set</h3>
                <button
                  onClick={() => setShowAddToken(false)}
                  className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  style={{ color: 'var(--oz-text-muted)' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--oz-text)' }}>Token Name</label>
                    <input
                      type="text"
                      value={newToken.name}
                      onChange={(e) => setNewToken({ ...newToken, name: e.target.value })}
                      placeholder="e.g., USD Coin"
                      className="oz-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--oz-text)' }}>Symbol</label>
                    <input
                      type="text"
                      value={newToken.symbol}
                      onChange={(e) => setNewToken({ ...newToken, symbol: e.target.value })}
                      placeholder="e.g., USDC"
                      className="oz-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--oz-text)' }}>L1 Address (Reference)</label>
                  <input
                    type="text"
                    value={newToken.l1Address}
                    onChange={(e) => setNewToken({ ...newToken, l1Address: e.target.value })}
                    placeholder="0x..."
                    className="oz-input font-mono"
                  />
                  <p className="text-xs mt-1" style={{ color: 'var(--oz-text-muted)' }}>Token address on the parent L1 chain</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--oz-text)' }}>HUB Chain Address</label>
                  <input
                    type="text"
                    value={newToken.hubChainAddress}
                    onChange={(e) => setNewToken({ ...newToken, hubChainAddress: e.target.value })}
                    placeholder="0x..."
                    className="oz-input font-mono"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--oz-text)' }}>L2 Chain Address</label>
                  <input
                    type="text"
                    value={newToken.l2Address}
                    onChange={(e) => setNewToken({ ...newToken, l2Address: e.target.value })}
                    placeholder="0x..."
                    className="oz-input font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => setShowAddToken(false)}
                  className="oz-btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddToken}
                  className="oz-btn-primary flex-1"
                >
                  Add Token
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Token Details Modal */}
        {selectedToken && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <div className="w-full max-w-lg rounded-2xl p-6 animate-fade-in" style={{ background: 'var(--oz-card)', border: '1px solid var(--oz-border)' }}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold" style={{ background: 'var(--oz-blue-light)', color: 'var(--oz-blue)' }}>
                    {selectedToken.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold" style={{ color: 'var(--oz-text)' }}>{selectedToken.name}</h3>
                    <p className="text-sm" style={{ color: 'var(--oz-text-muted)' }}>{selectedToken.symbol}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedToken(null)}
                  className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  style={{ color: 'var(--oz-text-muted)' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl" style={{ background: 'var(--oz-surface)', border: '1px solid var(--oz-border)' }}>
                  <h4 className="text-sm font-medium mb-3" style={{ color: 'var(--oz-text)' }}>Solver Balances</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs mb-1" style={{ color: 'var(--oz-text-muted)' }}>L2 Chain</div>
                      <div className="font-mono text-lg" style={{ color: 'var(--oz-text)' }}>{formatNumber(selectedToken.l2Balance)}</div>
                    </div>
                    <div>
                      <div className="text-xs mb-1" style={{ color: 'var(--oz-text-muted)' }}>HUB Chain</div>
                      <div className="font-mono text-lg" style={{ color: 'var(--oz-text)' }}>{formatNumber(selectedToken.hubChainBalance)}</div>
                    </div>
                  </div>
                  <p className="text-xs mt-3" style={{ color: 'var(--oz-text-muted)' }}>Solver holds liquidity on HUB and L2 only</p>
                </div>

                <div className="p-4 rounded-xl" style={{ background: 'var(--oz-surface)', border: '1px solid var(--oz-border)' }}>
                  <h4 className="text-sm font-medium mb-3" style={{ color: 'var(--oz-text)' }}>Token Addresses</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs mb-1" style={{ color: 'var(--oz-text-muted)' }}>L1 (Reference)</div>
                      <div className="flex items-center gap-2">
                        <code className="font-mono text-sm flex-1 truncate" style={{ color: 'var(--oz-text)' }}>{selectedToken.l1Address}</code>
                        <button onClick={() => copyAddress(selectedToken.l1Address)} className="p-1 hover:opacity-70 transition-opacity" style={{ color: 'var(--oz-text-muted)' }}>
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs mb-1" style={{ color: 'var(--oz-text-muted)' }}>HUB Chain</div>
                      <div className="flex items-center gap-2">
                        <code className="font-mono text-sm flex-1 truncate" style={{ color: 'var(--oz-text)' }}>{selectedToken.hubChainAddress}</code>
                        <button onClick={() => copyAddress(selectedToken.hubChainAddress)} className="p-1 hover:opacity-70 transition-opacity" style={{ color: 'var(--oz-text-muted)' }}>
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs mb-1" style={{ color: 'var(--oz-text-muted)' }}>L2 Chain</div>
                      <div className="flex items-center gap-2">
                        <code className="font-mono text-sm flex-1 truncate" style={{ color: 'var(--oz-text)' }}>{selectedToken.l2Address}</code>
                        <button onClick={() => copyAddress(selectedToken.l2Address)} className="p-1 hover:opacity-70 transition-opacity" style={{ color: 'var(--oz-text-muted)' }}>
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl" style={{ background: 'var(--oz-surface)', border: '1px solid var(--oz-border)' }}>
                  <h4 className="text-sm font-medium mb-3" style={{ color: 'var(--oz-text)' }}>Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => { openRebalanceModal(selectedToken); setSelectedToken(null); }}
                      className="oz-btn-secondary flex items-center justify-center gap-2 text-sm"
                    >
                      <ArrowRightLeft className="w-4 h-4" />
                      Rebalance
                    </button>
                    <button
                      onClick={() => { setWithdrawData({ ...withdrawData, token: selectedToken.symbol }); setShowWithdraw(true); setSelectedToken(null); }}
                      className="oz-btn-secondary flex items-center justify-center gap-2 text-sm"
                    >
                      <Wallet className="w-4 h-4" />
                      Withdraw
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => setSelectedToken(null)}
                  className="oz-btn-secondary flex-1"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Rebalance Modal */}
        {showRebalance && rebalanceToken && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <div className="w-full max-w-lg rounded-2xl p-6 animate-fade-in" style={{ background: 'var(--oz-card)', border: '1px solid var(--oz-border)' }}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold" style={{ background: 'var(--oz-blue-light)', color: 'var(--oz-blue)' }}>
                    {rebalanceToken.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold" style={{ color: 'var(--oz-text)' }}>Rebalance {rebalanceToken.symbol}</h3>
                    <p className="text-sm" style={{ color: 'var(--oz-text-muted)' }}>Move liquidity between chains</p>
                  </div>
                </div>
                <button
                  onClick={() => { setShowRebalance(false); setRebalanceToken(null); }}
                  className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  style={{ color: 'var(--oz-text-muted)' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-5">
                {/* Current Balances */}
                <div className="p-4 rounded-xl" style={{ background: 'var(--oz-surface)', border: '1px solid var(--oz-border)' }}>
                  <h4 className="text-sm font-medium mb-3" style={{ color: 'var(--oz-text-muted)' }}>Current Balances</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs mb-1" style={{ color: 'var(--oz-text-muted)' }}>L2 Chain</div>
                      <div className="font-mono text-lg" style={{ color: 'var(--oz-text)' }}>{formatNumber(rebalanceToken.l2Balance)}</div>
                    </div>
                    <div>
                      <div className="text-xs mb-1" style={{ color: 'var(--oz-text-muted)' }}>HUB Chain</div>
                      <div className="font-mono text-lg" style={{ color: 'var(--oz-text)' }}>{formatNumber(rebalanceToken.hubChainBalance)}</div>
                    </div>
                  </div>
                </div>

                {/* Direction Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--oz-text)' }}>Direction</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setRebalanceData({ ...rebalanceData, direction: 'l2ToHub' })}
                      className="p-4 rounded-xl border text-sm font-medium transition-all flex items-center justify-center gap-2"
                      style={{
                        background: rebalanceData.direction === 'l2ToHub' ? 'var(--oz-blue-light)' : 'transparent',
                        borderColor: rebalanceData.direction === 'l2ToHub' ? 'var(--oz-blue)' : 'var(--oz-border)',
                        color: rebalanceData.direction === 'l2ToHub' ? 'var(--oz-blue)' : 'var(--oz-text)'
                      }}
                    >
                      L2 <ArrowRight className="w-4 h-4" /> HUB
                    </button>
                    <button
                      onClick={() => setRebalanceData({ ...rebalanceData, direction: 'hubToL2' })}
                      className="p-4 rounded-xl border text-sm font-medium transition-all flex items-center justify-center gap-2"
                      style={{
                        background: rebalanceData.direction === 'hubToL2' ? 'var(--oz-blue-light)' : 'transparent',
                        borderColor: rebalanceData.direction === 'hubToL2' ? 'var(--oz-blue)' : 'var(--oz-border)',
                        color: rebalanceData.direction === 'hubToL2' ? 'var(--oz-blue)' : 'var(--oz-text)'
                      }}
                    >
                      HUB <ArrowRight className="w-4 h-4" /> L2
                    </button>
                  </div>
                </div>

                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--oz-text)' }}>Amount</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={rebalanceData.amount}
                      onChange={(e) => setRebalanceData({ ...rebalanceData, amount: e.target.value })}
                      placeholder="0.00"
                      className="oz-input w-full py-3 font-mono"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <span className="text-sm" style={{ color: 'var(--oz-text-muted)' }}>{rebalanceToken.symbol}</span>
                      <button 
                        onClick={() => {
                          const maxAmount = rebalanceData.direction === 'l2ToHub' 
                            ? rebalanceToken.l2Balance 
                            : rebalanceToken.hubChainBalance
                          setRebalanceData({ ...rebalanceData, amount: maxAmount.toString() })
                        }}
                        className="px-2 py-0.5 rounded text-xs font-medium"
                        style={{ background: 'var(--oz-blue-light)', color: 'var(--oz-blue)' }}
                      >
                        MAX
                      </button>
                    </div>
                  </div>
                  <p className="text-xs mt-2" style={{ color: 'var(--oz-text-muted)' }}>
                    Available: {formatNumber(rebalanceData.direction === 'l2ToHub' ? rebalanceToken.l2Balance : rebalanceToken.hubChainBalance)} {rebalanceToken.symbol}
                  </p>
                </div>

                {/* Preview */}
                {rebalanceData.amount && parseFloat(rebalanceData.amount) > 0 && (
                  <div className="p-4 rounded-xl" style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                    <h4 className="text-sm font-medium mb-3 text-emerald-500 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Balances After Rebalance
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs mb-1" style={{ color: 'var(--oz-text-muted)' }}>L2 Chain</div>
                        <div className="font-mono text-lg" style={{ color: 'var(--oz-text)' }}>
                          {formatNumber(getPreviewBalances().l2)}
                          <span className={`text-sm ml-2 ${rebalanceData.direction === 'l2ToHub' ? 'text-red-500' : 'text-emerald-500'}`}>
                            {rebalanceData.direction === 'l2ToHub' ? '−' : '+'}{rebalanceData.amount}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs mb-1" style={{ color: 'var(--oz-text-muted)' }}>HUB Chain</div>
                        <div className="font-mono text-lg" style={{ color: 'var(--oz-text)' }}>
                          {formatNumber(getPreviewBalances().hub)}
                          <span className={`text-sm ml-2 ${rebalanceData.direction === 'hubToL2' ? 'text-red-500' : 'text-emerald-500'}`}>
                            {rebalanceData.direction === 'hubToL2' ? '−' : '+'}{rebalanceData.amount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => { setShowRebalance(false); setRebalanceToken(null); }}
                  className="oz-btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={executeRebalance}
                  disabled={!rebalanceData.amount || parseFloat(rebalanceData.amount) <= 0 || isRebalancing}
                  className="oz-btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {isRebalancing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Rebalancing...
                    </>
                  ) : (
                    <>
                      <ArrowRightLeft className="w-4 h-4" />
                      Confirm Rebalance
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Withdraw Modal */}
        {showWithdraw && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <div className="w-full max-w-lg rounded-2xl p-6 animate-fade-in" style={{ background: 'var(--oz-card)', border: '1px solid var(--oz-border)' }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold" style={{ color: 'var(--oz-text)' }}>Withdraw Funds</h3>
                <button
                  onClick={() => setShowWithdraw(false)}
                  className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  style={{ color: 'var(--oz-text-muted)' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Token Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--oz-text)' }}>Token</label>
                  <select
                    value={withdrawData.token}
                    onChange={(e) => setWithdrawData({ ...withdrawData, token: e.target.value })}
                    className="oz-input"
                  >
                    <option value="">Select token</option>
                    {tokens.map(t => (
                      <option key={t.id} value={t.symbol}>{t.symbol} - {t.name}</option>
                    ))}
                  </select>
                </div>

                {/* Chain Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--oz-text)' }}>From Chain</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setWithdrawData({ ...withdrawData, chain: 'l2' })}
                      className="p-3 rounded-xl border text-sm font-medium transition-all"
                      style={{
                        background: withdrawData.chain === 'l2' ? 'var(--oz-blue-light)' : 'transparent',
                        borderColor: withdrawData.chain === 'l2' ? 'var(--oz-blue)' : 'var(--oz-border)',
                        color: withdrawData.chain === 'l2' ? 'var(--oz-blue)' : 'var(--oz-text)'
                      }}
                    >
                      L2 Chain
                    </button>
                    <button
                      onClick={() => setWithdrawData({ ...withdrawData, chain: 'hub' })}
                      className="p-3 rounded-xl border text-sm font-medium transition-all"
                      style={{
                        background: withdrawData.chain === 'hub' ? 'var(--oz-blue-light)' : 'transparent',
                        borderColor: withdrawData.chain === 'hub' ? 'var(--oz-blue)' : 'var(--oz-border)',
                        color: withdrawData.chain === 'hub' ? 'var(--oz-blue)' : 'var(--oz-text)'
                      }}
                    >
                      HUB Chain
                    </button>
                  </div>
                </div>

                {/* Available Balance */}
                {withdrawData.token && (
                  <div className="p-3 rounded-xl" style={{ background: 'var(--oz-surface)', border: '1px solid var(--oz-border)' }}>
                    <div className="flex items-center justify-between text-sm">
                      <span style={{ color: 'var(--oz-text-muted)' }}>Available Balance</span>
                      <span className="font-mono font-medium" style={{ color: 'var(--oz-text)' }}>
                        {withdrawData.chain === 'l2' 
                          ? formatNumber(tokens.find(t => t.symbol === withdrawData.token)?.l2Balance || 0)
                          : formatNumber(tokens.find(t => t.symbol === withdrawData.token)?.hubChainBalance || 0)
                        } {withdrawData.token}
                      </span>
                    </div>
                  </div>
                )}

                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--oz-text)' }}>Amount</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={withdrawData.amount}
                      onChange={(e) => setWithdrawData({ ...withdrawData, amount: e.target.value })}
                      placeholder="0.00"
                      className="oz-input font-mono"
                    />
                    <button 
                      onClick={() => {
                        const balance = withdrawData.chain === 'l2' 
                          ? tokens.find(t => t.symbol === withdrawData.token)?.l2Balance 
                          : tokens.find(t => t.symbol === withdrawData.token)?.hubChainBalance
                        setWithdrawData({ ...withdrawData, amount: balance?.toString() || '' })
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded text-xs font-medium"
                      style={{ background: 'var(--oz-blue-light)', color: 'var(--oz-blue)' }}
                    >
                      MAX
                    </button>
                  </div>
                </div>

                {/* Recipient */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--oz-text)' }}>Recipient Address</label>
                  <input
                    type="text"
                    value={withdrawData.recipient}
                    onChange={(e) => setWithdrawData({ ...withdrawData, recipient: e.target.value })}
                    placeholder="0x..."
                    className="oz-input font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => setShowWithdraw(false)}
                  className="oz-btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowWithdraw(false)}
                  disabled={!withdrawData.token || !withdrawData.amount || !withdrawData.recipient}
                  className="oz-btn-primary flex-1 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && tokenToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <div className="w-full max-w-md rounded-2xl p-6 animate-fade-in" style={{ background: 'var(--oz-card)', border: '1px solid var(--oz-border)' }}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold" style={{ color: 'var(--oz-text)' }}>Delete Token</h3>
                    <p className="text-sm" style={{ color: 'var(--oz-text-muted)' }}>Remove {tokenToDelete.symbol} from dashboard</p>
                  </div>
                </div>
                <button
                  onClick={() => { setShowDeleteConfirm(false); setTokenToDelete(null); }}
                  className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  style={{ color: 'var(--oz-text-muted)' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Balance Warning */}
              {(tokenToDelete.l2Balance > 0 || tokenToDelete.hubChainBalance > 0) && (
                <div className="p-4 rounded-xl mb-5 border" style={{ background: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-500 mb-2">Warning: Token has remaining balance</p>
                      <p className="text-sm mb-3" style={{ color: 'var(--oz-text-muted)' }}>
                        Please withdraw all funds before deleting this token to avoid losing access to your assets.
                      </p>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="p-2 rounded-lg" style={{ background: 'var(--oz-surface)' }}>
                          <div className="text-xs mb-1" style={{ color: 'var(--oz-text-muted)' }}>L2 Chain</div>
                          <div className="font-mono font-medium" style={{ color: 'var(--oz-text)' }}>{formatNumber(tokenToDelete.l2Balance)} {tokenToDelete.symbol}</div>
                        </div>
                        <div className="p-2 rounded-lg" style={{ background: 'var(--oz-surface)' }}>
                          <div className="text-xs mb-1" style={{ color: 'var(--oz-text-muted)' }}>HUB Chain</div>
                          <div className="font-mono font-medium" style={{ color: 'var(--oz-text)' }}>{formatNumber(tokenToDelete.hubChainBalance)} {tokenToDelete.symbol}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Zero Balance Confirmation */}
              {tokenToDelete.l2Balance === 0 && tokenToDelete.hubChainBalance === 0 && (
                <div className="p-4 rounded-xl mb-5" style={{ background: 'var(--oz-surface)', border: '1px solid var(--oz-border)' }}>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--oz-success)' }} />
                    <p className="text-sm" style={{ color: 'var(--oz-text)' }}>
                      All balances have been withdrawn. Safe to delete.
                    </p>
                  </div>
                </div>
              )}

              <p className="text-sm mb-5" style={{ color: 'var(--oz-text-muted)' }}>
                Are you sure you want to remove <span className="font-semibold" style={{ color: 'var(--oz-text)' }}>{tokenToDelete.name} ({tokenToDelete.symbol})</span> from your dashboard? This action cannot be undone.
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setShowDeleteConfirm(false); setTokenToDelete(null); }}
                  className="oz-btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteToken}
                  className="flex-1 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 bg-red-500 hover:bg-red-600 text-white"
                >
                  {(tokenToDelete.l2Balance > 0 || tokenToDelete.hubChainBalance > 0) ? 'Delete Anyway' : 'Delete Token'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
