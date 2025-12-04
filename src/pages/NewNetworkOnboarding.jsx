import { useState, useEffect } from 'react'
import { 
  Layers, 
  ChevronRight, 
  Check, 
  AlertCircle,
  Loader2,
  ExternalLink,
  Copy,
  Server,
  Wallet,
  Settings,
  CheckCircle2,
  Circle,
  Info,
  Plus,
  X,
  Trash2,
  RefreshCw,
  Coins,
  Send,
  Mail,
  Clock
} from 'lucide-react'

const steps = [
  { id: 1, title: 'Network Configuration', icon: Server },
  { id: 2, title: 'Solver Setup', icon: Settings },
  { id: 3, title: 'Token Pairs', icon: Coins },
  { id: 4, title: 'Fund & Launch', icon: Wallet },
]

// Real chain icons as SVG components
const ChainIcons = {
  ethereum: () => (
    <svg viewBox="0 0 32 32" className="w-7 h-7">
      <g fill="none" fillRule="evenodd">
        <circle cx="16" cy="16" r="16" fill="#627EEA"/>
        <g fill="#FFF" fillRule="nonzero">
          <path fillOpacity=".602" d="M16.498 4v8.87l7.497 3.35z"/>
          <path d="M16.498 4L9 16.22l7.498-3.35z"/>
          <path fillOpacity=".602" d="M16.498 21.968v6.027L24 17.616z"/>
          <path d="M16.498 27.995v-6.028L9 17.616z"/>
          <path fillOpacity=".2" d="M16.498 20.573l7.497-4.353-7.497-3.348z"/>
          <path fillOpacity=".602" d="M9 16.22l7.498 4.353v-7.701z"/>
        </g>
      </g>
    </svg>
  ),
  arbitrum: () => (
    <svg viewBox="0 0 32 32" className="w-7 h-7">
      <g fill="none">
        <circle cx="16" cy="16" r="16" fill="#2D374B"/>
        <path fill="#28A0F0" d="M16.8 10.6l5.2 8.3-2.4 1.4-3.9-6.2-1.1 1.7 3.3 5.3-2.4 1.4-4.4-7z"/>
        <path fill="#FFF" d="M20.5 21.7l2.4-1.4.8 1.3-2.4 1.4zM11.3 21.7l-2.4-1.4-.8 1.3 2.4 1.4z"/>
        <path fill="#28A0F0" d="M15.2 10.6l-5.2 8.3 2.4 1.4 3.9-6.2 1.1 1.7-3.3 5.3 2.4 1.4 4.4-7z"/>
      </g>
    </svg>
  ),
  optimism: () => (
    <svg viewBox="0 0 32 32" className="w-7 h-7">
      <circle cx="16" cy="16" r="16" fill="#FF0420"/>
      <path fill="#FFF" d="M10.9 19.2c-1.5 0-2.7-.4-3.5-1.2-.8-.8-1.2-2-1.2-3.4 0-1 .2-1.9.6-2.7.4-.8 1-1.4 1.8-1.9.8-.4 1.7-.7 2.7-.7 1.4 0 2.5.4 3.3 1.2.8.8 1.2 1.9 1.2 3.3 0 1-.2 2-.6 2.8-.4.8-1 1.4-1.8 1.9-.8.5-1.6.7-2.5.7zm.2-2.1c.5 0 1-.2 1.3-.5.3-.3.6-.8.7-1.3.2-.6.2-1.1.2-1.7 0-.7-.2-1.2-.5-1.6-.3-.4-.8-.6-1.4-.6-.5 0-1 .2-1.3.5-.3.3-.6.8-.8 1.3-.2.6-.2 1.1-.2 1.7 0 .7.2 1.2.5 1.6.4.4.9.6 1.5.6zm7.4 1.9V10.6h2.3l.2 1.3c.3-.5.7-.9 1.2-1.1.5-.3 1-.4 1.6-.4.9 0 1.6.3 2.1.8.5.5.8 1.3.8 2.3V19h-2.6v-5c0-.5-.1-.9-.3-1.2-.2-.3-.6-.4-1-.4-.5 0-.9.2-1.2.5-.3.4-.5.9-.5 1.5V19h-2.6z"/>
    </svg>
  ),
  base: () => (
    <svg viewBox="0 0 32 32" className="w-7 h-7">
      <circle cx="16" cy="16" r="16" fill="#0052FF"/>
      <path fill="#FFF" d="M16 6c5.5 0 10 4.5 10 10s-4.5 10-10 10S6 21.5 6 16h8v-2H6.2c.5-4.5 4.3-8 8.8-8h1v8h-2V8.2c-3.4.5-6 3.3-6 6.8 0 3.9 3.1 7 7 7s7-3.1 7-7-3.1-7-7-7h-1V6h1z"/>
    </svg>
  ),
  zksync: () => (
    <svg viewBox="0 0 32 32" className="w-7 h-7">
      <circle cx="16" cy="16" r="16" fill="#8C8DFC"/>
      <path fill="#FFF" d="M22.5 11L16 16l6.5 5v-3.5L19 16l3.5-1.5V11zM9.5 21l6.5-5-6.5-5v3.5L13 16l-3.5 1.5V21z"/>
    </svg>
  ),
  linea: () => (
    <svg viewBox="0 0 32 32" className="w-7 h-7">
      <circle cx="16" cy="16" r="16" fill="#121212"/>
      <path fill="#FFF" d="M8 22V10h2.5v9.6h6.1V22H8zm10.4 0V10h2.5v12h-2.5z"/>
    </svg>
  ),
  polygon: () => (
    <svg viewBox="0 0 32 32" className="w-7 h-7">
      <circle cx="16" cy="16" r="16" fill="#8247E5"/>
      <path fill="#FFF" d="M21.2 13.3c-.4-.2-.9-.2-1.2 0l-2.8 1.6-1.9 1.1-2.8 1.6c-.4.2-.9.2-1.2 0l-2.2-1.3c-.4-.2-.6-.6-.6-1v-2.5c0-.4.2-.8.6-1l2.2-1.2c.4-.2.9-.2 1.2 0l2.2 1.3c.4.2.6.6.6 1v1.6l1.9-1.1v-1.6c0-.4-.2-.8-.6-1l-4-2.3c-.4-.2-.9-.2-1.2 0l-4.1 2.4c-.4.2-.6.6-.6 1v4.6c0 .4.2.8.6 1l4.1 2.4c.4.2.9.2 1.2 0l2.8-1.6 1.9-1.1 2.8-1.6c.4-.2.9-.2 1.2 0l2.2 1.2c.4.2.6.6.6 1v2.5c0 .4-.2.8-.6 1l-2.2 1.3c-.4.2-.9.2-1.2 0l-2.2-1.3c-.4-.2-.6-.6-.6-1v-1.6l-1.9 1.1v1.6c0 .4.2.8.6 1l4.1 2.4c.4.2.9.2 1.2 0l4.1-2.4c.4-.2.6-.6.6-1v-4.6c0-.4-.2-.8-.6-1l-4.2-2.5z"/>
    </svg>
  ),
}

