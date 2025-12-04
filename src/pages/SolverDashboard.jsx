import { useState } from 'react'
import { 
  Settings, 
  Plus,
  Trash2,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Activity,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Copy,
  ExternalLink,
  ChevronDown,
  X,
  Search,
  Filter
} from 'lucide-react'

const mockTokens = [
  {
    id: 1,
    name: 'USD Coin',
    symbol: 'USDC',
    newChainAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    hubChainAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    newChainBalance: '45,230.50',
    hubChainBalance: '28,150.00',
    baseFee: '0.50',
    percentFee: '0.05',
    minAmount: '10',
    maxAmount: '100,000',
    status: 'active',
  },
  {
    id: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    newChainAddress: '0x0000000000000000000000000000000000000000',
    hubChainAddress: '0x4200000000000000000000000000000000000006',
    newChainBalance: '15.5',
    hubChainBalance: '8.2',
    baseFee: '0.001',
    percentFee: '0.05',
    minAmount: '0.01',
    maxAmount: '50',
    status: 'active',
  },
  {
    id: 3,
    name: 'Wrapped Bitcoin',
    symbol: 'WBTC',
    newChainAddress: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    hubChainAddress: '0x68f180fcCe6836688e9084f035309E29Bf0A2095',
    newChainBalance: '0.85',
    hubChainBalance: '0.42',
    baseFee: '0.0001',
    percentFee: '0.08',
    minAmount: '0.001',
    maxAmount: '5',
    status: 'low_liquidity',
  },
]

const mockTransactions = [
  {
    id: '0x1234...5678',
    type: 'inflow',
    token: 'USDC',
    amount: '5,000.00',
    from: 'Base',
    to: 'Your L2',
    status: 'completed',
    time: '2 min ago',
  },
  {
    id: '0xabcd...ef01',
    type: 'outflow',
    token: 'ETH',
    amount: '2.5',
    from: 'Your L2',
    to: 'Arbitrum',
    status: 'pending',
    time: '5 min ago',
  },
  {
    id: '0x9876...5432',
    type: 'inflow',
    token: 'USDC',
    amount: '12,500.00',
    from: 'Optimism',
    to: 'Your L2',
    status: 'completed',
    time: '15 min ago',
  },
  {
    id: '0xfedc...ba98',
    type: 'outflow',
    token: 'WBTC',
    amount: '0.15',
    from: 'Your L2',
    to: 'Ethereum',
    status: 'completed',
    time: '1 hour ago',
  },
]

const stats = [
  { label: 'Total Volume (24h)', value: '$1.2M', change: '+12.5%', positive: true, icon: TrendingUp },
  { label: 'Active Intents', value: '23', change: '', icon: Activity },
  { label: 'Avg Fill Time', value: '4.2s', change: '-0.8s', positive: true, icon: Clock },
  { label: 'Success Rate', value: '99.2%', change: '+0.3%', positive: true, icon: CheckCircle2 },
]

