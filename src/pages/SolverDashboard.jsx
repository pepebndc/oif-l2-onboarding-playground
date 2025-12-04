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
  Shield
} from 'lucide-react'

const mockTokens = [
  {
    id: 1,
    name: 'USD Coin',
    symbol: 'USDC',
    newChainAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    hubChainAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    newChainBalance: 45230.50,
    hubChainBalance: 28150.00,
    status: 'active',
  },
  {
    id: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    newChainAddress: '0x0000000000000000000000000000000000000000',
    hubChainAddress: '0x4200000000000000000000000000000000000006',
    newChainBalance: 15.5,
    hubChainBalance: 8.2,
    status: 'active',
  },
  {
    id: 3,
    name: 'Wrapped Bitcoin',
    symbol: 'WBTC',
    newChainAddress: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    hubChainAddress: '0x68f180fcCe6836688e9084f035309E29Bf0A2095',
    newChainBalance: 0.85,
    hubChainBalance: 0.42,
    status: 'low_liquidity',
  },
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
  const [newToken, setNewToken] = useState({
    name: '',
    symbol: '',
    newChainAddress: '',
    hubChainAddress: '',
  })

  // Connect wallet handler
  const connectWallet = () => {
    setIsConnecting(true)
    setTimeout(() => {
      setIsConnecting(false)
      setIsConnected(true)
      setConnectedAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f2bD73')
    }, 3000)
  }

  const handleAddToken = () => {
    const token = {
      ...newToken,
      id: tokens.length + 1,
      newChainBalance: 0,
      hubChainBalance: 0,
      status: 'active',
    }
    setTokens([...tokens, token])
    setShowAddToken(false)
    setNewToken({
      name: '',
      symbol: '',
      newChainAddress: '',
      hubChainAddress: '',
    })
  }

  const handleDeleteToken = (id) => {
    setTokens(tokens.filter(t => t.id !== id))
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
              newChainBalance: t.newChainBalance - amount,
              hubChainBalance: t.hubChainBalance + amount,
            }
          } else {
            return {
              ...t,
              newChainBalance: t.newChainBalance + amount,
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
      return { l2: rebalanceToken?.newChainBalance || 0, hub: rebalanceToken?.hubChainBalance || 0 }
    }
    const amount = parseFloat(rebalanceData.amount) || 0
    if (rebalanceData.direction === 'l2ToHub') {
      return {
        l2: rebalanceToken.newChainBalance - amount,
        hub: rebalanceToken.hubChainBalance + amount,
      }
    } else {
      return {
        l2: rebalanceToken.newChainBalance + amount,
        hub: rebalanceToken.hubChainBalance - amount,
      }
    }
  }

  const copyAddress = (address) => {
    navigator.clipboard.writeText(address)
  }

  // Login Screen
  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-oz-blue to-oz-purple flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-3">Solver Dashboard</h1>
            <p className="text-oz-text">Connect your wallet to access the solver management dashboard.</p>
          </div>

          <div className="p-6 rounded-2xl bg-oz-card border border-oz-border">
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-oz-darker border border-oz-border">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm">View token balances and transactions</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-oz-darker border border-oz-border">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm">Rebalance liquidity across chains</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-oz-darker border border-oz-border">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm">Withdraw funds to external addresses</span>
              </div>
            </div>

            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-oz-blue to-oz-purple hover:opacity-90 disabled:opacity-70 text-white font-semibold transition-all flex items-center justify-center gap-3"
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

            <p className="text-xs text-oz-text text-center mt-4">
              Only authorized solver operators can access this dashboard.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Network Header - Prominent */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-oz-card to-oz-darker border border-oz-border mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Network Name with Status */}
            <div>
              <div className="flex items-center gap-4 mb-3">
                <h1 className="text-4xl font-bold">My L2 Chain</h1>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-sm font-medium text-emerald-400">Active</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-oz-text">
                <span>Execution Address:</span>
                <code className="font-mono text-white">0x742d...bD73</code>
                <button onClick={() => copyAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f2bD73')} className="hover:text-white transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chain Info */}
            <div className="flex flex-wrap gap-4">
              <div className="px-6 py-4 rounded-xl bg-oz-card border border-oz-border min-w-[140px]">
                <div className="text-xs text-oz-text mb-1 uppercase tracking-wide">Parent (L1)</div>
                <div className="text-xl font-bold text-white">Ethereum</div>
              </div>
              <div className="px-6 py-4 rounded-xl bg-oz-card border border-oz-border min-w-[140px]">
                <div className="text-xs text-oz-text mb-1 uppercase tracking-wide">HUB Chain</div>
                <div className="text-xl font-bold text-white">Base</div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-oz-card border border-oz-border text-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-oz-text">Connected:</span>
            <code className="font-mono text-white">{connectedAddress.slice(0, 6)}...{connectedAddress.slice(-4)}</code>
          </div>
          <button 
            onClick={() => setShowWithdraw(true)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-oz-blue hover:bg-oz-blue/90 text-white font-medium transition-colors"
          >
            <Wallet className="w-4 h-4" />
            Withdraw
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="p-5 rounded-2xl bg-oz-card border border-oz-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-oz-text">{stat.label}</span>
                <stat.icon className="w-4 h-4 text-oz-accent" />
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold">{stat.value}</span>
                {stat.change && (
                  <span className={`text-sm ${stat.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                    {stat.change}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Tokens Section */}
        <div className="rounded-2xl bg-oz-card border border-oz-border overflow-hidden">
          <div className="p-6 border-b border-oz-border">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">Supported Token Pairs</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-oz-text absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tokens..."
                    className="pl-10 pr-4 py-2 rounded-lg bg-oz-darker border border-oz-border focus:border-oz-blue transition-colors text-sm w-48"
                  />
                </div>
                <button
                  onClick={() => setShowAddToken(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-oz-blue hover:bg-oz-blue/90 text-white text-sm font-medium transition-colors"
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
                <tr className="border-b border-oz-border">
                  <th className="text-left text-sm font-medium text-oz-text px-6 py-4">Token</th>
                  <th className="text-left text-sm font-medium text-oz-text px-6 py-4">L2 Balance</th>
                  <th className="text-left text-sm font-medium text-oz-text px-6 py-4">HUB Balance</th>
                  <th className="text-left text-sm font-medium text-oz-text px-6 py-4">Status</th>
                  <th className="text-right text-sm font-medium text-oz-text px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tokens
                  .filter(t => 
                    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    t.symbol.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((token) => (
                  <tr key={token.id} className="border-b border-oz-border/50 hover:bg-oz-darker/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-oz-blue/20 flex items-center justify-center font-semibold text-sm">
                          {token.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-medium">{token.name}</div>
                          <div className="text-xs text-oz-text">{token.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-mono">{formatNumber(token.newChainBalance)}</div>
                      <div className="text-xs text-oz-text font-mono">
                        {token.newChainAddress.slice(0, 6)}...{token.newChainAddress.slice(-4)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-mono">{formatNumber(token.hubChainBalance)}</div>
                      <div className="text-xs text-oz-text font-mono">
                        {token.hubChainAddress.slice(0, 6)}...{token.hubChainAddress.slice(-4)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {token.status === 'active' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Active
                        </span>
                      )}
                      {token.status === 'low_liquidity' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium">
                          <AlertTriangle className="w-3 h-3" />
                          Low Liquidity
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openRebalanceModal(token)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-oz-border hover:border-oz-blue/50 hover:bg-oz-blue/10 transition-colors text-sm"
                        >
                          <ArrowRightLeft className="w-3.5 h-3.5" />
                          Rebalance
                        </button>
                        <button
                          onClick={() => setSelectedToken(token)}
                          className="p-2 rounded-lg hover:bg-oz-border/50 transition-colors text-oz-text hover:text-white"
                        >
                          <Settings className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteToken(token.id)}
                          className="p-2 rounded-lg hover:bg-red-500/10 transition-colors text-oz-text hover:text-red-400"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl bg-oz-card border border-oz-border p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Add New Token Pair</h3>
                <button
                  onClick={() => setShowAddToken(false)}
                  className="p-2 rounded-lg hover:bg-oz-border/50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Token Name</label>
                    <input
                      type="text"
                      value={newToken.name}
                      onChange={(e) => setNewToken({ ...newToken, name: e.target.value })}
                      placeholder="e.g., USD Coin"
                      className="w-full px-4 py-2.5 rounded-xl bg-oz-darker border border-oz-border focus:border-oz-blue transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Symbol</label>
                    <input
                      type="text"
                      value={newToken.symbol}
                      onChange={(e) => setNewToken({ ...newToken, symbol: e.target.value })}
                      placeholder="e.g., USDC"
                      className="w-full px-4 py-2.5 rounded-xl bg-oz-darker border border-oz-border focus:border-oz-blue transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">L2 Chain Address</label>
                  <input
                    type="text"
                    value={newToken.newChainAddress}
                    onChange={(e) => setNewToken({ ...newToken, newChainAddress: e.target.value })}
                    placeholder="0x..."
                    className="w-full px-4 py-2.5 rounded-xl bg-oz-darker border border-oz-border focus:border-oz-blue transition-colors text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">HUB Chain Address</label>
                  <input
                    type="text"
                    value={newToken.hubChainAddress}
                    onChange={(e) => setNewToken({ ...newToken, hubChainAddress: e.target.value })}
                    placeholder="0x..."
                    className="w-full px-4 py-2.5 rounded-xl bg-oz-darker border border-oz-border focus:border-oz-blue transition-colors text-sm font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => setShowAddToken(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-oz-border hover:border-oz-blue/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddToken}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-oz-blue hover:bg-oz-blue/90 text-white font-medium transition-colors"
                >
                  Add Token
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Token Details Modal */}
        {selectedToken && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl bg-oz-card border border-oz-border p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-oz-blue/20 flex items-center justify-center font-semibold">
                    {selectedToken.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{selectedToken.name}</h3>
                    <p className="text-sm text-oz-text">{selectedToken.symbol}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedToken(null)}
                  className="p-2 rounded-lg hover:bg-oz-border/50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-oz-darker border border-oz-border">
                  <h4 className="text-sm font-medium mb-3">Balances</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-oz-text mb-1">L2 Chain</div>
                      <div className="font-mono text-lg">{formatNumber(selectedToken.newChainBalance)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-oz-text mb-1">HUB Chain</div>
                      <div className="font-mono text-lg">{formatNumber(selectedToken.hubChainBalance)}</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-oz-darker border border-oz-border">
                  <h4 className="text-sm font-medium mb-3">Contract Addresses</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-oz-text mb-1">L2 Chain</div>
                      <div className="flex items-center gap-2">
                        <code className="font-mono text-sm flex-1 truncate">{selectedToken.newChainAddress}</code>
                        <button onClick={() => copyAddress(selectedToken.newChainAddress)} className="p-1 hover:text-white text-oz-text">
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-oz-text mb-1">HUB Chain</div>
                      <div className="flex items-center gap-2">
                        <code className="font-mono text-sm flex-1 truncate">{selectedToken.hubChainAddress}</code>
                        <button onClick={() => copyAddress(selectedToken.hubChainAddress)} className="p-1 hover:text-white text-oz-text">
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-oz-darker border border-oz-border">
                  <h4 className="text-sm font-medium mb-3">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => { openRebalanceModal(selectedToken); setSelectedToken(null); }}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-oz-border hover:border-oz-blue/50 hover:bg-oz-blue/10 transition-colors text-sm"
                    >
                      <ArrowRightLeft className="w-4 h-4" />
                      Rebalance
                    </button>
                    <button
                      onClick={() => { setWithdrawData({ ...withdrawData, token: selectedToken.symbol }); setShowWithdraw(true); setSelectedToken(null); }}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-oz-border hover:border-oz-blue/50 hover:bg-oz-blue/10 transition-colors text-sm"
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
                  className="flex-1 px-4 py-2.5 rounded-xl border border-oz-border hover:border-oz-blue/50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Rebalance Modal */}
        {showRebalance && rebalanceToken && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl bg-oz-card border border-oz-border p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-oz-blue/20 flex items-center justify-center font-semibold">
                    {rebalanceToken.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Rebalance {rebalanceToken.symbol}</h3>
                    <p className="text-sm text-oz-text">Move liquidity between chains</p>
                  </div>
                </div>
                <button
                  onClick={() => { setShowRebalance(false); setRebalanceToken(null); }}
                  className="p-2 rounded-lg hover:bg-oz-border/50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-5">
                {/* Current Balances */}
                <div className="p-4 rounded-xl bg-oz-darker border border-oz-border">
                  <h4 className="text-sm font-medium mb-3 text-oz-text">Current Balances</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-oz-text mb-1">L2 Chain</div>
                      <div className="font-mono text-lg">{formatNumber(rebalanceToken.newChainBalance)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-oz-text mb-1">HUB Chain</div>
                      <div className="font-mono text-lg">{formatNumber(rebalanceToken.hubChainBalance)}</div>
                    </div>
                  </div>
                </div>

                {/* Direction Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">Direction</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setRebalanceData({ ...rebalanceData, direction: 'l2ToHub' })}
                      className={`p-4 rounded-xl border text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                        rebalanceData.direction === 'l2ToHub'
                          ? 'bg-oz-blue/10 border-oz-blue text-oz-blue'
                          : 'border-oz-border hover:border-oz-blue/50'
                      }`}
                    >
                      L2 <ArrowRight className="w-4 h-4" /> HUB
                    </button>
                    <button
                      onClick={() => setRebalanceData({ ...rebalanceData, direction: 'hubToL2' })}
                      className={`p-4 rounded-xl border text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                        rebalanceData.direction === 'hubToL2'
                          ? 'bg-oz-blue/10 border-oz-blue text-oz-blue'
                          : 'border-oz-border hover:border-oz-blue/50'
                      }`}
                    >
                      HUB <ArrowRight className="w-4 h-4" /> L2
                    </button>
                  </div>
                </div>

                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-medium mb-2">Amount</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={rebalanceData.amount}
                      onChange={(e) => setRebalanceData({ ...rebalanceData, amount: e.target.value })}
                      placeholder="0.00"
                      className="w-full px-4 py-3 rounded-xl bg-oz-darker border border-oz-border focus:border-oz-blue transition-colors font-mono"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <span className="text-oz-text text-sm">{rebalanceToken.symbol}</span>
                      <button 
                        onClick={() => {
                          const maxAmount = rebalanceData.direction === 'l2ToHub' 
                            ? rebalanceToken.newChainBalance 
                            : rebalanceToken.hubChainBalance
                          setRebalanceData({ ...rebalanceData, amount: maxAmount.toString() })
                        }}
                        className="px-2 py-0.5 rounded bg-oz-blue/10 text-oz-blue text-xs font-medium hover:bg-oz-blue/20"
                      >
                        MAX
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-oz-text mt-2">
                    Available: {formatNumber(rebalanceData.direction === 'l2ToHub' ? rebalanceToken.newChainBalance : rebalanceToken.hubChainBalance)} {rebalanceToken.symbol}
                  </p>
                </div>

                {/* Preview */}
                {rebalanceData.amount && parseFloat(rebalanceData.amount) > 0 && (
                  <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                    <h4 className="text-sm font-medium mb-3 text-emerald-400 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Balances After Rebalance
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-oz-text mb-1">L2 Chain</div>
                        <div className="font-mono text-lg">
                          {formatNumber(getPreviewBalances().l2)}
                          <span className={`text-sm ml-2 ${rebalanceData.direction === 'l2ToHub' ? 'text-red-400' : 'text-emerald-400'}`}>
                            {rebalanceData.direction === 'l2ToHub' ? '−' : '+'}{rebalanceData.amount}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-oz-text mb-1">HUB Chain</div>
                        <div className="font-mono text-lg">
                          {formatNumber(getPreviewBalances().hub)}
                          <span className={`text-sm ml-2 ${rebalanceData.direction === 'hubToL2' ? 'text-red-400' : 'text-emerald-400'}`}>
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
                  className="flex-1 px-4 py-2.5 rounded-xl border border-oz-border hover:border-oz-blue/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={executeRebalance}
                  disabled={!rebalanceData.amount || parseFloat(rebalanceData.amount) <= 0 || isRebalancing}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-oz-blue hover:bg-oz-blue/90 disabled:bg-oz-blue/30 disabled:cursor-not-allowed text-white font-medium transition-colors flex items-center justify-center gap-2"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl bg-oz-card border border-oz-border p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Withdraw Funds</h3>
                <button
                  onClick={() => setShowWithdraw(false)}
                  className="p-2 rounded-lg hover:bg-oz-border/50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Token Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">Token</label>
                  <select
                    value={withdrawData.token}
                    onChange={(e) => setWithdrawData({ ...withdrawData, token: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-oz-darker border border-oz-border focus:border-oz-blue transition-colors text-sm"
                  >
                    <option value="">Select token</option>
                    {tokens.map(t => (
                      <option key={t.id} value={t.symbol}>{t.symbol} - {t.name}</option>
                    ))}
                  </select>
                </div>

                {/* Chain Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">From Chain</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setWithdrawData({ ...withdrawData, chain: 'l2' })}
                      className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                        withdrawData.chain === 'l2'
                          ? 'bg-oz-blue/10 border-oz-blue text-oz-blue'
                          : 'border-oz-border hover:border-oz-blue/50'
                      }`}
                    >
                      L2 Chain
                    </button>
                    <button
                      onClick={() => setWithdrawData({ ...withdrawData, chain: 'hub' })}
                      className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                        withdrawData.chain === 'hub'
                          ? 'bg-oz-blue/10 border-oz-blue text-oz-blue'
                          : 'border-oz-border hover:border-oz-blue/50'
                      }`}
                    >
                      HUB Chain
                    </button>
                  </div>
                </div>

                {/* Available Balance */}
                {withdrawData.token && (
                  <div className="p-3 rounded-xl bg-oz-darker border border-oz-border">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-oz-text">Available Balance</span>
                      <span className="font-mono font-medium">
                        {withdrawData.chain === 'l2' 
                          ? formatNumber(tokens.find(t => t.symbol === withdrawData.token)?.newChainBalance || 0)
                          : formatNumber(tokens.find(t => t.symbol === withdrawData.token)?.hubChainBalance || 0)
                        } {withdrawData.token}
                      </span>
                    </div>
                  </div>
                )}

                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium mb-2">Amount</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={withdrawData.amount}
                      onChange={(e) => setWithdrawData({ ...withdrawData, amount: e.target.value })}
                      placeholder="0.00"
                      className="w-full px-4 py-2.5 rounded-xl bg-oz-darker border border-oz-border focus:border-oz-blue transition-colors text-sm font-mono"
                    />
                    <button 
                      onClick={() => {
                        const balance = withdrawData.chain === 'l2' 
                          ? tokens.find(t => t.symbol === withdrawData.token)?.newChainBalance 
                          : tokens.find(t => t.symbol === withdrawData.token)?.hubChainBalance
                        setWithdrawData({ ...withdrawData, amount: balance?.toString() || '' })
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-oz-blue/10 text-oz-blue text-xs font-medium hover:bg-oz-blue/20"
                    >
                      MAX
                    </button>
                  </div>
                </div>

                {/* Recipient */}
                <div>
                  <label className="block text-sm font-medium mb-2">Recipient Address</label>
                  <input
                    type="text"
                    value={withdrawData.recipient}
                    onChange={(e) => setWithdrawData({ ...withdrawData, recipient: e.target.value })}
                    placeholder="0x..."
                    className="w-full px-4 py-2.5 rounded-xl bg-oz-darker border border-oz-border focus:border-oz-blue transition-colors text-sm font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => setShowWithdraw(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-oz-border hover:border-oz-blue/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowWithdraw(false)}
                  disabled={!withdrawData.token || !withdrawData.amount || !withdrawData.recipient}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-oz-blue hover:bg-oz-blue/90 disabled:bg-oz-blue/30 disabled:cursor-not-allowed text-white font-medium transition-colors"
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