const parentNetworks = [
  { id: 'ethereum', name: 'Ethereum Mainnet', type: 'L1' },
  { id: 'arbitrum', name: 'Arbitrum One', type: 'L2' },
  { id: 'optimism', name: 'OP Mainnet', type: 'L2' },
  { id: 'base', name: 'Base', type: 'L2' },
  { id: 'zksync', name: 'zkSync Era', type: 'L2' },
  { id: 'polygon', name: 'Polygon PoS', type: 'L1' },
]

const hubChains = [
  { id: 'ethereum', name: 'Ethereum Mainnet', settlementTime: '~15 min' },
  { id: 'arbitrum', name: 'Arbitrum One', settlementTime: '~7 min' },
  { id: 'optimism', name: 'Optimism', settlementTime: '~7 min' },
  { id: 'base', name: 'Base', settlementTime: '~7 min' },
  { id: 'zksync', name: 'zkSync Era', settlementTime: '~1 min' },
  { id: 'linea', name: 'Linea', settlementTime: '~2 min' },
]


// Default token pairs - L2 addresses need to be provided by user
const defaultTokenPairs = [
  {
    id: 1,
    l2Address: '', // User must provide
    hubAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    l2Symbol: '', // Will be fetched when L2 address is provided
    l2Decimals: '',
    hubSymbol: 'USDC',
    hubDecimals: '6',
    isDefault: true,
  },
  {
    id: 2,
    l2Address: '', // User must provide
    hubAddress: '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2',
    l2Symbol: '', // Will be fetched when L2 address is provided
    l2Decimals: '',
    hubSymbol: 'USDT',
    hubDecimals: '18',
    isDefault: true,
  },
]