export default function SolverDashboard() {
  const [tokens, setTokens] = useState(mockTokens)
  const [showAddToken, setShowAddToken] = useState(false)
  const [selectedToken, setSelectedToken] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [newToken, setNewToken] = useState({
    name: '',
    symbol: '',
    newChainAddress: '',
    hubChainAddress: '',
    baseFee: '',
    percentFee: '',
    minAmount: '',
    maxAmount: '',
  })

  const handleAddToken = () => {
    const token = {
      ...newToken,
      id: tokens.length + 1,
      newChainBalance: '0',
      hubChainBalance: '0',
      status: 'active',
    }
    setTokens([...tokens, token])
    setShowAddToken(false)
    setNewToken({
      name: '',
      symbol: '',
      newChainAddress: '',
      hubChainAddress: '',
      baseFee: '',
      percentFee: '',
      minAmount: '',
      maxAmount: '',
    })
  }

  const handleDeleteToken = (id) => {
    setTokens(tokens.filter(t => t.id !== id))
  }

  const copyAddress = (address) => {
    navigator.clipboard.writeText(address)
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-oz-blue/20 flex items-center justify-center">
                <Settings className="w-5 h-5 text-oz-blue" />
              </div>
              <h1 className="text-3xl font-bold">Solver Dashboard</h1>
            </div>
            <p className="text-oz-text">Manage your solver instance, tokens, and monitor performance.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-oz-border hover:border-oz-blue/50 transition-colors">
              <RefreshCw className="w-4 h-4" />
              Rebalance
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-oz-blue hover:bg-oz-blue/90 text-white font-medium transition-colors">
              <Wallet className="w-4 h-4" />
              Withdraw
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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

        {/* Solver Info Card */}
        <div className="p-6 rounded-2xl bg-oz-card border border-oz-border mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="status-dot status-active" />
                <span className="text-sm font-medium text-emerald-400">Solver Active</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-oz-text">
                <span>Execution Address:</span>
                <code className="font-mono">0x742d...bD73</code>
                <button onClick={() => copyAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f2bD73')} className="hover:text-white">
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="flex flex-col md:items-end gap-1">
              <div className="text-sm text-oz-text">
                Network: <span className="text-white font-medium">My L2 Chain</span>
              </div>
              <div className="text-sm text-oz-text">
                HUB: <span className="text-white font-medium">Base</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tokens Section */}
        <div className="rounded-2xl bg-oz-card border border-oz-border mb-8 overflow-hidden">
          <div className="p-6 border-b border-oz-border">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">Supported Tokens</h2>
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
                  <th className="text-left text-sm font-medium text-oz-text px-6 py-4">Fees</th>
                  <th className="text-left text-sm font-medium text-oz-text px-6 py-4">Limits</th>
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
                      <div className="font-mono">{token.newChainBalance}</div>
                      <div className="text-xs text-oz-text font-mono">
                        {token.newChainAddress.slice(0, 6)}...{token.newChainAddress.slice(-4)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-mono">{token.hubChainBalance}</div>
                      <div className="text-xs text-oz-text font-mono">
                        {token.hubChainAddress.slice(0, 6)}...{token.hubChainAddress.slice(-4)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">{token.baseFee} {token.symbol} + {token.percentFee}%</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">{token.minAmount} - {token.maxAmount}</div>
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

        {/* Recent Transactions */}
        <div className="rounded-2xl bg-oz-card border border-oz-border overflow-hidden">
          <div className="p-6 border-b border-oz-border">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Transactions</h2>
              <button className="flex items-center gap-1.5 text-sm text-oz-text hover:text-white transition-colors">
                View All
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="divide-y divide-oz-border/50">
            {mockTransactions.map((tx) => (
              <div key={tx.id} className="px-6 py-4 hover:bg-oz-darker/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      tx.type === 'inflow' 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : 'bg-blue-500/10 text-blue-400'
                    }`}>
                      {tx.type === 'inflow' ? (
                        <ArrowDownRight className="w-5 h-5" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{tx.amount} {tx.token}</span>
                        <span className="text-oz-text text-sm">{tx.from} → {tx.to}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-oz-text">
                        <code className="font-mono">{tx.id}</code>
                        <span>•</span>
                        <span>{tx.time}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    {tx.status === 'completed' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        Completed
                      </span>
                    )}
                    {tx.status === 'pending' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium">
                        <Clock className="w-3 h-3" />
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Token Modal */}
        {showAddToken && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl bg-oz-card border border-oz-border p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Add New Token</h3>
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Base Fee</label>
                    <input
                      type="text"
                      value={newToken.baseFee}
                      onChange={(e) => setNewToken({ ...newToken, baseFee: e.target.value })}
                      placeholder="0.50"
                      className="w-full px-4 py-2.5 rounded-xl bg-oz-darker border border-oz-border focus:border-oz-blue transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Percent Fee (%)</label>
                    <input
                      type="text"
                      value={newToken.percentFee}
                      onChange={(e) => setNewToken({ ...newToken, percentFee: e.target.value })}
                      placeholder="0.05"
                      className="w-full px-4 py-2.5 rounded-xl bg-oz-darker border border-oz-border focus:border-oz-blue transition-colors text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Min Amount</label>
                    <input
                      type="text"
                      value={newToken.minAmount}
                      onChange={(e) => setNewToken({ ...newToken, minAmount: e.target.value })}
                      placeholder="10"
                      className="w-full px-4 py-2.5 rounded-xl bg-oz-darker border border-oz-border focus:border-oz-blue transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Max Amount</label>
                    <input
                      type="text"
                      value={newToken.maxAmount}
                      onChange={(e) => setNewToken({ ...newToken, maxAmount: e.target.value })}
                      placeholder="100,000"
                      className="w-full px-4 py-2.5 rounded-xl bg-oz-darker border border-oz-border focus:border-oz-blue transition-colors text-sm"
                    />
                  </div>
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

        {/* Edit Token Modal */}
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
                      <div className="font-mono text-lg">{selectedToken.newChainBalance}</div>
                    </div>
                    <div>
                      <div className="text-xs text-oz-text mb-1">HUB Chain</div>
                      <div className="font-mono text-lg">{selectedToken.hubChainBalance}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Base Fee</label>
                    <input
                      type="text"
                      defaultValue={selectedToken.baseFee}
                      className="w-full px-4 py-2.5 rounded-xl bg-oz-darker border border-oz-border focus:border-oz-blue transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Percent Fee (%)</label>
                    <input
                      type="text"
                      defaultValue={selectedToken.percentFee}
                      className="w-full px-4 py-2.5 rounded-xl bg-oz-darker border border-oz-border focus:border-oz-blue transition-colors text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Min Amount</label>
                    <input
                      type="text"
                      defaultValue={selectedToken.minAmount}
                      className="w-full px-4 py-2.5 rounded-xl bg-oz-darker border border-oz-border focus:border-oz-blue transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Max Amount</label>
                    <input
                      type="text"
                      defaultValue={selectedToken.maxAmount}
                      className="w-full px-4 py-2.5 rounded-xl bg-oz-darker border border-oz-border focus:border-oz-blue transition-colors text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => setSelectedToken(null)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-oz-border hover:border-oz-blue/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setSelectedToken(null)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-oz-blue hover:bg-oz-blue/90 text-white font-medium transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