export default function NewNetworkOnboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    chainName: '',
    chainId: '',
    rpcUrl: '',
    explorerUrl: '',
    parentChain: '',
    hubChain: '',
    backupAdminAddress: '',
  })
  const [notificationEmails, setNotificationEmails] = useState([''])
  
  // AWS KMS state
  const [generatingKMS, setGeneratingKMS] = useState(false)
  const [kmsAddress, setKmsAddress] = useState(null)
  
  // Token pairs state - initialized with defaults
  const [tokenPairs, setTokenPairs] = useState(defaultTokenPairs)
  const [newTokenPair, setNewTokenPair] = useState({
    l2Address: '',
    hubAddress: '',
    l2Symbol: '',
    l2Decimals: '',
    hubSymbol: '',
    hubDecimals: '',
    l2Loading: false,
    hubLoading: false,
  })

  // Deposit verification state
  const [verifyingDeposits, setVerifyingDeposits] = useState(false)
  const [depositsVerified, setDepositsVerified] = useState(false)
  const [launchComplete, setLaunchComplete] = useState(false)
  const [depositProgress, setDepositProgress] = useState({
    eth: 0,
    tokens: 0,
  })

  // Wallet connection state
  const [walletConnecting, setWalletConnecting] = useState(false)
  const [walletAddress, setWalletAddress] = useState(null)

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Connect wallet handler
  const connectWallet = () => {
    setWalletConnecting(true)
    setTimeout(() => {
      setWalletAddress('0x1234567890abcdef1234567890abcdef12345678')
      setWalletConnecting(false)
    }, 1000)
  }

  // Email handlers
  const addEmail = () => {
    setNotificationEmails([...notificationEmails, ''])
  }

  const removeEmail = (index) => {
    if (notificationEmails.length > 1) {
      setNotificationEmails(notificationEmails.filter((_, i) => i !== index))
    }
  }

  const updateEmail = (index, value) => {
    const updated = [...notificationEmails]
    updated[index] = value
    setNotificationEmails(updated)
  }

  // Generate AWS KMS
  const generateKMS = () => {
    setGeneratingKMS(true)
    setTimeout(() => {
      setKmsAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f2bD73')
      setGeneratingKMS(false)
    }, 5000)
  }

  // Auto-generate KMS when entering step 2 (Solver Setup)
  useEffect(() => {
    if (currentStep === 2 && !kmsAddress && !generatingKMS) {
      generateKMS()
    }
  }, [currentStep])

  // Verify deposits simulation
  const verifyDeposits = () => {
    setVerifyingDeposits(true)
    
    // Simulate ETH deposit verification
    const ethInterval = setInterval(() => {
      setDepositProgress(prev => {
        if (prev.eth >= 100) {
          clearInterval(ethInterval)
          return prev
        }
        return { ...prev, eth: Math.min(prev.eth + 20, 100) }
      })
    }, 400)

    // Simulate token deposit verification after ETH
    setTimeout(() => {
      const tokenInterval = setInterval(() => {
        setDepositProgress(prev => {
          if (prev.tokens >= 100) {
            clearInterval(tokenInterval)
            return prev
          }
          return { ...prev, tokens: Math.min(prev.tokens + 25, 100) }
        })
      }, 300)

      setTimeout(() => {
        clearInterval(tokenInterval)
        setDepositProgress({ eth: 100, tokens: 100 })
        setDepositsVerified(true)
        setVerifyingDeposits(false)
      }, 1500)
    }, 2500)
  }

  // Launch solver
  const launchSolver = () => {
    setVerifyingDeposits(true)
    setTimeout(() => {
      setLaunchComplete(true)
      setVerifyingDeposits(false)
    }, 2000)
  }

  // Token pair handlers
  const simulateFetchTokenInfo = (address, side) => {
    const mockTokens = {
      '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': { symbol: 'USDC', decimals: '6' },
      '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913': { symbol: 'USDC', decimals: '6' },
      '0xdAC17F958D2ee523a2206206994597C13D831ec7': { symbol: 'USDT', decimals: '6' },
      '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2': { symbol: 'USDT', decimals: '6' },
      '0x4200000000000000000000000000000000000006': { symbol: 'WETH', decimals: '18' },
      '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2': { symbol: 'WETH', decimals: '18' },
      '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599': { symbol: 'WBTC', decimals: '8' },
    }

    if (address.length === 42 && address.startsWith('0x')) {
      setNewTokenPair(prev => ({
        ...prev,
        [`${side}Loading`]: true
      }))
      
      setTimeout(() => {
        const tokenInfo = mockTokens[address] || { symbol: 'TOKEN', decimals: '18' }
        setNewTokenPair(prev => ({
          ...prev,
          [`${side}Symbol`]: tokenInfo.symbol,
          [`${side}Decimals`]: tokenInfo.decimals,
          [`${side}Loading`]: false
        }))
      }, 1500)
    }
  }

  const handleL2AddressChange = (value) => {
    setNewTokenPair(prev => ({ ...prev, l2Address: value, l2Symbol: '', l2Decimals: '' }))
    if (value.length === 42) {
      simulateFetchTokenInfo(value, 'l2')
    }
  }

  const handleHubAddressChange = (value) => {
    setNewTokenPair(prev => ({ ...prev, hubAddress: value, hubSymbol: '', hubDecimals: '' }))
    if (value.length === 42) {
      simulateFetchTokenInfo(value, 'hub')
    }
  }

  const addTokenPair = () => {
    if (newTokenPair.l2Address && newTokenPair.hubAddress && newTokenPair.l2Symbol && newTokenPair.hubSymbol) {
      setTokenPairs([...tokenPairs, {
        id: Date.now(),
        l2Address: newTokenPair.l2Address,
        hubAddress: newTokenPair.hubAddress,
        l2Symbol: newTokenPair.l2Symbol,
        l2Decimals: newTokenPair.l2Decimals,
        hubSymbol: newTokenPair.hubSymbol,
        hubDecimals: newTokenPair.hubDecimals,
      }])
      setNewTokenPair({
        l2Address: '',
        hubAddress: '',
        l2Symbol: '',
        l2Decimals: '',
        hubSymbol: '',
        hubDecimals: '',
        l2Loading: false,
        hubLoading: false,
      })
    }
  }

  const removeTokenPair = (id) => {
    setTokenPairs(tokenPairs.filter(t => t.id !== id))
  }

  // Update L2 address for existing token pair (for default tokens)
  const updateTokenPairL2Address = (id, address) => {
    setTokenPairs(tokenPairs.map(t => 
      t.id === id ? { ...t, l2Address: address, l2Symbol: '', l2Decimals: '', l2Loading: false } : t
    ))
    
    // Simulate fetching token info
    if (address.length === 42 && address.startsWith('0x')) {
      setTokenPairs(prev => prev.map(t => 
        t.id === id ? { ...t, l2Loading: true } : t
      ))
      
      const mockTokens = {
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': { symbol: 'USDC', decimals: '6' },
        '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913': { symbol: 'USDC', decimals: '6' },
        '0xdAC17F958D2ee523a2206206994597C13D831ec7': { symbol: 'USDT', decimals: '6' },
        '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2': { symbol: 'USDT', decimals: '6' },
        '0x4200000000000000000000000000000000000006': { symbol: 'WETH', decimals: '18' },
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2': { symbol: 'WETH', decimals: '18' },
        '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599': { symbol: 'WBTC', decimals: '8' },
      }
      
      setTimeout(() => {
        const tokenInfo = mockTokens[address] || { symbol: 'TOKEN', decimals: '18' }
        setTokenPairs(prev => prev.map(t => 
          t.id === id ? { ...t, l2Symbol: tokenInfo.symbol, l2Decimals: tokenInfo.decimals, l2Loading: false } : t
        ))
      }, 1500)
    }
  }

  const copyAddress = (address) => {
    navigator.clipboard.writeText(address)
  }

  const renderChainIcon = (chainId) => {
    const IconComponent = ChainIcons[chainId]
    return IconComponent ? <IconComponent /> : null
  }

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: 'var(--oz-bg)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full oz-card mb-6">
            <Layers className="w-4 h-4" style={{ color: 'var(--oz-blue)' }} />
            <span className="text-sm" style={{ color: 'var(--oz-text-muted)' }}>Network Onboarding</span>
          </div>
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--oz-text)' }}>Onboard Your L2</h1>
          <p style={{ color: 'var(--oz-text-muted)' }} className="max-w-xl mx-auto">
            Deploy OIF infrastructure and connect your chain to the intent-based bridging ecosystem.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12 overflow-x-auto pb-4">
          <div className="flex items-center justify-between relative min-w-[600px]">
            {/* Progress Line */}
            <div className="absolute top-6 left-0 right-0 h-0.5" style={{ background: 'var(--oz-border)' }} />
            <div 
              className="absolute top-6 left-0 h-0.5 transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`, background: 'var(--oz-blue)' }}
            />
            
            {steps.map((step) => (
              <div key={step.id} className="relative flex flex-col items-center">
                <button
                  onClick={() => !launchComplete && setCurrentStep(step.id)}
                  disabled={launchComplete}
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10`}
                  style={{
                    background: step.id < currentStep || launchComplete 
                      ? 'var(--oz-blue)' 
                      : 'var(--oz-card)',
                    borderColor: step.id <= currentStep || launchComplete 
                      ? 'var(--oz-blue)' 
                      : 'var(--oz-border)',
                    color: step.id < currentStep || launchComplete 
                      ? 'white' 
                      : step.id === currentStep 
                        ? 'var(--oz-blue)' 
                        : 'var(--oz-text-muted)'
                  }}
                >
                  {step.id < currentStep || launchComplete ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </button>
                <span 
                  className="mt-3 text-xs font-medium text-center whitespace-nowrap"
                  style={{ color: step.id <= currentStep ? 'var(--oz-text)' : 'var(--oz-text-muted)' }}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="oz-card p-8">
          {/* Step 1: Network Configuration */}
          {currentStep === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--oz-text)' }}>Network Configuration</h2>
              <p style={{ color: 'var(--oz-text-muted)' }} className="mb-8">Provide details about your L2 chain and select a HUB for connectivity.</p>

              {/* Wallet Connection */}
              <div className="p-4 rounded-xl mb-8" style={{ background: 'var(--oz-surface)', border: '1px solid var(--oz-border)' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--oz-blue-light)' }}>
                      <Wallet className="w-5 h-5" style={{ color: 'var(--oz-blue)' }} />
                    </div>
                    <div>
                      <div className="font-medium" style={{ color: 'var(--oz-text)' }}>Wallet Connection</div>
                      <div className="text-xs" style={{ color: 'var(--oz-text-muted)' }}>
                        {walletAddress ? 'Connected' : 'Connect your wallet to continue'}
                      </div>
                    </div>
                  </div>
                  
                  {walletAddress ? (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'var(--oz-bg)', border: '1px solid var(--oz-border)' }}>
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <code className="text-sm font-mono" style={{ color: 'var(--oz-text)' }}>
                          {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                        </code>
                      </div>
                      <button
                        onClick={() => setWalletAddress(null)}
                        className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      >
                        <X className="w-4 h-4" style={{ color: 'var(--oz-text-muted)' }} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={connectWallet}
                      disabled={walletConnecting}
                      className="oz-btn-primary px-4 py-2 flex items-center gap-2 disabled:opacity-50"
                    >
                      {walletConnecting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Wallet className="w-4 h-4" />
                          Connect Wallet
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--oz-text)' }}>Chain Name</label>
                    <input
                      type="text"
                      name="chainName"
                      value={formData.chainName}
                      onChange={handleInputChange}
                      placeholder="e.g., My L2 Network"
                      className="oz-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--oz-text)' }}>Chain ID</label>
                    <input
                      type="text"
                      name="chainId"
                      value={formData.chainId}
                      onChange={handleInputChange}
                      placeholder="e.g., 42161"
                      className="oz-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--oz-text)' }}>RPC URL</label>
                  <input
                    type="text"
                    name="rpcUrl"
                    value={formData.rpcUrl}
                    onChange={handleInputChange}
                    placeholder="https://rpc.your-network.io"
                    className="oz-input font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--oz-text)' }}>Block Explorer URL</label>
                  <input
                    type="text"
                    name="explorerUrl"
                    value={formData.explorerUrl}
                    onChange={handleInputChange}
                    placeholder="https://explorer.your-network.io"
                    className="oz-input font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3" style={{ color: 'var(--oz-text)' }}>Parent Network (L1)</label>
                  <p className="text-sm mb-4" style={{ color: 'var(--oz-text-muted)' }}>
                    Select the parent chain that your L2 settles to. This is used for canonical bridge integration.
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {parentNetworks.map((chain) => (
                      <button
                        key={chain.id}
                        onClick={() => setFormData({ ...formData, parentChain: chain.id })}
                        className="flex items-center gap-4 p-4 rounded-xl border transition-all text-left"
                        style={{
                          background: formData.parentChain === chain.id ? 'rgba(16, 185, 129, 0.1)' : 'var(--oz-surface)',
                          borderColor: formData.parentChain === chain.id ? 'var(--oz-success)' : 'var(--oz-border)'
                        }}
                      >
                        <div className="flex-shrink-0">
                          {renderChainIcon(chain.id)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate" style={{ color: 'var(--oz-text)' }}>{chain.name}</div>
                          <div className="text-xs" style={{ color: 'var(--oz-text-muted)' }}>{chain.type}</div>
                        </div>
                        {formData.parentChain === chain.id && (
                          <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3" style={{ color: 'var(--oz-text)' }}>Select HUB Chain</label>
                  <p className="text-sm mb-4" style={{ color: 'var(--oz-text-muted)' }}>
                    Choose a HUB chain based on settlement speed and liquidity availability.
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {hubChains.map((chain) => (
                      <button
                        key={chain.id}
                        onClick={() => setFormData({ ...formData, hubChain: chain.id })}
                        className="flex items-center gap-4 p-4 rounded-xl border transition-all text-left"
                        style={{
                          background: formData.hubChain === chain.id ? 'var(--oz-blue-light)' : 'var(--oz-surface)',
                          borderColor: formData.hubChain === chain.id ? 'var(--oz-blue)' : 'var(--oz-border)'
                        }}
                      >
                        <div className="flex-shrink-0">
                          {renderChainIcon(chain.id)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate" style={{ color: 'var(--oz-text)' }}>{chain.name}</div>
                          <div className="text-xs" style={{ color: 'var(--oz-text-muted)' }}>Settlement: {chain.settlementTime}</div>
                        </div>
                        {formData.hubChain === chain.id && (
                          <Check className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--oz-blue)' }} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Solver Setup */}
          {currentStep === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--oz-text)' }}>Solver Configuration</h2>
              <p style={{ color: 'var(--oz-text-muted)' }} className="mb-8">Configure the solver instance that will operate your bridge routes.</p>

              <div className="space-y-6">
                {/* AWS KMS Generation */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--oz-text)' }}>Solver Execution Address</label>
                  <p className="text-xs mb-3" style={{ color: 'var(--oz-text-muted)' }}>
                    A secure AWS KMS signer is being generated for your solver instance.
                  </p>
                  
                  <div className="p-4 rounded-xl" style={{ background: 'var(--oz-surface)', border: '1px solid var(--oz-border)' }}>
                    {generatingKMS ? (
                      <div className="flex items-center gap-3">
                        <Loader2 className="w-5 h-5 animate-spin" style={{ color: 'var(--oz-blue)' }} />
                        <div>
                          <div className="font-medium" style={{ color: 'var(--oz-blue)' }}>Generating AWS KMS Signer...</div>
                          <div className="text-xs mt-1" style={{ color: 'var(--oz-text-muted)' }}>
                            Creating secure key pair for transaction signing
                          </div>
                        </div>
                      </div>
                    ) : kmsAddress ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          <div>
                            <div className="text-xs mb-1" style={{ color: 'var(--oz-text-muted)' }}>Generated Address</div>
                            <code className="font-mono text-sm" style={{ color: 'var(--oz-text)' }}>{kmsAddress}</code>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => copyAddress(kmsAddress)}
                            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                          >
                            <Copy className="w-4 h-4" style={{ color: 'var(--oz-text-muted)' }} />
                          </button>
                          <button
                            onClick={() => { setKmsAddress(null); generateKMS(); }}
                            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                          >
                            <RefreshCw className="w-4 h-4" style={{ color: 'var(--oz-text-muted)' }} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={generateKMS}
                        className="flex items-center gap-2 hover:underline"
                        style={{ color: 'var(--oz-blue)' }}
                      >
                        <Plus className="w-4 h-4" />
                        Generate KMS Signer
                      </button>
                    )}
                  </div>
                </div>

                {/* Multiple Notification Emails */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium" style={{ color: 'var(--oz-text)' }}>Notification Emails</label>
                    <button
                      onClick={addEmail}
                      className="flex items-center gap-1.5 text-xs hover:underline"
                      style={{ color: 'var(--oz-blue)' }}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Email
                    </button>
                  </div>
                  <p className="text-xs mb-3" style={{ color: 'var(--oz-text-muted)' }}>
                    Receive alerts about solver health, low liquidity, and important events.
                  </p>
                  
                  <div className="space-y-3">
                    {notificationEmails.map((email, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => updateEmail(index, e.target.value)}
                          placeholder="admin@yourchain.io"
                          className="oz-input flex-1"
                        />
                        {notificationEmails.length > 1 && (
                          <button
                            onClick={() => removeEmail(index)}
                            className="p-3 rounded-xl border hover:border-red-500/50 hover:bg-red-500/10 transition-colors"
                            style={{ borderColor: 'var(--oz-border)' }}
                          >
                            <X className="w-4 h-4" style={{ color: 'var(--oz-text-muted)' }} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Backup Admin Address */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="block text-sm font-medium" style={{ color: 'var(--oz-text)' }}>Backup Admin Address</label>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--oz-border)', color: 'var(--oz-text-muted)' }}>Optional</span>
                  </div>
                  <p className="text-xs mb-3" style={{ color: 'var(--oz-text-muted)' }}>
                    This address will be approved to spend funds on behalf of the solver as a backup recovery mechanism.
                  </p>
                  <input
                    type="text"
                    name="backupAdminAddress"
                    value={formData.backupAdminAddress}
                    onChange={handleInputChange}
                    placeholder="0x... (Recommended: multisig address)"
                    className="oz-input font-mono text-sm"
                  />
                  <div className="flex items-start gap-2 mt-3 p-3 rounded-lg" style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="text-xs" style={{ color: 'var(--oz-text-muted)' }}>
                      <span className="text-red-500 font-medium">Important:</span> Use a multisig wallet (e.g., Safe) controlled by trusted parties. 
                      This address will have the ability to recover funds in case of emergency.
                    </div>
                  </div>
                </div>

                {/* Solver Instance Preview */}
                <div className="p-6 rounded-xl" style={{ background: 'var(--oz-surface)', border: '1px solid var(--oz-border)' }}>
                  <h3 className="font-medium mb-4" style={{ color: 'var(--oz-text)' }}>Solver Instance Preview</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--oz-text-muted)' }}>Instance ID</span>
                      <code className="font-mono" style={{ color: 'var(--oz-blue)' }}>solver-{formData.chainId || 'xxxxx'}</code>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--oz-text-muted)' }}>Execution Address</span>
                      {kmsAddress ? (
                        <code className="font-mono text-emerald-500">{kmsAddress.slice(0, 10)}...{kmsAddress.slice(-6)}</code>
                      ) : (
                        <span className="flex items-center gap-2" style={{ color: 'var(--oz-text-muted)' }}>
                          <Loader2 className="w-3 h-3 animate-spin" />
                          Generating...
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span style={{ color: 'var(--oz-text-muted)' }}>HUB Connection</span>
                      <span className="flex items-center gap-2 text-emerald-500">
                        {formData.hubChain && (
                          <span className="w-5 h-5">{renderChainIcon(formData.hubChain)}</span>
                        )}
                        {hubChains.find(h => h.id === formData.hubChain)?.name || 'Not selected'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--oz-text-muted)' }}>Notification Recipients</span>
                      <span style={{ color: 'var(--oz-text)' }}>{notificationEmails.filter(e => e).length} email(s)</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--oz-text-muted)' }}>Status</span>
                      <span className="flex items-center gap-2">
                        <span className="status-dot status-pending" />
                        Awaiting configuration
                      </span>
                    </div>
                  </div>
                </div>

                {/* Warning */}
                <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                  <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-amber-500 mb-1">Important</p>
                    <p style={{ color: 'var(--oz-text-muted)' }}>
                      The generated AWS KMS signer is unique to this solver instance. You'll need to 
                      deposit initial funds to this address before the solver can be activated.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Token Pairs Configuration */}
          {currentStep === 3 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--oz-text)' }}>Token Pairs Configuration</h2>
              <p style={{ color: 'var(--oz-text-muted)' }} className="mb-8">Configure the token pairs that your solver will support for bridging.</p>

              {/* Token Pairs List */}
              {tokenPairs.length > 0 && (
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium" style={{ color: 'var(--oz-text)' }}>Token Pairs ({tokenPairs.length})</h3>
                    <div className="text-xs" style={{ color: 'var(--oz-text-muted)' }}>
                      {tokenPairs.filter(p => p.l2Address && p.l2Symbol).length} of {tokenPairs.length} configured
                    </div>
                  </div>
                  
                  {tokenPairs.map((pair) => {
                    const isConfigured = pair.l2Address && pair.l2Symbol
                    const isPending = !pair.l2Address || !pair.l2Symbol
                    
                    return (
                      <div
                        key={pair.id}
                        className="p-4 rounded-xl border transition-all"
                        style={{
                          background: isPending ? 'rgba(245, 158, 11, 0.05)' : 'var(--oz-surface)',
                          borderColor: isPending ? 'rgba(245, 158, 11, 0.3)' : 'var(--oz-border)'
                        }}
                      >
                        {isPending ? (
                          /* Pending Configuration - Need L2 Address */
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm"
                                  style={{ background: 'var(--oz-blue-light)', color: 'var(--oz-blue)' }}>
                                  {pair.hubSymbol.slice(0, 2)}
                                </div>
                                <div>
                                  <div className="font-medium" style={{ color: 'var(--oz-text)' }}>{pair.hubSymbol} Token Pair</div>
                                  <div className="text-xs text-amber-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    L2 address required
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => removeTokenPair(pair.id)}
                                className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                                style={{ color: 'var(--oz-text-muted)' }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-4">
                              {/* L2 Token Input */}
                              <div>
                                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--oz-text-muted)' }}>
                                  {pair.hubSymbol} Address on Your L2
                                </label>
                                <input
                                  type="text"
                                  value={pair.l2Address}
                                  onChange={(e) => updateTokenPairL2Address(pair.id, e.target.value)}
                                  placeholder="0x... (Enter token address)"
                                  className="oz-input font-mono text-xs"
                                />
                                {pair.l2Loading ? (
                                  <div className="flex items-center gap-1.5 mt-2 text-xs" style={{ color: 'var(--oz-text-muted)' }}>
                                    <Loader2 className="w-3 h-3 animate-spin" style={{ color: 'var(--oz-blue)' }} />
                                    Fetching token info...
                                  </div>
                                ) : pair.l2Symbol ? (
                                  <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-500">
                                    <CheckCircle2 className="w-3 h-3" />
                                    {pair.l2Symbol} ({pair.l2Decimals} decimals)
                                  </div>
                                ) : null}
                              </div>
                              
                              {/* HUB Token Info (Read-only) */}
                              <div>
                                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--oz-text-muted)' }}>
                                  {pair.hubSymbol} Address on HUB
                                </label>
                                <div className="px-3 py-2 rounded-lg font-mono text-xs"
                                  style={{ background: 'var(--oz-bg)', border: '1px solid var(--oz-border)', color: 'var(--oz-text-muted)' }}>
                                  {pair.hubAddress.slice(0, 14)}...{pair.hubAddress.slice(-8)}
                                </div>
                                <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-500">
                                  <CheckCircle2 className="w-3 h-3" />
                                  {pair.hubSymbol} ({pair.hubDecimals} decimals)
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* Configured - Show normal display */
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6">
                              {/* L2 Token Info */}
                              <div className="text-center">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm mx-auto mb-1"
                                  style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                                  {pair.l2Symbol.slice(0, 2)}
                                </div>
                                <div className="text-xs font-medium" style={{ color: 'var(--oz-text)' }}>{pair.l2Symbol}</div>
                                <div className="text-xs" style={{ color: 'var(--oz-text-muted)' }}>Your L2</div>
                              </div>

                              {/* Arrow */}
                              <div className="flex items-center gap-2" style={{ color: 'var(--oz-text-muted)' }}>
                                <div className="w-8 h-px" style={{ background: 'var(--oz-border)' }} />
                                <span className="text-xs">↔</span>
                                <div className="w-8 h-px" style={{ background: 'var(--oz-border)' }} />
                              </div>

                              {/* HUB Token Info */}
                              <div className="text-center">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm mx-auto mb-1"
                                  style={{ background: 'var(--oz-blue-light)', color: 'var(--oz-blue)' }}>
                                  {pair.hubSymbol.slice(0, 2)}
                                </div>
                                <div className="text-xs font-medium" style={{ color: 'var(--oz-text)' }}>{pair.hubSymbol}</div>
                                <div className="text-xs" style={{ color: 'var(--oz-text-muted)' }}>HUB</div>
                              </div>
                            </div>

                            {/* Addresses */}
                            <div className="hidden md:block text-xs font-mono" style={{ color: 'var(--oz-text-muted)' }}>
                              <div>{pair.l2Address.slice(0, 10)}...{pair.l2Address.slice(-6)}</div>
                              <div>{pair.hubAddress.slice(0, 10)}...{pair.hubAddress.slice(-6)}</div>
                            </div>

                            {/* Delete Button */}
                            <button
                              onClick={() => removeTokenPair(pair.id)}
                              className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                              style={{ color: 'var(--oz-text-muted)' }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Add Token Pair Form */}
              <div className="p-6 rounded-xl" style={{ background: 'var(--oz-surface)', border: '1px solid var(--oz-border)' }}>
                <h3 className="font-medium mb-4" style={{ color: 'var(--oz-text)' }}>Add New Token Pair</h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* L2 Token */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--oz-text)' }}>
                      Token on Your L2
                    </label>
                    <input
                      type="text"
                      value={newTokenPair.l2Address}
                      onChange={(e) => handleL2AddressChange(e.target.value)}
                      placeholder="0x... (Token address)"
                      className="oz-input font-mono text-sm mb-3"
                    />
                    
                    {newTokenPair.l2Loading ? (
                      <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--oz-text-muted)' }}>
                        <Loader2 className="w-4 h-4 animate-spin" style={{ color: 'var(--oz-blue)' }} />
                        Fetching token info from RPC...
                      </div>
                    ) : newTokenPair.l2Symbol ? (
                      <div className="p-3 rounded-lg" style={{ background: 'var(--oz-bg)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span className="font-medium" style={{ color: 'var(--oz-text)' }}>{newTokenPair.l2Symbol}</span>
                          <span style={{ color: 'var(--oz-text-muted)' }}>({newTokenPair.l2Decimals} decimals)</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs" style={{ color: 'var(--oz-text-muted)' }}>
                        Enter a valid token address to auto-fetch symbol and decimals
                      </div>
                    )}
                  </div>

                  {/* HUB Token */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--oz-text)' }}>
                      Token on {hubChains.find(h => h.id === formData.hubChain)?.name || 'HUB Chain'}
                    </label>
                    <input
                      type="text"
                      value={newTokenPair.hubAddress}
                      onChange={(e) => handleHubAddressChange(e.target.value)}
                      placeholder="0x... (Token address)"
                      className="oz-input font-mono text-sm mb-3"
                    />
                    
                    {newTokenPair.hubLoading ? (
                      <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--oz-text-muted)' }}>
                        <Loader2 className="w-4 h-4 animate-spin" style={{ color: 'var(--oz-blue)' }} />
                        Fetching token info from RPC...
                      </div>
                    ) : newTokenPair.hubSymbol ? (
                      <div className="p-3 rounded-lg" style={{ background: 'var(--oz-bg)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span className="font-medium" style={{ color: 'var(--oz-text)' }}>{newTokenPair.hubSymbol}</span>
                          <span style={{ color: 'var(--oz-text-muted)' }}>({newTokenPair.hubDecimals} decimals)</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs" style={{ color: 'var(--oz-text-muted)' }}>
                        Enter a valid token address to auto-fetch symbol and decimals
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={addTokenPair}
                  disabled={!newTokenPair.l2Symbol || !newTokenPair.hubSymbol}
                  className="w-full oz-btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Plus className="w-5 h-5" />
                  Add Token Pair
                </button>
              </div>

              {/* Info */}
              <div className="flex items-start gap-3 p-4 rounded-xl mt-6" style={{ background: 'var(--oz-blue-light)', border: '1px solid rgba(78, 94, 228, 0.2)' }}>
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--oz-blue)' }} />
                <div className="text-sm" style={{ color: 'var(--oz-text-muted)' }}>
                  <p className="font-medium mb-1" style={{ color: 'var(--oz-blue)' }}>Token Pair Mapping</p>
                  <p>
                    Each pair maps a token on your L2 to its corresponding token on the HUB chain. 
                    Token info is automatically fetched from the chain RPCs.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Fund & Launch */}
          {currentStep === 4 && (
            <div className="animate-fade-in">
              {!launchComplete ? (
                <>
                  <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--oz-text)' }}>Fund & Request Solver</h2>
                  <p style={{ color: 'var(--oz-text-muted)' }} className="mb-8">Deposit initial liquidity and submit your solver request to the OpenZeppelin team.</p>

                  {/* Deposit Address */}
                  <div className="p-6 rounded-xl mb-6" style={{ background: 'var(--oz-surface)', border: '1px solid var(--oz-border)' }}>
                    <h3 className="font-medium mb-4" style={{ color: 'var(--oz-text)' }}>Deposit Address (Solver KMS)</h3>
                    <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'var(--oz-bg)', border: '1px solid var(--oz-border)' }}>
                      <code className="flex-1 font-mono text-sm break-all" style={{ color: 'var(--oz-text)' }}>
                        {kmsAddress || 'Generating...'}
                      </code>
                      {kmsAddress && (
                        <button 
                          onClick={() => copyAddress(kmsAddress)}
                          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        >
                          <Copy className="w-4 h-4" style={{ color: 'var(--oz-text-muted)' }} />
                        </button>
                      )}
                    </div>
                    <p className="text-xs mt-3" style={{ color: 'var(--oz-text-muted)' }}>
                      Deposit funds to this address on both your L2 chain and the HUB chain.
                    </p>
                  </div>

                  {/* Liquidity Requirements - Split by Network */}
                  <div className="space-y-4 mb-8">
                    <h3 className="font-medium" style={{ color: 'var(--oz-text)' }}>Required Deposits</h3>
                    
                    {/* Your L2 Network */}
                    <div className="p-4 rounded-xl" style={{ background: 'var(--oz-surface)', border: '1px solid var(--oz-border)' }}>
                      <div className="flex items-center gap-3 mb-4 pb-3" style={{ borderBottom: '1px solid var(--oz-border)' }}>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                          <Layers className="w-4 h-4 text-emerald-500" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium" style={{ color: 'var(--oz-text)' }}>Your L2 Network</div>
                          <div className="text-xs" style={{ color: 'var(--oz-text-muted)' }}>{formData.chainName || 'New L2'}</div>
                        </div>
                        {depositsVerified && (
                          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                            style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Verified
                          </span>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        {/* ETH for gas */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {verifyingDeposits ? (
                              <Loader2 className="w-4 h-4 animate-spin" style={{ color: 'var(--oz-blue)' }} />
                            ) : depositProgress.eth === 100 ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <Circle className="w-4 h-4" style={{ color: 'var(--oz-text-muted)' }} />
                            )}
                            <span className="text-sm" style={{ color: 'var(--oz-text)' }}>ETH (Gas)</span>
                          </div>
                          <span className="text-sm font-mono" style={{ color: 'var(--oz-text)' }}>0.5 ETH</span>
                        </div>
                        
                        {/* Token liquidity on L2 */}
                        {tokenPairs.filter(p => p.l2Symbol).map(pair => (
                          <div key={`l2-${pair.id}`} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {verifyingDeposits ? (
                                <Loader2 className="w-4 h-4 animate-spin" style={{ color: 'var(--oz-blue)' }} />
                              ) : depositProgress.tokens === 100 ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              ) : (
                                <Circle className="w-4 h-4" style={{ color: 'var(--oz-text-muted)' }} />
                              )}
                              <span className="text-sm" style={{ color: 'var(--oz-text)' }}>{pair.l2Symbol}</span>
                            </div>
                            <span className="text-sm font-mono" style={{ color: 'var(--oz-text)' }}>1,000 {pair.l2Symbol}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* HUB Network */}
                    <div className="p-4 rounded-xl" style={{ background: 'var(--oz-surface)', border: '1px solid var(--oz-border)' }}>
                      <div className="flex items-center gap-3 mb-4 pb-3" style={{ borderBottom: '1px solid var(--oz-border)' }}>
                        {formData.hubChain && (
                          <div className="w-8 h-8 flex items-center justify-center">
                            {renderChainIcon(formData.hubChain)}
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="font-medium" style={{ color: 'var(--oz-text)' }}>HUB Network</div>
                          <div className="text-xs" style={{ color: 'var(--oz-text-muted)' }}>
                            {hubChains.find(h => h.id === formData.hubChain)?.name || 'HUB Chain'}
                          </div>
                        </div>
                        {depositsVerified && (
                          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                            style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Verified
                          </span>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        {/* ETH for gas on HUB */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {verifyingDeposits ? (
                              <Loader2 className="w-4 h-4 animate-spin" style={{ color: 'var(--oz-blue)' }} />
                            ) : depositProgress.eth === 100 ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <Circle className="w-4 h-4" style={{ color: 'var(--oz-text-muted)' }} />
                            )}
                            <span className="text-sm" style={{ color: 'var(--oz-text)' }}>ETH (Gas)</span>
                          </div>
                          <span className="text-sm font-mono" style={{ color: 'var(--oz-text)' }}>0.5 ETH</span>
                        </div>
                        
                        {/* Token liquidity on HUB */}
                        {tokenPairs.filter(p => p.l2Symbol).map(pair => (
                          <div key={`hub-${pair.id}`} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {verifyingDeposits ? (
                                <Loader2 className="w-4 h-4 animate-spin" style={{ color: 'var(--oz-blue)' }} />
                              ) : depositProgress.tokens === 100 ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              ) : (
                                <Circle className="w-4 h-4" style={{ color: 'var(--oz-text-muted)' }} />
                              )}
                              <span className="text-sm" style={{ color: 'var(--oz-text)' }}>{pair.hubSymbol}</span>
                            </div>
                            <span className="text-sm font-mono" style={{ color: 'var(--oz-text)' }}>1,000 {pair.hubSymbol}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Unconfigured tokens warning */}
                    {tokenPairs.some(p => !p.l2Symbol) && (
                      <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                        <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-amber-500 mb-1">Token Configuration Incomplete</p>
                          <p style={{ color: 'var(--oz-text-muted)' }}>
                            {tokenPairs.filter(p => !p.l2Symbol).map(p => p.hubSymbol).join(', ')} token pair(s) missing L2 addresses. 
                            Go back to configure them.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  {!depositsVerified ? (
                    <button
                      onClick={verifyDeposits}
                      disabled={verifyingDeposits}
                      className="w-full oz-btn-primary py-4 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {verifyingDeposits ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Checking balances...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-5 h-5" />
                          Verify Deposits
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={launchSolver}
                      disabled={verifyingDeposits}
                      className="w-full py-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 glow-blue disabled:opacity-50"
                      style={{ background: 'linear-gradient(to right, var(--oz-blue), #6366f1)' }}
                    >
                      {verifyingDeposits ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Submitting Request...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Request Solver Deployment
                        </>
                      )}
                    </button>
                  )}

                  {/* Status Info */}
                  <div className="mt-8 p-6 rounded-xl" style={{ border: '2px dashed var(--oz-border)' }}>
                    {depositsVerified ? (
                      <div className="text-center">
                        <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                        <h3 className="font-medium mb-2 text-emerald-500">Deposits Verified!</h3>
                        <p className="text-sm" style={{ color: 'var(--oz-text-muted)' }}>
                          Click "Request Solver Deployment" to notify the OpenZeppelin team. 
                          They will review and spin up your solver instance.
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Circle className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--oz-text-muted)' }} />
                        <h3 className="font-medium mb-2" style={{ color: 'var(--oz-text)' }}>Awaiting Verification</h3>
                        <p className="text-sm" style={{ color: 'var(--oz-text-muted)' }}>
                          Deposit the required funds to the KMS address above, then click "Verify Deposits".
                        </p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* Request Submitted State */
                <div className="text-center py-8 animate-fade-in">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: 'var(--oz-blue-light)' }}>
                    <Mail className="w-10 h-10" style={{ color: 'var(--oz-blue)' }} />
                  </div>
                  <h2 className="text-3xl font-bold mb-3 gradient-text">Request Submitted!</h2>
                  <p className="mb-8 max-w-md mx-auto" style={{ color: 'var(--oz-text-muted)' }}>
                    The OpenZeppelin team has been notified and will spin up your solver instance shortly.
                  </p>
                  
                  {/* Expected timeline */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full oz-card mb-8">
                    <Clock className="w-4 h-4" style={{ color: 'var(--oz-blue)' }} />
                    <span className="text-sm" style={{ color: 'var(--oz-text-muted)' }}>Expected setup time: <span className="font-medium" style={{ color: 'var(--oz-text)' }}>1-2 business days</span></span>
                  </div>

                  {/* Summary */}
                  <div className="p-6 rounded-xl text-left mb-8" style={{ background: 'var(--oz-surface)', border: '1px solid var(--oz-border)' }}>
                    <h3 className="font-medium mb-4 text-center" style={{ color: 'var(--oz-text)' }}>Deployment Summary</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span style={{ color: 'var(--oz-text-muted)' }}>Network</span>
                        <span className="font-medium" style={{ color: 'var(--oz-text)' }}>{formData.chainName || 'My L2 Network'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span style={{ color: 'var(--oz-text-muted)' }}>Parent (L1)</span>
                        <span className="flex items-center gap-2">
                          {formData.parentChain && (
                            <span className="w-5 h-5">{renderChainIcon(formData.parentChain)}</span>
                          )}
                          <span style={{ color: 'var(--oz-text)' }}>{parentNetworks.find(h => h.id === formData.parentChain)?.name || '—'}</span>
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span style={{ color: 'var(--oz-text-muted)' }}>HUB Chain</span>
                        <span className="flex items-center gap-2">
                          {formData.hubChain && (
                            <span className="w-5 h-5">{renderChainIcon(formData.hubChain)}</span>
                          )}
                          <span style={{ color: 'var(--oz-text)' }}>{hubChains.find(h => h.id === formData.hubChain)?.name}</span>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: 'var(--oz-text-muted)' }}>Solver Address</span>
                        <code className="font-mono text-xs" style={{ color: 'var(--oz-text)' }}>{kmsAddress?.slice(0, 10)}...{kmsAddress?.slice(-6)}</code>
                      </div>
                      {formData.backupAdminAddress && (
                        <div className="flex justify-between">
                          <span style={{ color: 'var(--oz-text-muted)' }}>Backup Admin</span>
                          <code className="font-mono text-xs" style={{ color: 'var(--oz-text)' }}>{formData.backupAdminAddress.slice(0, 10)}...{formData.backupAdminAddress.slice(-6)}</code>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span style={{ color: 'var(--oz-text-muted)' }}>Token Pairs</span>
                        <span style={{ color: 'var(--oz-text)' }}>{tokenPairs.filter(p => p.l2Symbol).length} configured</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: 'var(--oz-text-muted)' }}>Notifications</span>
                        <span style={{ color: 'var(--oz-text)' }}>{notificationEmails.filter(e => e).length} recipient(s)</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: 'var(--oz-text-muted)' }}>Status</span>
                        <span className="flex items-center gap-2 text-amber-500">
                          <span className="status-dot status-pending" />
                          Pending Review
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* What happens next */}
                  <div className="p-4 rounded-xl mb-8 text-left" style={{ background: 'var(--oz-blue-light)', border: '1px solid rgba(78, 94, 228, 0.1)' }}>
                    <h4 className="font-medium mb-3 flex items-center gap-2" style={{ color: 'var(--oz-blue)' }}>
                      <Info className="w-4 h-4" />
                      What happens next?
                    </h4>
                    <ol className="space-y-2 text-sm list-decimal list-inside" style={{ color: 'var(--oz-text-muted)' }}>
                      <li>OpenZeppelin team reviews your configuration</li>
                      <li>Required contracts are deployed on your chain (OIF Settlement, Fast Fill Router, Broadcaster Oracle, Token Registry)</li>
                      <li>Solver instance is spun up with your KMS signer</li>
                      <li>You'll receive an email notification when ready</li>
                      <li>Access the dashboard to manage your solver</li>
                    </ol>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href="/dashboard"
                      className="oz-btn-primary px-6 py-3 inline-flex items-center justify-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      Go to Dashboard
                    </a>
                    <a
                      href="/"
                      className="oz-btn-secondary px-6 py-3 inline-flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Back to Home
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          {!launchComplete && (
            <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: '1px solid var(--oz-border)' }}>
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="oz-btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Back
              </button>
              {currentStep !== 4 && (
                <button
                  onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                  className="oz-btn-primary flex items-center gap-2"
                >
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
